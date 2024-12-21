import { useState, useEffect } from 'react';
import QRCodeDisplay from '../../components/WhatsApp/QRCodeDisplay';
import ConnectionStatus from '../../components/WhatsApp/ConnectionStatus';
import ConnectButton from '../../components/WhatsApp/ConnectButton';

export default function WhatsAppPage() {
  const [status, setStatus] = useState('disconnected');
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/client/whatsapp/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStatus(data.status);
      
      // Si está pendiente, seguir verificando
      if (data.status === 'pending') {
        setTimeout(checkStatus, 5000);
      }
    } catch (error) {
      setError('Error al verificar el estado de WhatsApp');
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/client/whatsapp/connect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al conectar WhatsApp');
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setStatus('pending');
      checkStatus();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Conexión de WhatsApp
            </h3>
            <ConnectionStatus status={status} />
          </div>

          <div className="space-y-6">
            {status !== 'connected' && (
              <>
                {qrCode ? (
                  <QRCodeDisplay value={qrCode} />
                ) : (
                  <ConnectButton onClick={handleConnect} loading={loading} />
                )}
              </>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
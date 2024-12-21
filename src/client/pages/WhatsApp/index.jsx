import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

export default function WhatsAppPage() {
  const [status, setStatus] = useState('disconnected');
  const [qrCode, setQrCode] = useState(null);
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
    } catch (error) {
      setError('Error al verificar estado');
    }
  };

  const handleConnect = async () => {
    try {
      const response = await fetch('/api/client/whatsapp/connect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setQrCode(data.qrCode);
      
      // Iniciar polling de estado
      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    } catch (error) {
      setError('Error al conectar WhatsApp');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Conexión de WhatsApp
          </h3>
          
          <div className="mt-5">
            {status === 'connected' ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      WhatsApp conectado correctamente
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {qrCode ? (
                  <div className="flex justify-center">
                    <QRCode value={qrCode} size={256} />
                  </div>
                ) : (
                  <button
                    onClick={handleConnect}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Conectar WhatsApp
                  </button>
                )}

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
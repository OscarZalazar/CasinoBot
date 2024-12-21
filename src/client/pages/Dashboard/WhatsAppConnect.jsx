import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function WhatsAppConnect() {
  const [qrCode, setQrCode] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [error, setError] = useState(null);

  const generateQR = async () => {
    try {
      const response = await fetch('/api/client/whatsapp/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
        }
      });

      if (!response.ok) throw new Error('Error generando código QR');
      
      const data = await response.json();
      setQrCode(data.qrCode);
      setStatus('waiting');
    } catch (error) {
      setError(error.message);
    }
  };

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/client/whatsapp/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
        }
      });
      
      const data = await response.json();
      setStatus(data.status);
      
      if (data.status === 'connected') {
        setQrCode(null);
      }
    } catch (error) {
      console.error('Error checking status:', error);
    }
  };

  useEffect(() => {
    // Verificar estado inicial
    checkStatus();
    
    // Verificar estado cada 5 segundos si estamos esperando conexión
    let interval;
    if (status === 'waiting') {
      interval = setInterval(checkStatus, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Conectar WhatsApp
          </h3>
          
          <div className="mt-5">
            {status === 'connected' ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
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
                    <QRCodeSVG value={qrCode} size={256} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={generateQR}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Generar Código QR
                  </button>
                )}

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {qrCode && (
                  <p className="text-sm text-gray-500">
                    Escanea el código QR con WhatsApp para conectar tu cuenta
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
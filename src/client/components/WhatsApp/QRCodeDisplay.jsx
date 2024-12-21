import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDisplay({ value }) {
  if (!value) return null;

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow">
      <QRCodeSVG value={value} size={256} />
      <p className="text-sm text-gray-600">
        Escanea este código QR con WhatsApp para conectar tu cuenta
      </p>
    </div>
  );
}
```jsx
import { useState } from 'react';

export default function BotConfig({ client, onUpdate }) {
  const [config, setConfig] = useState({
    welcomeMessage: client.botConfig?.welcomeMessage || '¡Hola! ¿En qué puedo ayudarte?',
    menuOptions: client.botConfig?.menuOptions || [
      { id: 1, text: 'Quiero Cargar' },
      { id: 2, text: 'Quiero Retirar' }
    ],
    amounts: client.botConfig?.amounts || [2000, 3000, 5000, 10000],
    withdrawalLimits: client.botConfig?.withdrawalLimits || {
      min: 1000,
      max: 50000
    }
  });

  const handleUpdate = async () => {
    try {
      await onUpdate(config);
    } catch (error) {
      console.error('Error updating bot config:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Configuración del Bot</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mensaje de Bienvenida
        </label>
        <textarea
          value={config.welcomeMessage}
          onChange={(e) => setConfig({...config, welcomeMessage: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Montos Disponibles
        </label>
        <input
          type="text"
          value={config.amounts.join(', ')}
          onChange={(e) => setConfig({
            ...config,
            amounts: e.target.value.split(',').map(n => parseInt(n.trim())).filter(Boolean)
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="2000, 3000, 5000..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Retiro Mínimo
          </label>
          <input
            type="number"
            value={config.withdrawalLimits.min}
            onChange={(e) => setConfig({
              ...config,
              withdrawalLimits: {...config.withdrawalLimits, min: parseInt(e.target.value)}
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Retiro Máximo
          </label>
          <input
            type="number"
            value={config.withdrawalLimits.max}
            onChange={(e) => setConfig({
              ...config,
              withdrawalLimits: {...config.withdrawalLimits, max: parseInt(e.target.value)}
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Guardar Configuración
        </button>
      </div>
    </div>
  );
}
```
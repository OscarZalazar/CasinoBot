```jsx
import { useState } from 'react';

export default function ClientSubscription({ client, onUpdate }) {
  const [subscription, setSubscription] = useState({
    type: client.subscription?.type || 'monthly', // 'monthly' o 'lifetime'
    status: client.subscription?.status || 'active', // 'active', 'suspended', 'expired'
    startDate: client.subscription?.startDate || new Date().toISOString(),
    endDate: client.subscription?.endDate,
    price: client.subscription?.price || 0
  });

  const handleUpdate = async () => {
    try {
      // Aquí iría la llamada a la API para actualizar la suscripción
      await onUpdate(subscription);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Suscripción</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          subscription.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {subscription.status === 'active' ? 'Activa' : 'Suspendida'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Suscripción
          </label>
          <select
            value={subscription.type}
            onChange={(e) => setSubscription({...subscription, type: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="monthly">Mensual</option>
            <option value="lifetime">De por vida</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            value={subscription.price}
            onChange={(e) => setSubscription({...subscription, price: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setSubscription({...subscription, status: 'suspended'})}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
        >
          Suspender
        </button>
        <button
          onClick={() => setSubscription({...subscription, status: 'active'})}
          className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
        >
          Activar
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
```
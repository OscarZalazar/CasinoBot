import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Clients() {
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Casino Royal",
      whatsappNumber: "+5491112345678",
      mercadoPago: {
        accessToken: "****",
        cvu: "0000003100066133602780",
        alias: "CASINO.ROYAL.MP"
      },
      status: "active",
      botEnabled: true
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Clientes
        </h2>
        <button
          onClick={() => setShowNewClientModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div 
            key={client.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {client.name}
                </h3>
                <p className="text-sm text-gray-500">{client.whatsappNumber}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                client.botEnabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {client.botEnabled ? 'Bot Activo' : 'Bot Inactivo'}
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">MercadoPago CVU:</span>
                <p className="text-sm text-gray-900 dark:text-white">{client.mercadoPago.cvu}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">MercadoPago Alias:</span>
                <p className="text-sm text-gray-900 dark:text-white">{client.mercadoPago.alias}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                Configurar
              </button>
              <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800">
                Desactivar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNewClientModal && (
        <NewClientModal 
          onClose={() => setShowNewClientModal(false)}
          onAdd={(client) => {
            setClients([...clients, client]);
            setShowNewClientModal(false);
          }}
        />
      )}
    </div>
  );
}

function NewClientModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: '',
    mercadoPago: {
      accessToken: '',
      cvu: '',
      alias: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      ...formData,
      status: 'active',
      botEnabled: true
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Nuevo Cliente
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre del Negocio
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Número de WhatsApp
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              MercadoPago Access Token
            </label>
            <input
              type="text"
              value={formData.mercadoPago.accessToken}
              onChange={(e) => setFormData({
                ...formData, 
                mercadoPago: {...formData.mercadoPago, accessToken: e.target.value}
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              MercadoPago CVU
            </label>
            <input
              type="text"
              value={formData.mercadoPago.cvu}
              onChange={(e) => setFormData({
                ...formData,
                mercadoPago: {...formData.mercadoPago, cvu: e.target.value}
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              MercadoPago Alias
            </label>
            <input
              type="text"
              value={formData.mercadoPago.alias}
              onChange={(e) => setFormData({
                ...formData,
                mercadoPago: {...formData.mercadoPago, alias: e.target.value}
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Crear Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
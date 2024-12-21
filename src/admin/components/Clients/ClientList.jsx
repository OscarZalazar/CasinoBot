import { useState } from 'react';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function ClientList({ clients, onRefresh }) {
  const [selectedClient, setSelectedClient] = useState(null);

  const getStatusBadge = (connected) => {
    return connected 
      ? <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Conectado</span>
      : <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Desconectado</span>;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              WhatsApp
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">{client.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{client.whatsappNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(client.whatsappConnected)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => setSelectedClient(client)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedClient(client)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
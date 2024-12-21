import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Instances() {
  const [instances, setInstances] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newInstance, setNewInstance] = useState({
    name: '',
    clientName: '',
    whatsappNumber: '',
    email: ''
  });

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async () => {
    try {
      const response = await fetch('/api/admin/instances', {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        }
      });
      const data = await response.json();
      setInstances(data);
    } catch (error) {
      console.error('Error fetching instances:', error);
    }
  };

  const handleCreateInstance = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/instances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        },
        body: JSON.stringify(newInstance)
      });
      
      if (response.ok) {
        setIsCreating(false);
        setNewInstance({ name: '', clientName: '', whatsappNumber: '', email: '' });
        fetchInstances();
      }
    } catch (error) {
      console.error('Error creating instance:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Instancias
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nueva Instancia
        </button>
      </div>

      {/* Lista de instancias */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {instances.map((instance) => (
          <Link
            key={instance.id}
            to={`/admin/instances/${instance.id}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {instance.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {instance.clientName}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                instance.botEnabled 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {instance.botEnabled ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            
            <dl className="mt-4 space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">WhatsApp</dt>
                <dd className="text-sm text-gray-900 dark:text-white">{instance.whatsappNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Casinos Activos</dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {instance.activeCasinos?.length || 0}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>

      {/* Modal de creación */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Nueva Instancia
            </h3>
            
            <form onSubmit={handleCreateInstance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre de la Instancia
                </label>
                <input
                  type="text"
                  value={newInstance.name}
                  onChange={(e) => setNewInstance({...newInstance, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre del Cliente
                </label>
                <input
                  type="text"
                  value={newInstance.clientName}
                  onChange={(e) => setNewInstance({...newInstance, clientName: e.target.value})}
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
                  value={newInstance.whatsappNumber}
                  onChange={(e) => setNewInstance({...newInstance, whatsappNumber: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={newInstance.email}
                  onChange={(e) => setNewInstance({...newInstance, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
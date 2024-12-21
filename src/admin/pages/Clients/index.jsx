import { useState, useEffect } from 'react';
import ClientList from '../../components/Clients/ClientList';
import ClientForm from '../../components/Clients/ClientForm';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function ClientsPage() {
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClient = async (formData) => {
    try {
      const response = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchClients();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      <ClientList clients={clients} onRefresh={fetchClients} />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Nuevo Cliente</h2>
            <ClientForm 
              onSubmit={handleCreateClient}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
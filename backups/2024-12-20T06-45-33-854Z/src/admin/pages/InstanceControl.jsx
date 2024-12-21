import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BotControls from '../components/Controls/BotControls';
import CasinoControls from '../components/Controls/CasinoControls';

const AVAILABLE_CASINOS = [
  { id: 'lucky', name: 'Lucky Casino', enabled: true },
  { id: 'galera', name: 'Galera Verde Casino', enabled: false },
  { id: 'gana', name: 'Gana en Casa', enabled: false }
];

export default function InstanceControl() {
  const { instanceId } = useParams();
  const [instance, setInstance] = useState(null);
  const [casinos, setCasinos] = useState(AVAILABLE_CASINOS);

  useEffect(() => {
    // Cargar datos de la instancia
    fetchInstanceData();
  }, [instanceId]);

  const fetchInstanceData = async () => {
    try {
      const response = await fetch(`/api/admin/instances/${instanceId}`, {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        }
      });
      const data = await response.json();
      setInstance(data);
      // Actualizar estado de los casinos según la instancia
      if (data.casinos) {
        setCasinos(AVAILABLE_CASINOS.map(casino => ({
          ...casino,
          enabled: data.casinos.includes(casino.id)
        })));
      }
    } catch (error) {
      console.error('Error fetching instance data:', error);
    }
  };

  const handleCasinoToggle = (casinoId, enabled) => {
    setCasinos(casinos.map(casino => 
      casino.id === casinoId ? { ...casino, enabled } : casino
    ));
  };

  if (!instance) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Control de Instancia: {instance.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BotControls 
            instanceId={instanceId} 
            initialStatus={instance.botEnabled} 
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <CasinoControls 
            casinos={casinos}
            onToggle={handleCasinoToggle}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Información de la Instancia
        </h3>
        <dl className="grid grid-cols-1 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</dt>
            <dd className="text-base text-gray-900 dark:text-white">{instance.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Cliente</dt>
            <dd className="text-base text-gray-900 dark:text-white">{instance.clientName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de Creación</dt>
            <dd className="text-base text-gray-900 dark:text-white">
              {new Date(instance.createdAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
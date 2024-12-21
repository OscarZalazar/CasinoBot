import { useParams } from 'react-router-dom';

export default function InstanceControl() {
  const { instanceId } = useParams();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Control de Instancia: {instanceId}
      </h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Panel de control para la instancia {instanceId}
        </p>
      </div>
    </div>
  );
}
export default function Logs() {
  const logs = [
    { id: 1, message: 'Usuario conectado', level: 'info', timestamp: '2023-12-20 10:30:00' },
    { id: 2, message: 'Error en transacción', level: 'error', timestamp: '2023-12-20 10:25:00' },
    { id: 3, message: 'Nueva carga exitosa', level: 'success', timestamp: '2023-12-20 10:20:00' }
  ];

  const getLevelBadge = (level) => {
    const badges = {
      info: 'bg-blue-100 text-blue-800',
      error: 'bg-red-100 text-red-800',
      success: 'bg-green-100 text-green-800'
    };
    return badges[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Logs del Sistema
      </h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {logs.map((log) => (
            <div key={log.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelBadge(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">{log.message}</span>
                </div>
                <span className="text-sm text-gray-500">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
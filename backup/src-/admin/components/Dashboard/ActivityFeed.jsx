import { motion } from 'framer-motion';

export default function ActivityFeed() {
  const activities = [
    {
      user: 'Juan Pérez',
      action: 'Carga de fichas',
      amount: '+$5,000',
      time: 'Hace 5 minutos',
      status: 'success'
    },
    {
      user: 'María García',
      action: 'Nuevo usuario',
      time: 'Hace 15 minutos',
      status: 'info'
    },
    {
      user: 'Carlos López',
      action: 'Carga de fichas',
      amount: '+$10,000',
      time: 'Hace 30 minutos',
      status: 'success'
    }
  ];

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Actividad Reciente
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{activity.user}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.action} • {activity.time}
                </p>
              </div>
            </div>
            {activity.amount && (
              <span className="text-green-500 font-medium">{activity.amount}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
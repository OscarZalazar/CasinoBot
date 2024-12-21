import { motion } from 'framer-motion';

const colorVariants = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  indigo: 'bg-indigo-500'
};

export default function StatsCard({ title, value, icon: Icon, trend, color = 'blue' }) {
  const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend >= 0 ? '↑' : '↓';
  const iconClass = `${colorVariants[color]} bg-opacity-10`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`p-4 rounded-full ${iconClass}`}>
          <Icon className={`w-6 h-6 ${colorVariants[color]} text-opacity-90`} />
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="mt-4 flex items-center">
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`${trendColor} text-sm font-medium flex items-center`}
          >
            {trendIcon} {Math.abs(trend)}%
            <span className="ml-2 text-gray-500 dark:text-gray-400">vs mes anterior</span>
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}
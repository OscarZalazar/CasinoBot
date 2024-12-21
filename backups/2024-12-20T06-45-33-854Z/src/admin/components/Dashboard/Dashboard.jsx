import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import StatsCard from './StatsCard';
import TransactionsChart from './TransactionsChart';
import ReportStats from './ReportStats';
import ActivityFeed from './ActivityFeed';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeUsers: 0,
    dailyTransactions: 0,
    averageAmount: 0,
    totalMessages: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        activeUsers: 1234,
        dailyTransactions: 145,
        averageAmount: 15678,
        totalMessages: 892
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatsCard
            title="Usuarios Activos"
            value={stats.activeUsers.toLocaleString()}
            icon={UserGroupIcon}
            trend={12}
            color="blue"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatsCard
            title="Transacciones Hoy"
            value={stats.dailyTransactions.toLocaleString()}
            icon={CurrencyDollarIcon}
            trend={-5}
            color="green"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <StatsCard
            title="Promedio Diario"
            value={`$${stats.averageAmount.toLocaleString()}`}
            icon={ArrowTrendingUpIcon}
            trend={8}
            color="purple"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <StatsCard
            title="Mensajes WhatsApp"
            value={stats.totalMessages.toLocaleString()}
            icon={ChatBubbleLeftIcon}
            trend={15}
            color="indigo"
          />
        </motion.div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <TransactionsChart />
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <ActivityFeed />
        </motion.div>
      </div>

      {/* Instance Reports */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Reportes por Instancia
        </h3>
        <ReportStats instanceId="default" />
      </motion.div>
    </motion.div>
  );
}
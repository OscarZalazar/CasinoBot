import { 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import StatsCard from '../components/Dashboard/StatsCard';
import TransactionsChart from '../components/Dashboard/TransactionsChart';

const chartData = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  datasets: [
    {
      label: 'Transacciones',
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    }
  ]
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Usuarios Activos"
          value="1,234"
          icon={UserGroupIcon}
          trend={12}
        />
        <StatsCard
          title="Transacciones Hoy"
          value="145"
          icon={CurrencyDollarIcon}
          trend={-5}
        />
        <StatsCard
          title="Promedio Diario"
          value="$15,678"
          icon={ArrowTrendingUpIcon}
          trend={8}
        />
        <StatsCard
          title="Mensajes WhatsApp"
          value="892"
          icon={ChatBubbleLeftIcon}
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionsChart data={chartData} />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Últimas Transacciones
          </h3>
          <div className="space-y-4">
            {/* Lista de transacciones recientes */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Juan Pérez</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hace 5 minutos</p>
              </div>
              <span className="text-green-500 font-medium">+$5,000</span>
            </div>
            {/* Más transacciones... */}
          </div>
        </div>
      </div>
    </div>
  );
}
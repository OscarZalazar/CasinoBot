import { 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Usuarios Activos"
          value="1,234"
          icon={UserGroupIcon}
          trend={12}
        />
        <StatCard
          title="Transacciones Hoy"
          value="145"
          icon={CurrencyDollarIcon}
          trend={-5}
        />
        <StatCard
          title="Promedio Diario"
          value="$15,678"
          icon={ArrowTrendingUpIcon}
          trend={8}
        />
        <StatCard
          title="Mensajes WhatsApp"
          value="892"
          icon={ChatBubbleLeftIcon}
          trend={15}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend }) {
  const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend >= 0 ? '↑' : '↓';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className="p-4 rounded-full bg-blue-500 bg-opacity-10">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <span className={`${trendColor} text-sm font-medium flex items-center`}>
          {trendIcon} {Math.abs(trend)}%
          <span className="ml-2 text-gray-500 dark:text-gray-400">vs mes anterior</span>
        </span>
      </div>
    </div>
  );
}
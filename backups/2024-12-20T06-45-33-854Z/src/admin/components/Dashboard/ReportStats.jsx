import { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import { 
  ChatBubbleLeftIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

export default function ReportStats({ instanceId }) {
  const [stats, setStats] = useState({
    totalChats: 0,
    totalTransfers: 0,
    totalAmount: 0
  });

  useEffect(() => {
    fetchStats();
  }, [instanceId]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/admin/instances/${instanceId}/stats`, {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Chats Totales"
        value={stats.totalChats}
        icon={ChatBubbleLeftIcon}
      />
      <StatsCard
        title="Transferencias"
        value={stats.totalTransfers}
        icon={CurrencyDollarIcon}
      />
      <StatsCard
        title="Monto Total"
        value={new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS'
        }).format(stats.totalAmount)}
        icon={ArrowTrendingUpIcon}
      />
    </div>
  );
}
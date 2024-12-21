import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { 
  PencilIcon, 
  TrashIcon,
  EllipsisVerticalIcon 
} from '@heroicons/react/24/outline';
import { formatDate } from '../../utils/formatters';

export default function ClientRow({ client, onStatusChange }) {
  const [isEnabled, setIsEnabled] = useState(client.botEnabled);
  const [showMenu, setShowMenu] = useState(false);

  const handleStatusToggle = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${client.id}/bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        },
        body: JSON.stringify({ enabled: !isEnabled })
      });

      if (response.ok) {
        setIsEnabled(!isEnabled);
        onStatusChange();
      }
    } catch (error) {
      console.error('Error toggling bot status:', error);
    }
  };

  const getSubscriptionBadge = (type) => {
    const badges = {
      monthly: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      indefinite: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return badges[type] || badges.monthly;
  };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {client.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {client.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {formatDate(new Date(client.startDate))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-full ${getSubscriptionBadge(client.subscriptionType)}`}>
          {client.subscriptionType === 'monthly' ? 'Mensual' : 'Indefinido'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Switch
          checked={isEnabled}
          onChange={handleStatusToggle}
          className={`${
            isEnabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span className="sr-only">Activar bot</span>
          <span
            className={`${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {client.subscriptionType === 'monthly' 
            ? formatDate(new Date(client.nextBillingDate))
            : 'N/A'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-500"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Editar
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100 flex items-center"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </>
  );
}
import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function BotControls({ instanceId, initialStatus = true }) {
  const [isEnabled, setIsEnabled] = useState(initialStatus);

  const handleToggle = async (enabled) => {
    try {
      await fetch(`/api/admin/instances/${instanceId}/bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        },
        body: JSON.stringify({ enabled })
      });
      setIsEnabled(enabled);
    } catch (error) {
      console.error('Error toggling bot:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bot de WhatsApp</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isEnabled ? 'Activo' : 'Inactivo'}
        </p>
      </div>
      <Switch
        checked={isEnabled}
        onChange={handleToggle}
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
    </div>
  );
}
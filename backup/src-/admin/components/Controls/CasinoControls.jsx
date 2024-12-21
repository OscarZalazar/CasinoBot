import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function CasinoControls({ casinos, onToggle }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Control de Casinos
      </h3>
      
      <div className="grid gap-4">
        {casinos.map((casino) => (
          <CasinoSwitch
            key={casino.id}
            casino={casino}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

function CasinoSwitch({ casino, onToggle }) {
  const [isEnabled, setIsEnabled] = useState(casino.enabled);

  const handleToggle = async (enabled) => {
    try {
      await fetch(`/api/admin/casinos/${casino.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        },
        body: JSON.stringify({ enabled })
      });
      setIsEnabled(enabled);
      onToggle(casino.id, enabled);
    } catch (error) {
      console.error('Error toggling casino:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{casino.name}</h4>
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
        <span className="sr-only">Activar casino</span>
        <span
          className={`${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
}
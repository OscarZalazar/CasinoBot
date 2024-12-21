```jsx
import { useState } from 'react';
import ClientSubscription from './ClientSubscription';
import BotConfig from './BotConfig';

export default function ClientDetails({ client }) {
  const [activeTab, setActiveTab] = useState('subscription');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('subscription')}
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'subscription'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Suscripción
          </button>
          <button
            onClick={() => setActiveTab('bot')}
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'bot'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Configuración del Bot
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'subscription' ? (
          <ClientSubscription 
            client={client}
            onUpdate={async (subscription) => {
              // Aquí iría la lógica para actualizar la suscripción
              console.log('Updating subscription:', subscription);
            }}
          />
        ) : (
          <BotConfig
            client={client}
            onUpdate={async (config) => {
              // Aquí iría la lógica para actualizar la configuración del bot
              console.log('Updating bot config:', config);
            }}
          />
        )}
      </div>
    </div>
  );
}
```
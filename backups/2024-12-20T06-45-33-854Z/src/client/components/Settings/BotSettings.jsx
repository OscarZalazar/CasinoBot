import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function BotSettings() {
  const [settings, setSettings] = useState({
    amounts: [],
    messages: {
      welcome: '',
      withdrawal: ''
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/client/settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
        }
      });
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSave = async () => {
    try {
      await fetch('/api/client/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
        },
        body: JSON.stringify(settings)
      });
      toast.success('Configuración guardada exitosamente');
    } catch (error) {
      toast.error('Error al guardar la configuración');
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">Configuración del Bot</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Montos de Carga
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={settings.amounts.join(', ')}
              onChange={(e) => setSettings({
                ...settings,
                amounts: e.target.value.split(',').map(n => parseInt(n.trim())).filter(Boolean)
              })}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="2000, 3000, 5000..."
            />
            <p className="mt-1 text-sm text-gray-500">Separar montos por comas</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mensaje de Bienvenida
          </label>
          <div className="mt-1">
            <textarea
              value={settings.messages.welcome}
              onChange={(e) => setSettings({
                ...settings,
                messages: { ...settings.messages, welcome: e.target.value }
              })}
              rows={3}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mensaje de Retiro
          </label>
          <div className="mt-1">
            <textarea
              value={settings.messages.withdrawal}
              onChange={(e) => setSettings({
                ...settings,
                messages: { ...settings.messages, withdrawal: e.target.value }
              })}
              rows={3}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
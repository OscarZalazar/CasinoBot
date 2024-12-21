import { useState } from 'react';
import { motion } from 'framer-motion';

export default function WithdrawalLimits() {
  const [limits, setLimits] = useState({
    FAST: { amount: 50000, hours: 24 },
    MEDIUM: { amount: 100000, hours: 48 },
    SLOW: { amount: null, hours: 72 }
  });

  const handleSave = async () => {
    try {
      await fetch('/api/admin/settings/withdrawal-limits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        },
        body: JSON.stringify(limits)
      });
    } catch (error) {
      console.error('Error saving withdrawal limits:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Límites de Retiro
      </h3>

      <div className="space-y-6">
        {Object.entries(limits).map(([key, value]) => (
          <div key={key} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Monto {key === 'FAST' ? 'Rápido' : key === 'MEDIUM' ? 'Medio' : 'Lento'}
              </label>
              <input
                type="number"
                value={value.amount || ''}
                onChange={(e) => setLimits({
                  ...limits,
                  [key]: { ...value, amount: e.target.value ? Number(e.target.value) : null }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={key === 'SLOW' ? 'Sin límite' : ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Horas de Espera
              </label>
              <input
                type="number"
                value={value.hours}
                onChange={(e) => setLimits({
                  ...limits,
                  [key]: { ...value, hours: Number(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </motion.div>
  );
}
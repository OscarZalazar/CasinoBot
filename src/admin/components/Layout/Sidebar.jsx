import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  Cog6ToothIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  DocumentTextIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Configuración', href: '/admin/settings', icon: Cog6ToothIcon },
  { name: 'Usuarios', href: '/admin/users', icon: UserGroupIcon },
  { name: 'Transacciones', href: '/admin/transactions', icon: CurrencyDollarIcon },
  { name: 'Logs', href: '/admin/logs', icon: DocumentTextIcon },
];

export default function Sidebar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-full p-3 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Casino Bot</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-6 h-6 mr-3" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleDarkMode}
          className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100 
                   dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <>
              <SunIcon className="w-6 h-6 mr-3" />
              {!collapsed && <span>Modo Claro</span>}
            </>
          ) : (
            <>
              <MoonIcon className="w-6 h-6 mr-3" />
              {!collapsed && <span>Modo Oscuro</span>}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
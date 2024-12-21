import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  Cog6ToothIcon, 
  UserGroupIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Clientes', href: '/clients', icon: BuildingStorefrontIcon },
  { name: 'Usuarios', href: '/users', icon: UserGroupIcon },
  { name: 'Transacciones', href: '/transactions', icon: CurrencyDollarIcon },
  { name: 'Configuración', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Logs', href: '/logs', icon: DocumentTextIcon },
];

// ... resto del código igual ...
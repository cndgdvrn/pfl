'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { id: 'dashboard', name: 'Ana Sayfa', icon: '🏠', path: '/' },
  { id: 'sports', name: 'Spor', icon: '🏃‍♂️', path: '/sports' },
  { id: 'meal', name: 'Yemek', icon: '🍴', path: '/meal' },
  { id: 'work', name: 'İş', icon: '💼', path: '/work' },
  { id: 'sleep', name: 'Uyku', icon: '💤', path: '/sleep' },
  { id: 'pills', name: 'İlaçlar', icon: '💊', path: '/pills' },
  { id: 'stats', name: 'İstatistikler', icon: '📊', path: '/stats' },
  { id: 'calendar', name: 'Takvim', icon: '📅', path: '/calendar' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-3 mb-2">
          Genel
        </h2>
        <ul className="space-y-1">
          {menuItems.slice(0, 1).map((item) => (
            <SidebarItem key={item.id} item={item} isActive={pathname === item.path} />
          ))}
        </ul>
      </div>
      
      <div className="space-y-1">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-3 mb-2">
          Kategoriler
        </h2>
        <ul className="space-y-1">
          {menuItems.slice(1, 6).map((item) => (
            <SidebarItem key={item.id} item={item} isActive={pathname === item.path} />
          ))}
        </ul>
      </div>
      
      <div className="space-y-1">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-3 mb-2">
          Raporlar
        </h2>
        <ul className="space-y-1">
          {menuItems.slice(6).map((item) => (
            <SidebarItem key={item.id} item={item} isActive={pathname === item.path} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarItem({ item, isActive }: { item: typeof menuItems[0]; isActive: boolean }) {
  return (
    <li>
      <Link
        href={item.path}
        className={`flex items-center px-3 py-2 rounded-lg transition-colors group hover:bg-gray-100 ${
          isActive
            ? 'bg-gray-100 text-indigo-600 font-medium'
            : 'text-gray-700'
        }`}
      >
        <span className={`text-lg mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
          {item.icon}
        </span>
        <span>{item.name}</span>
        {isActive && (
          <span className="ml-auto w-1 h-5 rounded-full bg-indigo-600"></span>
        )}
      </Link>
    </li>
  );
} 
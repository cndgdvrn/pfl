'use client';

import { useState } from 'react';
import { Activity } from '@/types';

const mockActivities: Activity[] = [
  {
    id: 1,
    title: "Sabah Koşusu",
    time: "2024-03-20T08:00",
    duration: "30",
    description: "Parkta 5 km koşu",
    completed: true,
    category: "sports"
  },
  // ... diğer aktiviteler buraya eklenecek
];

export default function StatsPage() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  const stats = {
    totalActivities: mockActivities.length,
    completedActivities: mockActivities.filter(a => a.completed).length,
    categories: {
      sports: mockActivities.filter(a => a.category === 'sports').length,
      meal: mockActivities.filter(a => a.category === 'meal').length,
      work: mockActivities.filter(a => a.category === 'work').length,
      sleep: mockActivities.filter(a => a.category === 'sleep').length,
      pills: mockActivities.filter(a => a.category === 'pills').length,
    }
  };

  const completionRate = (stats.completedActivities / stats.totalActivities) * 100;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white">İstatistikler</h1>
        <div className="mt-4 flex space-x-2">
          {(['week', 'month', 'year'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 rounded-lg ${
                timeframe === t
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {t === 'week' ? 'Hafta' : t === 'month' ? 'Ay' : 'Yıl'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Aktivite</h3>
          <p className="text-3xl font-bold dark:text-white">{stats.totalActivities}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tamamlanan</h3>
          <p className="text-3xl font-bold dark:text-white">{stats.completedActivities}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tamamlanma Oranı</h3>
          <p className="text-3xl font-bold dark:text-white">{completionRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Kategori Dağılımı</h2>
        <div className="space-y-4">
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} className="flex items-center">
              <div className="w-32 text-sm text-gray-600 dark:text-gray-400">
                {category === 'sports' ? 'Spor' :
                 category === 'meal' ? 'Yemek' :
                 category === 'work' ? 'İş' :
                 category === 'sleep' ? 'Uyku' : 'İlaçlar'}
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className={`h-2 rounded-full ${
                      category === 'sports' ? 'bg-blue-500' :
                      category === 'meal' ? 'bg-green-500' :
                      category === 'work' ? 'bg-gray-500' :
                      category === 'sleep' ? 'bg-blue-400' : 'bg-red-500'
                    }`}
                    style={{ width: `${(count / stats.totalActivities) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-right text-sm text-gray-600 dark:text-gray-400">
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
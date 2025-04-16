'use client';

import { useState } from 'react';
import Calendar from '@/components/shared/Calendar';
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

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Seçilen tarihteki aktiviteleri filtrele
    const activities = mockActivities.filter(activity => {
      const activityDate = new Date(activity.time);
      return (
        activityDate.getDate() === date.getDate() &&
        activityDate.getMonth() === date.getMonth() &&
        activityDate.getFullYear() === date.getFullYear()
      );
    });
    setSelectedActivities(activities);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Takvim</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Calendar activities={mockActivities} onDateSelect={handleDateSelect} />
        </div>
        <div>
          {selectedDate ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">
                {selectedDate.toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </h2>
              {selectedActivities.length > 0 ? (
                <div className="space-y-4">
                  {selectedActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold dark:text-white">
                          {activity.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(activity.time).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Bu tarihte planlanmış aktivite bulunmuyor.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <p className="text-gray-500 dark:text-gray-400">
                Detayları görüntülemek için bir tarih seçin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
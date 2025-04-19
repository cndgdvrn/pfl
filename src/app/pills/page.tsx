'use client';

import { useState } from 'react';
import { Activity } from '@/types';
import ActivityModal from '@/components/shared/ActivityModal';

const mockActivities: Activity[] = [
  {
    id: '1',
    title: "Kan Basıncı İlacı",
    time: "08:00",
    duration: "5",
    description: "Yemekten sonra bir adet alınacak",
    completed: false,
    category: "pills",
    categoryId: "pills",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: "Vitamin",
    time: "09:00",
    duration: "5",
    description: "Tok karnına alınacak",
    completed: true,
    category: "pills",
    categoryId: "pills",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: "Ağrı Kesici",
    time: "13:00",
    duration: "5",
    description: "Gerekirse alınacak",
    completed: false,
    category: "pills",
    categoryId: "pills",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function PillsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSave = (activity: Omit<Activity, 'id'> & { id?: string }) => {
    if (editingActivity) {
      // Update activity
      setActivities(
        activities.map(a => 
          a.id === editingActivity.id ? 
          { 
            ...activity, 
            id: editingActivity.id, 
            category: 'pills', 
            categoryId: 'pills',
            updatedAt: new Date()
          } : 
          a
        )
      );
    } else {
      // Add new activity
      const newActivity: Activity = {
        ...activity as Omit<Activity, 'id'>,
        id: Date.now().toString(),
        category: 'pills',
        categoryId: 'pills',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setActivities([...activities, newActivity]);
    }
    setIsModalOpen(false);
    setEditingActivity(undefined);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu ilaç hatırlatıcısını silmek istediğinize emin misiniz?')) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  const toggleComplete = (id: string) => {
    setActivities(
      activities.map(a =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const formatDuration = (minutes: string) => {
    const mins = parseInt(minutes);
    if (mins >= 60) {
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return `${hours} saat${remainingMins > 0 ? ` ${remainingMins} dakika` : ''}`;
    }
    return `${mins} dakika`;
  };

  const filteredActivities = activities.filter(activity => {
    if (searchTerm && !activity.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filter === 'all') return true;
    if (filter === 'completed') return activity.completed;
    if (filter === 'pending') return !activity.completed;
    return true;
  });

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-purple text-white p-6 rounded-b-3xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">İlaç Hatırlatıcı</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-auto flex-1 max-w-md">
            <input
              type="text"
              placeholder="İlaç ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/20 border border-white/10 rounded-full py-2 pl-4 pr-10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <span className="absolute right-3 top-2.5 text-white/70">
              {/* Search icon would be here */}
            </span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'all'
                  ? 'bg-white text-purple-600 font-medium'
                  : 'bg-white/20 hover:bg-white/30'
              } transition-colors`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'completed'
                  ? 'bg-white text-purple-600 font-medium'
                  : 'bg-white/20 hover:bg-white/30'
              } transition-colors`}
            >
              Alındı
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'pending'
                  ? 'bg-white text-purple-600 font-medium'
                  : 'bg-white/20 hover:bg-white/30'
              } transition-colors`}
            >
              Bekleyen
            </button>
            <button 
              onClick={() => {
                setEditingActivity(undefined);
                setIsModalOpen(true);
              }}
              className="btn-primary bg-white/20 hover:bg-white/30 backdrop-blur-sm group"
            >
              <span className="hidden sm:inline">Yeni İlaç</span>
              <span className="sm:hidden text-xl">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="container mx-auto px-4">
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <div 
                key={activity.id}
                className={`card hover:shadow-lg ${
                  activity.completed ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                } group transition-all duration-300`}
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-1 group-hover:text-purple-600 transition-colors">
                        {activity.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span>{activity.time}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDuration(activity.duration)}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 ml-auto">
                      <button 
                        onClick={() => handleEdit(activity)}
                        className="p-2 rounded-full text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/30 transition-colors"
                        title="Düzenle"
                      >
                        {/* Edit icon would be here */}
                        Düzenle
                      </button>
                      <button 
                        onClick={() => handleDelete(activity.id)}
                        className="p-2 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                        title="Sil"
                      >
                        {/* Delete icon would be here */}
                        Sil
                      </button>
                    </div>
                  </div>
                  
                  {activity.description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4" style={{ color: 'black' }}>
                      {activity.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activity.completed}
                        onChange={() => toggleComplete(activity.id)}
                        className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {activity.completed ? 'Alındı' : 'Alınacak'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl max-w-xl mx-auto">
              <h3 className="text-xl font-semibold mb-2">İlaç Bulunamadı</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">Aramanızla eşleşen ilaç hatırlatıcısı yok veya henüz ilaç eklenmemiş. Yeni bir ilaç hatırlatıcısı eklemek ister misiniz?</p>
              <button 
                onClick={() => {
                  setEditingActivity(undefined);
                  setIsModalOpen(true);
                }}
                className="btn-primary mx-auto"
              >
                Yeni İlaç Ekle
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Activity Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingActivity(undefined);
        }}
        onSave={handleSave}
        category="pills"
        activity={editingActivity}
      />
      
      {/* Add Button (Mobile) */}
      <div className="fixed right-6 bottom-6 z-20">
        <button 
          onClick={() => {
            setEditingActivity(undefined);
            setIsModalOpen(true);
          }}
          className="btn-primary h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl bg-gradient-purple"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );
} 
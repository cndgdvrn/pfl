"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface ActivityItem {
  id: number;
  time: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  textColor: string;
  duration?: string;
}

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState('');
  
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    // Günün saatine göre selamlama
    if (hour < 12) setGreeting('Günaydın');
    else if (hour < 18) setGreeting('İyi günler');
    else setGreeting('İyi akşamlar');
    
    // Tarih formatı
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setDate(now.toLocaleDateString('tr-TR', options));
  }, []);

  const categories = [
    { id: "sports", name: "Spor", icon: "🏃‍♂️", color: "blue", path: "/sports", count: 3 },
    { id: "meal", name: "Yemek", icon: "🍴", color: "green", path: "/meal", count: 2 },
    { id: "work", name: "İş", icon: "💼", color: "indigo", path: "/work", count: 5 },
    { id: "sleep", name: "Uyku", icon: "💤", color: "purple", path: "/sleep", count: 1 },
    { id: "pills", name: "İlaçlar", icon: "💊", color: "red", path: "/pills", count: 2 },
  ];

  // Günlük program aktiviteleri
  const [upcomingActivities, setUpcomingActivities] = useState<ActivityItem[]>([
    { id: 1, time: "08:00", title: "Sabah Koşusu", category: "Spor", icon: "🏃‍♂️", color: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-800 dark:text-blue-200" },
    { id: 2, time: "09:00", title: "Takım Toplantısı", category: "İş", icon: "💼", color: "bg-indigo-100 dark:bg-indigo-900/30", textColor: "text-indigo-800 dark:text-indigo-200" },
    { id: 3, time: "12:30", title: "Öğle Yemeği", category: "Yemek", icon: "🍴", color: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-800 dark:text-green-200" },
  ]);
  
  // Aktivite düzenleme ve silme işlevleri
  const [editingActivityId, setEditingActivityId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  
  const handleEdit = (activity: ActivityItem) => {
    setEditingActivityId(activity.id);
    setEditTitle(activity.title);
  };
  
  const handleSaveEdit = (id: number) => {
    if (editTitle.trim()) {
      setUpcomingActivities(
        upcomingActivities.map(activity => 
          activity.id === id 
            ? { ...activity, title: editTitle } 
            : activity
        )
      );
      setEditingActivityId(null);
      setEditTitle('');
    }
  };
  
  const handleCancelEdit = () => {
    setEditingActivityId(null);
    setEditTitle('');
  };
  
  const handleDelete = (id: number) => {
    if (window.confirm('Bu aktiviteyi silmek istediğinize emin misiniz?')) {
      setUpcomingActivities(upcomingActivities.filter(activity => activity.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Üst Bilgi Bölümü */}
      <div className="relative bg-gradient-blue text-white p-8 sm:p-10 rounded-2xl shadow-lg overflow-hidden fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{greeting}</h1>
            <p className="mt-2 text-blue-100">{date}</p>
          </div>
          <Link 
            href="/calendar"
            className="btn-primary group bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          >
            <span className="mr-2">📅</span>
            Takvimi Görüntüle
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="stat-card card">
          <div className="icon-bg bg-green-500"></div>
          <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mr-4 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="z-10">
            <h2 className="text-gray-600 dark:text-gray-400 text-sm font-medium">Tamamlanan</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="icon-bg bg-yellow-500"></div>
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 mr-4 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="z-10">
            <h2 className="text-gray-600 dark:text-gray-400 text-sm font-medium">Bekleyen</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8</p>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="icon-bg bg-blue-500"></div>
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mr-4 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="z-10">
            <h2 className="text-gray-600 dark:text-gray-400 text-sm font-medium">Toplam</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">20</p>
          </div>
        </div>
      </div>

      {/* Kategoriler */}
      <div className="fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Kategoriler
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.path}
              className={`category-card ${category.color} card`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="absolute right-3 top-3">
                <div className={`badge badge-${category.color}`}>{category.count}</div>
              </div>
              <div className="icon">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Günlük Program */}
      <div className="fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Günlük Program
          </h2>
          <Link
            href="/calendar"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center text-sm font-medium"
          >
            <span>Tümünü Gör</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gradient-blue text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Bugünkü Planınız</span>
          </div>
          {upcomingActivities.length === 0 ? (
            <div className="p-10 text-center text-gray-500 dark:text-gray-400">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Bugün için hiç aktivite yok</h3>
              <p className="mb-4">Boş gününüzün tadını çıkarın veya yeni bir aktivite ekleyin.</p>
              <button className="btn-primary">Yeni Aktivite Ekle</button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {upcomingActivities.map((activity, index) => (
                <div 
                  key={activity.id}
                  className="activity-item p-4 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-blue text-white mr-4 font-medium">
                    {activity.time.split(':')[0]}
                    <span className="text-xs">:{activity.time.split(':')[1]}</span>
                  </div>
                  
                  <div className={`activity-icon ${activity.color} flex-shrink-0 mr-4`}>
                    <span className="text-base">{activity.icon}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {editingActivityId === activity.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                          autoFocus
                        />
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleSaveEdit(activity.id as number)}
                            className="inline-flex items-center p-1.5 rounded-full text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
                            title="Kaydet"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center p-1.5 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
                            title="İptal"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-medium text-gray-900 dark:text-white truncate text-lg">{activity.title}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`${activity.textColor} text-sm font-medium`}>{activity.category}</span>
                          <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{activity.duration || '30 dakika'}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="relative">
                    {editingActivityId === activity.id ? (
                      null
                    ) : (
                      <div className="flex items-center">
                        <button
                          onClick={() => handleEdit(activity)}
                          className="p-2 rounded-full text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors mr-1"
                          title="Düzenle"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id as number)}
                          className="p-2 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                          title="Sil"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Add Button - Sabit */}
      <div className="fixed right-6 bottom-6 z-20">
        <button className="btn-primary h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

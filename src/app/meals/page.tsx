"use client";

import { useState } from 'react';

interface ActivityType {
  id: string;
  title: string;
  time: string;
  duration: string;
  description: string;
  completed: boolean;
  category: string;
  color: string;
}

export default function MealsPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState<ActivityType[]>([
    {
      id: "1",
      title: "Kahvaltı",
      time: "08:00",
      duration: "30 dakika",
      description: "Yulaf ezmesi, muz ve bal ile",
      completed: true,
      category: "Kahvaltı",
      color: "green"
    },
    {
      id: "2",
      title: "Öğle Yemeği",
      time: "13:00",
      duration: "45 dakika",
      description: "Izgara tavuk ve salata",
      completed: false,
      category: "Öğle",
      color: "green"
    },
    {
      id: "3",
      title: "Ara Öğün",
      time: "16:00",
      duration: "15 dakika",
      description: "Protein bar ve meyve",
      completed: false,
      category: "Ara Öğün",
      color: "green"
    },
    {
      id: "4",
      title: "Akşam Yemeği",
      time: "19:30",
      duration: "60 dakika",
      description: "Balık, sebze ve pilav",
      completed: false,
      category: "Akşam",
      color: "green"
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityType | null>(null);
  const [newActivity, setNewActivity] = useState<ActivityType>({
    id: "",
    title: "",
    time: "",
    duration: "",
    description: "",
    category: "Kahvaltı",
    color: "green",
    completed: false
  });

  const handleAddActivity = () => {
    setEditingActivity(null);
    setNewActivity({
      id: "",
      title: "",
      time: "",
      duration: "",
      description: "",
      category: "Kahvaltı",
      color: "green",
      completed: false
    });
    setIsModalOpen(true);
  };
  
  const handleEditActivity = (activity: ActivityType) => {
    setEditingActivity(activity);
    setNewActivity({...activity});
    setIsModalOpen(true);
  };
  
  const handleDeleteActivity = (id: string) => {
    if (window.confirm("Bu öğünü silmek istediğinize emin misiniz?")) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };
  
  const handleSaveActivity = () => {
    if (!newActivity.title || !newActivity.time) {
      alert('Lütfen gerekli alanları doldurun');
      return;
    }
    
    if (editingActivity) {
      // Var olan aktiviteyi güncelle
      setActivities(
        activities.map(activity => 
          activity.id === editingActivity.id 
            ? { ...newActivity, id: activity.id } 
            : activity
        )
      );
    } else {
      // Yeni aktivite ekle
      const newId = Date.now().toString();
      setActivities([...activities, { ...newActivity, id: newId }]);
    }
    
    setIsModalOpen(false);
  };
  
  const handleToggleComplete = (id: string) => {
    setActivities(
      activities.map(activity => 
        activity.id === id 
          ? { ...activity, completed: !activity.completed } 
          : activity
      )
    );
  };

  const filteredActivities = activities.filter(activity => {
    // Arama filtresi
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Durum filtresi
    const matchesStatus = filter === 'all' || 
                         (filter === 'completed' && activity.completed) || 
                         (filter === 'pending' && !activity.completed);
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (completed: boolean) => {
    return completed ? 
      "badge-green" : 
      "badge-yellow";
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, string> = {
      'Kahvaltı': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'Öğle': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      'Ara Öğün': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Akşam': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    };
    
    return badges[category] || badges['Kahvaltı'];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 py-8">
      {/* Başlık ve Bilgi Kartı */}
      <div className="relative bg-gradient-green text-white p-8 rounded-2xl shadow-lg overflow-hidden mb-8 fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center">
              <span className="text-3xl mr-3">🍽️</span>
              <h1 className="text-2xl sm:text-3xl font-bold">Öğünlerim</h1>
            </div>
            <p className="mt-2 text-green-100 max-w-lg">Sağlıklı beslenme alışkanlıkları için günlük öğünlerinizi planlayın ve takip edin.</p>
          </div>
          <button 
            onClick={handleAddActivity}
            className="btn-primary bg-white/20 hover:bg-white/30 backdrop-blur-sm group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Yeni Öğün
          </button>
        </div>
      </div>

      {/* Arama ve Filtreler */}
      <div className="card p-6 mb-6 fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 dark:bg-gray-800 dark:ring-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-green-500 sm:text-sm"
                placeholder="Öğün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                filter === 'all'
                  ? 'bg-gradient-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                filter === 'completed'
                  ? 'bg-gradient-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Tamamlanan
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                filter === 'pending'
                  ? 'bg-gradient-yellow text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Bekleyen
            </button>
          </div>
        </div>
      </div>

      {/* Öğün Listesi */}
      <div className="grid gap-4 fade-in" style={{ animationDelay: '0.2s' }}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="card p-5 sm:p-6 hover:shadow-md transition-all border-l-4 border-l-green-500"
            >
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={activity.completed}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 peer"
                      onChange={() => handleToggleComplete(activity.id)}
                    />
                    <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity left-0 top-0 w-full h-full text-green-500 pointer-events-none -z-10">
                      <div className="bg-green-100 dark:bg-green-900/20 absolute -inset-2 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className={`font-semibold text-lg ${activity.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`} style={{ color: 'black' }}>
                      {activity.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`badge ${getStatusColor(activity.completed)}`}>
                        {activity.completed ? 'Tamamlandı' : 'Bekliyor'}
                      </span>
                      <span className={`badge ${getCategoryBadge(activity.category)}`}>
                        {activity.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3" style={{ color: 'black' }}>
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{activity.time}</span>
                    {activity.duration && (
                      <>
                        <span className="mx-2">•</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{activity.duration}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-2 ml-auto">
                  <button 
                    onClick={() => handleEditActivity(activity)}
                    className="p-2 rounded-full text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 transition-colors"
                    title="Düzenle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                    title="Sil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card p-10 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Öğün bulunamadı</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">Aramanızla eşleşen öğün yok veya henüz öğün eklenmemiş. Yeni bir öğün eklemek ister misiniz?</p>
            <button 
              onClick={handleAddActivity}
              className="btn-primary mx-auto bg-gradient-green"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Yeni Öğün Ekle
            </button>
          </div>
        )}
      </div>

      {/* Öğün Ekleme/Düzenleme Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingActivity ? 'Öğünü Düzenle' : 'Yeni Öğün Ekle'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Öğün Adı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Saat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                      placeholder="08:00"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Süre
                    </label>
                    <input
                      type="text"
                      id="duration"
                      value={newActivity.duration}
                      onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                      placeholder="30 dakika"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    İçerik Detayı
                  </label>
                  <textarea
                    id="description"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kategori
                  </label>
                  <select
                    id="category"
                    value={newActivity.category}
                    onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  >
                    <option value="Kahvaltı">Kahvaltı</option>
                    <option value="Öğle">Öğle Yemeği</option>
                    <option value="Ara Öğün">Ara Öğün</option>
                    <option value="Akşam">Akşam Yemeği</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="completed"
                    checked={newActivity.completed}
                    onChange={(e) => setNewActivity({...newActivity, completed: e.target.checked})}
                    className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="completed" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Tamamlandı olarak işaretle
                  </label>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={handleSaveActivity}
                  className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-green border border-transparent rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                >
                  {editingActivity ? 'Güncelle' : 'Ekle'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Add Button */}
      <div className="fixed right-6 bottom-6 z-20">
        <button 
          onClick={handleAddActivity}
          className="h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl bg-gradient-green text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
} 
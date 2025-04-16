"use client";

import React, { useState } from 'react';
import { Activity } from '../types';
import SearchFilter from './shared/SearchFilter';
import { useCategories } from '../hooks/useCategories';

interface ActivityListProps {
  activities: Activity[];
  onActivityUpdate: (activity: Activity) => void;
  onActivityDelete: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onActivityUpdate,
  onActivityDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const { categories } = useCategories();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const startEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setEditTitle(activity.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const saveEdit = (activity: Activity) => {
    if (editTitle.trim()) {
      onActivityUpdate({
        ...activity,
        title: editTitle.trim(),
      });
      setEditingId(null);
      setEditTitle('');
    }
  };

  const confirmDelete = (id: string) => {
    setIsDeleting(id);
  };

  const cancelDelete = () => {
    setIsDeleting(null);
  };

  const handleDelete = (id: string) => {
    onActivityDelete(id);
    setIsDeleting(null);
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || activity.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-100';
  };

  return (
    <div className="space-y-6">
      <SearchFilter
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        categories={categories}
      />
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {filteredActivities.length === 0 ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">Hiç aktivite bulunamadı</p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                isDeleting === activity.id ? 'bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-gray-800'
              } rounded-xl shadow-sm hover:shadow-md border-l-4 ${getCategoryColor(activity.categoryId)}`}
            >
              <div className="flex items-center justify-between p-4 sm:p-5">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={activity.completed}
                      onChange={() =>
                        onActivityUpdate({
                          ...activity,
                          completed: !activity.completed,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {editingId === activity.id ? (
                      <div className="flex items-center space-x-2 w-full">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(activity)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                          autoFocus
                        />
                        <div className="flex space-x-1">
                          <button
                            onClick={() => saveEdit(activity)}
                            className="inline-flex items-center p-1.5 rounded-full text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
                            title="Kaydet"
                            type="button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="inline-flex items-center p-1.5 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
                            title="İptal"
                            type="button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span
                        className={`block truncate text-base ${
                          activity.completed 
                            ? 'line-through text-gray-500 dark:text-gray-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {activity.title}
                      </span>
                    )}
                    
                    <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.duration}</span>
                    </div>
                  </div>
                </div>
                
                {isDeleting === activity.id ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      type="button"
                    >
                      Sil
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
                      type="button"
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => startEdit(activity)}
                      className="p-1.5 rounded-full text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                      title="Düzenle"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => confirmDelete(activity.id)}
                      className="p-1.5 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                      title="Sil"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityList; 
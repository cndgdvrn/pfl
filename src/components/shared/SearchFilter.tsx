"use client";

import { ChangeEvent } from 'react';
import { Category } from '../../types';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filter?: string;
  selectedCategory?: string;
  onFilterChange: (value: string) => void;
  categories?: Category[];
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  selectedCategory,
  categories
}: SearchFilterProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Aktivite ara..."
          value={searchTerm}
          onChange={onSearchChange}
          className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:bg-gray-800 dark:ring-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 sm:text-sm"
        />
      </div>
      
      {filter !== undefined && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Tamamlanan
          </button>
          <button
            onClick={() => onFilterChange('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Bekleyen
          </button>
        </div>
      )}
      
      {categories && categories.length > 0 && (
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-2 flex-nowrap min-w-0">
            <button
              onClick={() => onFilterChange('')}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Tüm Kategoriler
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onFilterChange(selectedCategory === category.id ? '' : category.id)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { Category } from '../types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    // Örnek kategoriler
    const defaultCategories: Category[] = [
      { id: '1', name: 'Spor', icon: 'running', color: 'blue', path: '/spor' },
      { id: '2', name: 'Eğitim', icon: 'book', color: 'green', path: '/egitim' },
      { id: '3', name: 'İş', icon: 'briefcase', color: 'red', path: '/is' }
    ];
    
    setCategories(defaultCategories);
  }, []);

  return { categories };
} 
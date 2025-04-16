export interface Activity {
  id: string;
  title: string;
  time: string;
  duration: string;
  description: string;
  completed?: boolean;
  category: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  path: string;
} 
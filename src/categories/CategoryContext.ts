import React from 'react';

interface Category {
  name: string;
}

interface CategoryContextProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  editCategory: Category | null;
  setEditCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

export const CategoryContext = React.createContext<CategoryContextProps>({
  categories: [],
  setCategories: () => {},
  editCategory: null,
  setEditCategory: () => {},
});
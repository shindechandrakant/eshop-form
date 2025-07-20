import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Category } from '../types/GiftCard';

interface CategoryFormGiftProps {
  categories: Category[];
  onChange: (categories: Category[]) => void;
}

// Mock API categories - replace with actual API call
const AVAILABLE_CATEGORIES = [
  { id: 'cat001', name: 'E-commerce' },
  { id: 'cat002', name: 'Fashion' },
  { id: 'cat003', name: 'Electronics' },
  { id: 'cat004', name: 'Food & Dining' },
  { id: 'cat005', name: 'Entertainment' },
  { id: 'cat006', name: 'Travel' },
  { id: 'cat007', name: 'Health & Beauty' },
  { id: 'cat008', name: 'Home & Garden' },
  { id: 'cat009', name: 'Sports & Fitness' },
  { id: 'cat010', name: 'Books & Education' },
];

export const CategoryFormGift: React.FC<CategoryFormGiftProps> = ({ categories, onChange }) => {
  const addCategory = () => {
    const newCategory: Category = {
      id: '',
      name: '',
    };
    onChange([...categories, newCategory]);
  };

  const handleCategorySelect = (index: number, selectedCategoryId: string) => {
    const category = AVAILABLE_CATEGORIES.find(c => c.id === selectedCategoryId);
    if (category) {
      const updatedCategories = categories.map((c, i) => 
        i === index ? { id: category.id, name: category.name } : c
      );
      onChange(updatedCategories);
    }
  };

  const updateCategory = (index: number, field: keyof Category, value: string) => {
    const updatedCategories = categories.map((category, i) => {
      if (i === index) {
        return { ...category, [field]: value };
      }
      return category;
    });
    onChange(updatedCategories);
  };

  const removeCategory = (index: number) => {
    onChange(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Categories</h3>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </button>
      </div>

      {categories.map((category, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Category {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeCategory(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Category
              </label>
              <select
                value={category.id}
                onChange={(e) => handleCategorySelect(index, e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900"
              >
                <option value="">Select a category</option>
                {AVAILABLE_CATEGORIES.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category Name (Auto-filled)
              </label>
              <input
                type="text"
                value={category.name}
                className="block w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl shadow-sm text-slate-600 placeholder-slate-400"
                placeholder="Auto-filled from selection"
                readOnly
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
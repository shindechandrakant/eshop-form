import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Category } from '../types/Product';

interface CategoryFormProps {
  categories: Category[];
  onChange: (categories: Category[]) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ categories, onChange }) => {
  const addCategory = () => {
    const newCategory: Category = {
      id: '',
      name: '',
      parentId: null,
    };
    onChange([...categories, newCategory]);
  };

  const updateCategory = (index: number, field: keyof Category, value: string | null) => {
    const updatedCategories = categories.map((category, i) => 
      i === index ? { ...category, [field]: value } : category
    );
    onChange(updatedCategories);
  };

  const removeCategory = (index: number) => {
    onChange(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Product Categories</h3>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category ID
              </label>
              <input
                type="text"
                value={category.id}
                onChange={(e) => updateCategory(index, 'id', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={category.name}
                onChange={(e) => updateCategory(index, 'name', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Electronics"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Parent ID (optional)
              </label>
              <input
                type="text"
                value={category.parentId || ''}
                onChange={(e) => updateCategory(index, 'parentId', e.target.value || null)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Leave empty for root category"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
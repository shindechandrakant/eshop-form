import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Color } from '../types/Product';

interface ColorFormProps {
  colors: Color[];
  onChange: (colors: Color[]) => void;
}

export const ColorForm: React.FC<ColorFormProps> = ({ colors, onChange }) => {
  const addColor = () => {
    const newColor: Color = {
      id: '',
      value: '',
      count: '',
    };
    onChange([...colors, newColor]);
  };

  const updateColor = (index: number, field: keyof Color, value: string) => {
    const updatedColors = colors.map((color, i) => 
      i === index ? { ...color, [field]: value } : color
    );
    onChange(updatedColors);
  };

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Color Options</h3>
        <button
          type="button"
          onClick={addColor}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Color
        </button>
      </div>

      {colors.map((color, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Color {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeColor(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Color ID
              </label>
              <input
                type="text"
                value={color.id}
                onChange={(e) => updateColor(index, 'id', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Color Value
              </label>
              <input
                type="text"
                value={color.value}
                onChange={(e) => updateColor(index, 'value', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Stock Count
              </label>
              <input
                type="text"
                value={color.count}
                onChange={(e) => updateColor(index, 'count', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="12"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
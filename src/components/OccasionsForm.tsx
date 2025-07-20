import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Occasion } from '../types/GiftCard';
import { slugify } from '../utils/slugify';

interface OccasionsFormProps {
  occasions: Occasion[];
  onChange: (occasions: Occasion[]) => void;
}

export const OccasionsForm: React.FC<OccasionsFormProps> = ({ occasions, onChange }) => {
  const addOccasion = () => {
    const newOccasion: Occasion = {
      id: '',
      name: '',
    };
    onChange([...occasions, newOccasion]);
  };

  const updateOccasion = (index: number, field: keyof Occasion, value: string) => {
    const updatedOccasions = occasions.map((occasion, i) => {
      if (i === index) {
        if (field === 'name') {
          // Auto-generate slug when name changes
          return { ...occasion, [field]: value, id: slugify(value) };
        }
        return { ...occasion, [field]: value };
      }
      return occasion;
    });
    onChange(updatedOccasions);
  };

  const removeOccasion = (index: number) => {
    onChange(occasions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Occasions</h3>
        <button
          type="button"
          onClick={addOccasion}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Occasion
        </button>
      </div>

      {occasions.map((occasion, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Occasion {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeOccasion(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Occasion Name
              </label>
              <input
                type="text"
                value={occasion.name}
                onChange={(e) => updateOccasion(index, 'name', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Birthday"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Occasion ID (Auto-generated)
              </label>
              <input
                type="text"
                value={occasion.id}
                className="block w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl shadow-sm text-slate-600 placeholder-slate-400"
                placeholder="Auto-generated from name"
                readOnly
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
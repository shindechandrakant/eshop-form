import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { StoreLocation } from '../types/GiftCard';

interface StoreLocatorFormProps {
  stores: StoreLocation[];
  onChange: (stores: StoreLocation[]) => void;
}

export const StoreLocatorForm: React.FC<StoreLocatorFormProps> = ({ stores, onChange }) => {
  const addStore = () => {
    const newStore: StoreLocation = {
      name: '',
      address: '',
    };
    onChange([...stores, newStore]);
  };

  const updateStore = (index: number, field: keyof StoreLocation, value: string) => {
    const updatedStores = stores.map((store, i) => 
      i === index ? { ...store, [field]: value } : store
    );
    onChange(updatedStores);
  };

  const removeStore = (index: number) => {
    onChange(stores.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Store Locator</h3>
        <button
          type="button"
          onClick={addStore}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Store
        </button>
      </div>

      {stores.map((store, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Store {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeStore(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                value={store.name}
                onChange={(e) => updateStore(index, 'name', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Amazon Store Delhi"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={store.address}
                onChange={(e) => updateStore(index, 'address', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Plot No. 1, Delhi, India"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Information } from '../types/GiftCard';

interface InformationFormProps {
  information: Information[];
  onChange: (information: Information[]) => void;
}

export const InformationForm: React.FC<InformationFormProps> = ({ information, onChange }) => {
  const addInformation = () => {
    const newInfo: Information = {
      position: information.length + 1,
      title: '',
      description: '',
    };
    onChange([...information, newInfo]);
  };

  const updateInformation = (index: number, field: keyof Information, value: string | number) => {
    const updatedInfo = information.map((info, i) => 
      i === index ? { ...info, [field]: value } : info
    );
    onChange(updatedInfo);
  };

  const removeInformation = (index: number) => {
    const updatedInfo = information
      .filter((_, i) => i !== index)
      .map((info, i) => ({ ...info, position: i + 1 }));
    onChange(updatedInfo);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-slate-800">Additional Information</h4>
        <button
          type="button"
          onClick={addInformation}
          className="inline-flex items-center px-3 py-2 border-2 border-indigo-500 text-xs font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Info
        </button>
      </div>

      {information.map((info, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Info {info.position}
            </span>
            <button
              type="button"
              onClick={() => removeInformation(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={info.title}
                onChange={(e) => updateInformation(index, 'title', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Information title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={info.description}
                onChange={(e) => updateInformation(index, 'description', e.target.value)}
                rows={3}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Information description"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
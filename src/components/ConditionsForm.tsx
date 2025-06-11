import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Condition } from '../types/GiftCard';

interface ConditionsFormProps {
  conditions: Condition[];
  onChange: (conditions: Condition[]) => void;
  title: string;
}

export const ConditionsForm: React.FC<ConditionsFormProps> = ({ conditions, onChange, title }) => {
  const addCondition = () => {
    const newCondition: Condition = {
      position: conditions.length + 1,
      description: '',
    };
    onChange([...conditions, newCondition]);
  };

  const updateCondition = (index: number, field: keyof Condition, value: string | number) => {
    const updatedConditions = conditions.map((condition, i) => 
      i === index ? { ...condition, [field]: value } : condition
    );
    onChange(updatedConditions);
  };

  const removeCondition = (index: number) => {
    const updatedConditions = conditions
      .filter((_, i) => i !== index)
      .map((condition, i) => ({ ...condition, position: i + 1 }));
    onChange(updatedConditions);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-slate-800">{title}</h4>
        <button
          type="button"
          onClick={addCondition}
          className="inline-flex items-center px-3 py-2 border-2 border-indigo-500 text-xs font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </button>
      </div>

      {conditions.map((condition, index) => (
        <div key={index} className="flex items-start space-x-3 p-4 border-2 border-slate-200 rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full text-xs font-semibold flex items-center justify-center text-slate-600 border-2 border-slate-200">
            {condition.position}
          </div>
          
          <div className="flex-1">
            <textarea
              value={condition.description}
              onChange={(e) => updateCondition(index, 'description', e.target.value)}
              rows={2}
              className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
              placeholder="Enter condition description..."
            />
          </div>

          <button
            type="button"
            onClick={() => removeCondition(index)}
            className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
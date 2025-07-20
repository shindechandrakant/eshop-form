import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { RedemptionStep, Image } from '../types/GiftCard';

interface RedemptionStepsFormProps {
  steps: RedemptionStep[];
  onChange: (steps: RedemptionStep[]) => void;
}

export const RedemptionStepsForm: React.FC<RedemptionStepsFormProps> = ({ steps, onChange }) => {
  const addStep = () => {
    const newStep: RedemptionStep = {
      position: steps.length + 1,
      title: '',
      description: '',
      image: {
        categorytype: 'instruction',
        name: '',
        url: '',
        width: 300,
        height: 200,
      },
    };
    onChange([...steps, newStep]);
  };

  const updateStep = (index: number, field: keyof RedemptionStep, value: string | number) => {
    const updatedSteps = steps.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    );
    onChange(updatedSteps);
  };

  const updateStepImage = (index: number, field: keyof Image, value: string | number) => {
    const updatedSteps = steps.map((step, i) => 
      i === index ? { ...step, image: { ...step.image, [field]: value } } : step
    );
    onChange(updatedSteps);
  };

  const removeStep = (index: number) => {
    const updatedSteps = steps
      .filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, position: i + 1 }));
    onChange(updatedSteps);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">How to Redeem</h3>
        <button
          type="button"
          onClick={addStep}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Step
        </button>
      </div>

      {steps.map((step, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Step {step.position}
            </span>
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(index, 'title', e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Step title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Position
                </label>
                <input
                  type="number"
                  value={step.position}
                  onChange={(e) => updateStep(index, 'position', parseInt(e.target.value) || 1)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={step.description}
                onChange={(e) => updateStep(index, 'description', e.target.value)}
                rows={3}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Step description"
              />
            </div>

            <div className="border-t-2 border-slate-200 pt-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-4 bg-slate-100 px-3 py-1 rounded-full inline-block">
                Instruction Image
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Image Name
                  </label>
                  <input
                    type="text"
                    value={step.image.name}
                    onChange={(e) => updateStepImage(index, 'name', e.target.value)}
                    className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="instruction_image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category Type
                  </label>
                  <input
                    type="text"
                    value={step.image.categorytype}
                    onChange={(e) => updateStepImage(index, 'categorytype', e.target.value)}
                    className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="instruction"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={step.image.url}
                    onChange={(e) => updateStepImage(index, 'url', e.target.value)}
                    className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="https://example.com/instruction.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Width
                  </label>
                  <input
                    type="number"
                    value={step.image.width}
                    onChange={(e) => updateStepImage(index, 'width', parseInt(e.target.value) || 300)}
                    className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Height
                  </label>
                  <input
                    type="number"
                    value={step.image.height}
                    onChange={(e) => updateStepImage(index, 'height', parseInt(e.target.value) || 200)}
                    className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
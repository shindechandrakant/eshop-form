import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Image } from '../types/GiftCard';

interface ImageFormProps {
  images: Image[];
  onChange: (images: Image[]) => void;
  title: string;
}

export const ImageForm: React.FC<ImageFormProps> = ({ images, onChange, title }) => {
  const addImage = () => {
    const newImage: Image = {
      categorytype: '',
      name: '',
      url: '',
      width: 0,
      height: 0,
    };
    onChange([...images, newImage]);
  };

  const updateImage = (index: number, field: keyof Image, value: string | number) => {
    const updatedImages = images.map((img, i) => 
      i === index ? { ...img, [field]: value } : img
    );
    onChange(updatedImages);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          onClick={addImage}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Image
        </button>
      </div>

      {images.map((image, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Image {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category Type
              </label>
              <input
                type="text"
                value={image.categorytype}
                onChange={(e) => updateImage(index, 'categorytype', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="e.g., front, back, category_icon"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={image.name}
                onChange={(e) => updateImage(index, 'name', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="Image name"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                URL
              </label>
              <input
                type="url"
                value={image.url}
                onChange={(e) => updateImage(index, 'url', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Width
              </label>
              <input
                type="number"
                value={image.width}
                onChange={(e) => updateImage(index, 'width', parseInt(e.target.value) || 0)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Height
              </label>
              <input
                type="number"
                value={image.height}
                onChange={(e) => updateImage(index, 'height', parseInt(e.target.value) || 0)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="400"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
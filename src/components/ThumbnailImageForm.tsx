import React from 'react';
import { ThumbnailImage } from '../types/Product';

interface ThumbnailImageFormProps {
  image: ThumbnailImage;
  onChange: (image: ThumbnailImage) => void;
}

export const ThumbnailImageForm: React.FC<ThumbnailImageFormProps> = ({ image, onChange }) => {
  const updateImage = (field: keyof ThumbnailImage, value: string | number) => {
    onChange({ ...image, [field]: value });
  };

  return (
    <div className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Image ID
          </label>
          <input
            type="text"
            value={image.id}
            onChange={(e) => updateImage('id', e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="img1"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Caption
          </label>
          <input
            type="text"
            value={image.caption}
            onChange={(e) => updateImage('caption', e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="Wireless Mouse"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={image.string}
            onChange={(e) => updateImage('string', e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="http://example.com/mouse.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Width
          </label>
          <input
            type="number"
            value={image.width}
            onChange={(e) => updateImage('width', parseInt(e.target.value) || 0)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="800"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Height
          </label>
          <input
            type="number"
            value={image.height}
            onChange={(e) => updateImage('height', parseInt(e.target.value) || 0)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="600"
          />
        </div>
      </div>
    </div>
  );
};
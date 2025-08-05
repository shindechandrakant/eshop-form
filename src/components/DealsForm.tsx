import React from "react";
import { Trash2, Plus } from "lucide-react";
import { Deal } from "../types/Cashback";
import { ImageUploadField } from "./ImageUploadField";

interface DealsFormProps {
  deals: Deal[];
  onChange: (deals: Deal[]) => void;
}

export const DealsForm: React.FC<DealsFormProps> = ({ deals, onChange }) => {
  const addDeal = () => {
    const newDeal: Deal = {
      thumbnailImage: "",
      title: "",
      description: "",
      redirectUrl: "",
      previousCashbackPercentage: 0,
      currentCashbackPercentage: 0,
    };
    onChange([...deals, newDeal]);
  };

  const updateDeal = (index: number, field: keyof Deal, value: string | number) => {
    const updatedDeals = deals.map((deal, i) => (i === index ? { ...deal, [field]: value } : deal));
    onChange(updatedDeals);
  };

  const removeDeal = (index: number) => {
    onChange(deals.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Deals</h3>
        <button
          type="button"
          onClick={addDeal}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Deal
        </button>
      </div>

      {deals.map((deal, index) => (
        <div
          key={index}
          className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Deal {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeDeal(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <ImageUploadField
              value={deal.thumbnailImage}
              onChange={(value) => updateDeal(index, "thumbnailImage", value)}
              label="Deal Thumbnail Image"
              required
              placeholder="https://example.com/images/deal1.jpg"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={deal.title}
                  onChange={(e) => updateDeal(index, "title", e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Limited Time Deal"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Redirect URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={deal.redirectUrl}
                  onChange={(e) => updateDeal(index, "redirectUrl", e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="https://example.com/deals/iphone"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={deal.description}
                onChange={(e) => updateDeal(index, "description", e.target.value)}
                rows={3}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Save big on iPhones"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Previous Cashback % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={deal.previousCashbackPercentage}
                  onChange={(e) =>
                    updateDeal(index, "previousCashbackPercentage", parseInt(e.target.value) || 0)
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="5"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Cashback % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={deal.currentCashbackPercentage}
                  onChange={(e) =>
                    updateDeal(index, "currentCashbackPercentage", parseInt(e.target.value) || 0)
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="8"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

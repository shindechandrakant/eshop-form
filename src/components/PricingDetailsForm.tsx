import React from "react";
import { Trash2, Plus } from "lucide-react";
import { PricingDetails, CashbackRate } from "../types/Cashback";

interface PricingDetailsFormProps {
  pricingDetails: PricingDetails;
  onChange: (pricingDetails: PricingDetails) => void;
}

export const PricingDetailsForm: React.FC<PricingDetailsFormProps> = ({
  pricingDetails,
  onChange,
}) => {
  const addCashbackRate = () => {
    const newRate: CashbackRate = {
      id: pricingDetails.cashbackRates.length + 1,
      cashbackPercentage: 0,
      categoryName: "",
    };
    onChange({
      ...pricingDetails,
      cashbackRates: [...pricingDetails.cashbackRates, newRate],
    });
  };

  const updateCashbackRate = (
    index: number,
    field: keyof Omit<CashbackRate, "_id">,
    value: string | number
  ) => {
    const updatedRates = pricingDetails.cashbackRates.map((rate, i) =>
      i === index ? { ...rate, [field]: value } : rate
    );
    onChange({
      ...pricingDetails,
      cashbackRates: updatedRates,
    });
  };

  const removeCashbackRate = (index: number) => {
    onChange({
      ...pricingDetails,
      cashbackRates: pricingDetails.cashbackRates.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Max Cashback Percentage <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={pricingDetails.maxCashbackPercentage}
            onChange={(e) =>
              onChange({
                ...pricingDetails,
                maxCashbackPercentage: parseInt(e.target.value) || 0,
              })
            }
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="10"
            min="0"
            max="100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Previous Cashback Percentage <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={pricingDetails.previousCashbackPercentage}
            onChange={(e) =>
              onChange({
                ...pricingDetails,
                previousCashbackPercentage: parseInt(e.target.value) || 0,
              })
            }
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="5"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-800">Cashback Rates</h4>
          <button
            type="button"
            onClick={addCashbackRate}
            className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Rate
          </button>
        </div>

        {pricingDetails.cashbackRates.map((rate, index) => (
          <div
            key={index}
            className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                Rate {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeCashbackRate(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ID (Auto-generated)
                </label>
                <input
                  type="number"
                  value={rate.id}
                  className="block w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl shadow-sm text-slate-600 placeholder-slate-400"
                  placeholder="1"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cashback % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={rate.cashbackPercentage}
                  onChange={(e) =>
                    updateCashbackRate(index, "cashbackPercentage", parseInt(e.target.value) || 0)
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
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={rate.categoryName}
                  onChange={(e) => updateCashbackRate(index, "categoryName", e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Smartphones"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

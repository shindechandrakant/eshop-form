import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { VoucherOption } from '../types/GiftCard';

interface VoucherOptionsFormProps {
  voucherOptions: VoucherOption[];
  onChange: (voucherOptions: VoucherOption[]) => void;
}

const CURRENCY_OPTIONS = [
  { code: 'INR', name: 'Indian Rupee (₹)' },
  { code: 'USD', name: 'US Dollar ($)' },
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'GBP', name: 'British Pound (£)' },
  { code: 'CAD', name: 'Canadian Dollar (C$)' },
  { code: 'AUD', name: 'Australian Dollar (A$)' },
  { code: 'JPY', name: 'Japanese Yen (¥)' },
  { code: 'SGD', name: 'Singapore Dollar (S$)' },
  { code: 'AED', name: 'UAE Dirham (د.إ)' },
];

export const VoucherOptionsForm: React.FC<VoucherOptionsFormProps> = ({ voucherOptions, onChange }) => {
  const addVoucherOption = () => {
    const newOption: VoucherOption = {
      denominationCurrency: 'INR',
      denomination: 0,
      customerPrice: 0,
      discountPercentage: 0,
      discountValue: 0,
    };
    onChange([...voucherOptions, newOption]);
  };

  const updateVoucherOption = (index: number, field: keyof VoucherOption, value: string | number) => {
    const updatedOptions = voucherOptions.map((option, i) => {
      if (i === index) {
        const updatedOption = { ...option, [field]: value };
        
        // Auto-calculate discount value when percentage or denomination changes
        if (field === 'discountPercentage' || field === 'denomination') {
          const percentage = field === 'discountPercentage' ? Number(value) : option.discountPercentage || 0;
          const denomination = field === 'denomination' ? Number(value) : option.denomination;
          updatedOption.discountValue = Math.round((denomination * percentage) / 100);
          updatedOption.customerPrice = denomination - updatedOption.discountValue;
        }
        
        // Auto-calculate discount percentage when discount value changes
        if (field === 'discountValue') {
          const discountValue = Number(value);
          const percentage = option.denomination > 0 ? Math.round((discountValue / option.denomination) * 100) : 0;
          updatedOption.discountPercentage = percentage;
          updatedOption.customerPrice = option.denomination - discountValue;
        }
        
        // Auto-calculate discount when customer price changes
        if (field === 'customerPrice') {
          const customerPrice = Number(value);
          const discountValue = option.denomination - customerPrice;
          const percentage = option.denomination > 0 ? Math.round((discountValue / option.denomination) * 100) : 0;
          updatedOption.discountValue = discountValue;
          updatedOption.discountPercentage = percentage;
        }
        
        return updatedOption;
      }
      return option;
    });
    onChange(updatedOptions);
  };

  const removeVoucherOption = (index: number) => {
    onChange(voucherOptions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Voucher Options</h3>
        <button
          type="button"
          onClick={addVoucherOption}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Option
        </button>
      </div>

      {voucherOptions.map((option, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Option {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeVoucherOption(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Currency
              </label>
              <select
                value={option.denominationCurrency}
                onChange={(e) => updateVoucherOption(index, 'denominationCurrency', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900"
              >
                {CURRENCY_OPTIONS.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Denomination
              </label>
              <input
                type="number"
                value={option.denomination}
                onChange={(e) => updateVoucherOption(index, 'denomination', parseInt(e.target.value) || 0)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Customer Price
              </label>
              <input
                type="number"
                value={option.customerPrice}
                onChange={(e) => updateVoucherOption(index, 'customerPrice', parseInt(e.target.value) || 0)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="475"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Discount %
              </label>
              <input
                type="number"
                value={option.discountPercentage || ''}
                onChange={(e) => updateVoucherOption(index, 'discountPercentage', parseInt(e.target.value) || 0)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="5"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Discount Value
              </label>
              <input
                type="number"
                value={option.discountValue || ''}
                onChange={(e) => updateVoucherOption(index, 'discountValue', parseInt(e.target.value) || 0)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="25"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
import React from 'react';
import { Supplier, Manufacturer } from '../types/Product';

interface CompanyFormProps {
  company: Supplier | Manufacturer;
  onChange: (company: Supplier | Manufacturer) => void;
  title: string;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ company, onChange, title }) => {
  const updateCompany = (field: keyof (Supplier | Manufacturer), value: string) => {
    onChange({ ...company, [field]: value });
  };

  return (
    <div className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {title} ID
          </label>
          <input
            type="text"
            value={company.id}
            onChange={(e) => updateCompany('id', e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="sup1"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {title} Name
          </label>
          <input
            type="text"
            value={company.name}
            onChange={(e) => updateCompany('name', e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="TechSupply"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={company.address}
            onChange={(e) => updateCompany('address', e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="123 Tech Street"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contact
          </label>
          <input
            type="text"
            value={company.contact}
            onChange={(e) => updateCompany('contact', e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
            placeholder="1234567890"
          />
        </div>
      </div>
    </div>
  );
};
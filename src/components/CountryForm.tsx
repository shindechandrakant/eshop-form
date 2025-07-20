import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Country } from '../types/GiftCard';

interface CountryFormProps {
  countries: Country[];
  onChange: (countries: Country[]) => void;
}

const COUNTRY_OPTIONS = [
  { name: 'India', ISOCode: 'IN' },
  { name: 'United States', ISOCode: 'US' },
  { name: 'United Kingdom', ISOCode: 'GB' },
  { name: 'Canada', ISOCode: 'CA' },
  { name: 'Australia', ISOCode: 'AU' },
  { name: 'Germany', ISOCode: 'DE' },
  { name: 'France', ISOCode: 'FR' },
  { name: 'Japan', ISOCode: 'JP' },
  { name: 'Singapore', ISOCode: 'SG' },
  { name: 'United Arab Emirates', ISOCode: 'AE' },
];

export const CountryForm: React.FC<CountryFormProps> = ({ countries, onChange }) => {
  const addCountry = () => {
    const newCountry: Country = {
      name: '',
      ISOCode: '',
    };
    onChange([...countries, newCountry]);
  };

  const updateCountry = (index: number, field: keyof Country, value: string) => {
    const updatedCountries = countries.map((country, i) => 
      i === index ? { ...country, [field]: value } : country
    );
    onChange(updatedCountries);
  };

  const handleCountrySelect = (index: number, selectedCountry: string) => {
    const country = COUNTRY_OPTIONS.find(c => c.name === selectedCountry);
    if (country) {
      const updatedCountries = countries.map((c, i) => 
        i === index ? { name: country.name, ISOCode: country.ISOCode } : c
      );
      onChange(updatedCountries);
    }
  };

  const removeCountry = (index: number) => {
    onChange(countries.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Supported Countries</h3>
        <button
          type="button"
          onClick={addCountry}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Country
        </button>
      </div>

      {countries.map((country, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Country {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeCountry(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Country Name
              </label>
              <select
                value={country.name}
                onChange={(e) => handleCountrySelect(index, e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900"
              >
                <option value="">Select a country</option>
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option.ISOCode} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ISO Code
              </label>
              <input
                type="text"
                value={country.ISOCode}
                onChange={(e) => updateCountry(index, 'ISOCode', e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="IN"
                readOnly
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
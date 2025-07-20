import React, { useState } from 'react';
import { GiftCardForm } from './components/GiftCardForm';
import { ProductForm } from './components/ProductForm';
import { Gift, Package } from 'lucide-react';

type FormType = 'giftcard' | 'product';

function App() {
  const [activeForm, setActiveForm] = useState<FormType>('giftcard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b-2 border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-6">
            <div className="flex bg-slate-100 rounded-2xl p-2 shadow-lg border-2 border-slate-200">
              <button
                onClick={() => setActiveForm('giftcard')}
                className={`inline-flex items-center px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300 ${
                  activeForm === 'giftcard'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <Gift className="w-5 h-5 mr-2" />
                Gift Card Form
              </button>
              
              <button
                onClick={() => setActiveForm('product')}
                className={`inline-flex items-center px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300 ${
                  activeForm === 'product'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <Package className="w-5 h-5 mr-2" />
                Product Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="transition-all duration-500 ease-in-out">
        {activeForm === 'giftcard' ? <GiftCardForm /> : <ProductForm />}
      </div>
    </div>
  );
}

export default App;
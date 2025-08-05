import React from "react";
import { Trash2, Plus } from "lucide-react";
import { FAQ } from "../types/Cashback";

interface FAQsFormProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}

export const FAQsForm: React.FC<FAQsFormProps> = ({ faqs, onChange }) => {
  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: faqs.length > 0 ? Math.max(...faqs.map((f) => f.id)) + 1 : 101,
      question: "",
      answer: "",
    };
    onChange([...faqs, newFAQ]);
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string | number) => {
    const updatedFAQs = faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq));
    onChange(updatedFAQs);
  };

  const removeFAQ = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">FAQs</h3>
        <button
          type="button"
          onClick={addFAQ}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add FAQ
        </button>
      </div>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              FAQ {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeFAQ(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                FAQ ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={faq.id}
                onChange={(e) => updateFAQ(index, "id", parseInt(e.target.value) || 0)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="101"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Question <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => updateFAQ(index, "question", e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="How do I redeem cashback?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Answer <span className="text-red-500">*</span>
              </label>
              <textarea
                value={faq.answer}
                onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                rows={3}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Cashback is credited within 7 days of purchase."
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

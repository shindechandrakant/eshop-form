import React from "react";
import { ContactDetails } from "../types/Cashback";

interface ContactDetailsFormProps {
  contactDetails: ContactDetails;
  onChange: (contactDetails: ContactDetails) => void;
}

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  contactDetails,
  onChange,
}) => {
  const updateContactDetails = (field: keyof ContactDetails, value: string) => {
    onChange({ ...contactDetails, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Customer Service Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={contactDetails.customerServiceNumber}
          onChange={(e) => updateContactDetails("customerServiceNumber", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="+1-800-555-1234"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Facebook <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={contactDetails.facebook}
          onChange={(e) => updateContactDetails("facebook", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="https://facebook.com/apple"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Instagram <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={contactDetails.instagram}
          onChange={(e) => updateContactDetails("instagram", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="https://instagram.com/apple"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Twitter <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={contactDetails.twitter}
          onChange={(e) => updateContactDetails("twitter", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="https://twitter.com/apple"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          YouTube <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={contactDetails.youtube}
          onChange={(e) => updateContactDetails("youtube", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="https://youtube.com/apple"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          LinkedIn <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={contactDetails.linkedin}
          onChange={(e) => updateContactDetails("linkedin", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="https://linkedin.com/company/apple"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          TikTok <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={contactDetails.tiktok}
          onChange={(e) => updateContactDetails("tiktok", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="https://tiktok.com/@apple"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Pinterest <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={contactDetails.pinterest}
          onChange={(e) => updateContactDetails("pinterest", e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="https://pinterest.com/apple"
          required
        />
      </div>
    </div>
  );
};

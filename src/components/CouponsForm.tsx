import React from "react";
import { Trash2, Plus } from "lucide-react";
import { Coupon } from "../types/Cashback";
import { ImageUploadField } from "./ImageUploadField";

interface CouponsFormProps {
  coupons: Coupon[];
  onChange: (coupons: Coupon[]) => void;
}

export const CouponsForm: React.FC<CouponsFormProps> = ({ coupons, onChange }) => {
  const addCoupon = () => {
    const newCoupon: Coupon = {
      thumbnailImage: "",
      title: "",
      description: "",
      code: "",
      redirectUrl: "",
    };
    onChange([...coupons, newCoupon]);
  };

  const updateCoupon = (index: number, field: keyof Coupon, value: string) => {
    const updatedCoupons = coupons.map((coupon, i) =>
      i === index ? { ...coupon, [field]: value } : coupon
    );
    onChange(updatedCoupons);
  };

  const removeCoupon = (index: number) => {
    onChange(coupons.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Coupons</h3>
        <button
          type="button"
          onClick={addCoupon}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Coupon
        </button>
      </div>

      {coupons.map((coupon, index) => (
        <div
          key={index}
          className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Coupon {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeCoupon(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <ImageUploadField
              value={coupon.thumbnailImage}
              onChange={(value) => updateCoupon(index, "thumbnailImage", value)}
              label="Coupon Thumbnail Image"
              required
              placeholder="https://example.com/images/coupon1.jpg"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={coupon.title}
                  onChange={(e) => updateCoupon(index, "title", e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="10% Off"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={coupon.code}
                  onChange={(e) => updateCoupon(index, "code", e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="SAVE10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={coupon.description}
                onChange={(e) => updateCoupon(index, "description", e.target.value)}
                rows={3}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Get 10% off on your next purchase"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Redirect URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={coupon.redirectUrl}
                onChange={(e) => updateCoupon(index, "redirectUrl", e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="https://example.com/deals/save10"
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

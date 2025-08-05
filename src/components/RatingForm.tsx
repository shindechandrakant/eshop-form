import React from "react";
import { Rating } from "../types/Cashback";

interface RatingFormProps {
  rating: Rating;
  onChange: (rating: Rating) => void;
}

export const RatingForm: React.FC<RatingFormProps> = ({ rating, onChange }) => {
  const updateRating = (field: keyof Rating, value: number) => {
    onChange({ ...rating, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Total Ratings</label>
        <input
          type="number"
          value={rating.totalRatings}
          onChange={(e) => updateRating("totalRatings", parseInt(e.target.value) || 0)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="48"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Out of Rating</label>
        <input
          type="number"
          value={rating.outOfRating}
          onChange={(e) => updateRating("outOfRating", parseInt(e.target.value) || 5)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="5"
          min="1"
          max="10"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">Rating Count</label>
        <input
          type="number"
          value={rating.ratingCount}
          onChange={(e) => updateRating("ratingCount", parseInt(e.target.value) || 0)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder="16"
          min="0"
        />
      </div>
    </div>
  );
};

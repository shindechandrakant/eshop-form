import React from "react";
import { X } from "lucide-react";
import { Occasion } from "../types/GiftCard";

interface OccasionsFormProps {
  occasions: Occasion[];
  onChange: (occasions: Occasion[]) => void;
}

// Available occasions - replace with actual API call
const AVAILABLE_OCCASIONS = [
  { id: "birthday", name: "Birthday" },
  { id: "anniversary", name: "Anniversary" },
  { id: "wedding", name: "Wedding" },
  { id: "graduation", name: "Graduation" },
  { id: "christmas", name: "Christmas" },
  { id: "valentines", name: "Valentine's Day" },
  { id: "mothers-day", name: "Mother's Day" },
  { id: "fathers-day", name: "Father's Day" },
  { id: "new-year", name: "New Year" },
  { id: "thanksgiving", name: "Thanksgiving" },
  { id: "easter", name: "Easter" },
  { id: "diwali", name: "Diwali" },
  { id: "eid", name: "Eid" },
  { id: "holi", name: "Holi" },
  { id: "retirement", name: "Retirement" },
  { id: "promotion", name: "Job Promotion" },
  { id: "housewarming", name: "Housewarming" },
  { id: "baby-shower", name: "Baby Shower" },
  { id: "get-well", name: "Get Well Soon" },
  { id: "thank-you", name: "Thank You" },
  { id: "congratulations", name: "Congratulations" },
  { id: "apology", name: "Apology" },
  { id: "just-because", name: "Just Because" },
];

export const OccasionsForm: React.FC<OccasionsFormProps> = ({ occasions, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOccasionToggle = (occasion: { id: string; name: string }) => {
    const isSelected = occasions.some((o) => o.id === occasion.id);

    if (isSelected) {
      // Remove occasion
      onChange(occasions.filter((o) => o.id !== occasion.id));
    } else {
      // Add occasion
      onChange([...occasions, { id: occasion.id, name: occasion.name }]);
    }
  };

  const removeOccasion = (occasionId: string) => {
    onChange(occasions.filter((o) => o.id !== occasionId));
  };

  const availableOccasions = AVAILABLE_OCCASIONS.filter(
    (available) => !occasions.some((selected) => selected.id === available.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Occasions</h3>
        <span className="text-sm text-slate-500">{occasions.length} selected</span>
      </div>

      {/* Selected Occasions */}
      {occasions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-700">Selected Occasions:</h4>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occasion) => (
              <div
                key={occasion.id}
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium rounded-full border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-200"
              >
                <span>{occasion.name}</span>
                <button
                  type="button"
                  onClick={() => removeOccasion(occasion.id)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dropdown for Adding Occasions */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-left text-slate-700 hover:border-slate-300"
        >
          {availableOccasions.length > 0
            ? `Add occasions (${availableOccasions.length} available)`
            : "All occasions selected"}
          <svg
            className={`w-5 h-5 float-right mt-0.5 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && availableOccasions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              {availableOccasions.map((occasion) => (
                <button
                  key={occasion.id}
                  type="button"
                  onClick={() => {
                    handleOccasionToggle(occasion);
                    // Keep dropdown open for multiple selections
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-800 rounded-lg transition-all duration-200 focus:outline-none focus:bg-indigo-50"
                >
                  {occasion.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      <p className="text-sm text-slate-500">
        Select the occasions when this gift card would be most appropriate. You can select multiple
        occasions.
      </p>
    </div>
  );
};

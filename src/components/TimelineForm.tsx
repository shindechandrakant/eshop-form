import React from "react";
import { Trash2, Plus } from "lucide-react";
import { TimelineItem } from "../types/Cashback";

interface TimelineFormProps {
  timeline: TimelineItem[];
  onChange: (timeline: TimelineItem[]) => void;
}

export const TimelineForm: React.FC<TimelineFormProps> = ({ timeline, onChange }) => {
  const addTimelineItem = () => {
    const newItem: TimelineItem = {
      hours: 0,
      title: "",
      shortTxt: "",
      longTxt: "",
    };
    onChange([...timeline, newItem]);
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: string | number) => {
    const updatedTimeline = timeline.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updatedTimeline);
  };

  const removeTimelineItem = (index: number) => {
    onChange(timeline.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Timeline</h3>
        <button
          type="button"
          onClick={addTimelineItem}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Timeline Item
        </button>
      </div>

      {timeline.map((item, index) => (
        <div
          key={index}
          className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Timeline {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeTimelineItem(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Hours <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={item.hours}
                  onChange={(e) =>
                    updateTimelineItem(index, "hours", parseInt(e.target.value) || 0)
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="2"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateTimelineItem(index, "title", e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Purchase Confirmed"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Short Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={item.shortTxt}
                onChange={(e) => updateTimelineItem(index, "shortTxt", e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder="We've confirmed your purchase"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Long Text <span className="text-red-500">*</span>
              </label>
              <textarea
                value={item.longTxt}
                onChange={(e) => updateTimelineItem(index, "longTxt", e.target.value)}
                rows={3}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Thank you! Your purchase has been successfully recorded and is now pending cashback."
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import React, { useRef } from "react";
import { Trash2, Plus, Upload, Loader2 } from "lucide-react";
import { RedemptionStep } from "../types/GiftCard";

interface RedemptionStepsFormNewProps {
  steps: RedemptionStep[];
  onChange: (steps: RedemptionStep[]) => void;
}

export const RedemptionStepsFormNew: React.FC<RedemptionStepsFormNewProps> = ({
  steps,
  onChange,
}) => {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [uploadingIndex, setUploadingIndex] = React.useState<number | null>(null);

  const addStep = () => {
    const newStep: RedemptionStep = {
      stepText: "",
      imgUrl: "",
    };
    onChange([...steps, newStep]);
  };

  const updateStep = (index: number, field: keyof RedemptionStep, value: string) => {
    const updatedSteps = steps.map((step, i) => (i === index ? { ...step, [field]: value } : step));
    onChange(updatedSteps);
  };

  const removeStep = (index: number) => {
    onChange(steps.filter((_, i) => i !== index));
    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
  };

  const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingIndex(index);
      try {
        // Upload to Cloudflare

        const url = "https://eshop-dev-api.rewardscompany.io/api/v1/giftcard/file/upload";
        // Upload to Cloudflare
        const formData = new FormData();
        formData.append("files", file);

        // Mock Cloudflare upload - replace with actual endpoint
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          updateStep(index, "imgUrl", data?.data?.[0]?.url); // Cloudflare returns the image URL
        } else {
          // Fallback to mock URL for demo
          const mockUrl = `https://imagedelivery.net/demo/${Date.now()}-${file.name}`;
          updateStep(index, "imgUrl", mockUrl);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        // Fallback to mock URL for demo
        const mockUrl = `https://imagedelivery.net/demo/${Date.now()}-${file.name}`;
        updateStep(index, "imgUrl", mockUrl);
      } finally {
        setUploadingIndex(null);
      }
    }
  };

  const handleUploadClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">How to Redeem</h3>
        <button
          type="button"
          onClick={addStep}
          className="inline-flex items-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Step
        </button>
      </div>

      {steps.map((step, index) => (
        <div
          key={index}
          className="border-2 border-slate-200 rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              Step {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Step Text <span className="text-red-500">*</span>
              </label>
              <textarea
                value={step.stepText}
                onChange={(e) => updateStep(index, "stepText", e.target.value)}
                rows={3}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Go to Amazon.in and log into your account."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image URL <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  value={step.imgUrl}
                  onChange={(e) => updateStep(index, "imgUrl", e.target.value)}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="https://example.com/images/redeem-step1.jpg"
                  required
                />

                <button
                  type="button"
                  onClick={() => handleUploadClick(index)}
                  disabled={uploadingIndex === index}
                  className="inline-flex items-center px-4 py-2 border-2 border-slate-300 text-sm font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200 shadow-sm"
                >
                  {uploadingIndex === index ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </button>

                <input
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(index, e)}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

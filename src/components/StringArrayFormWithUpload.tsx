import React, { useRef } from "react";
import { Trash2, Plus, Upload, Loader2 } from "lucide-react";

interface StringArrayFormWithUploadProps {
  items: string[];
  onChange: (items: string[]) => void;
  title: string;
  placeholder: string;
  required?: boolean;
  allowUpload?: boolean;
}

export const StringArrayFormWithUpload: React.FC<StringArrayFormWithUploadProps> = ({
  items,
  onChange,
  title,
  placeholder,
  required = false,
  allowUpload = false,
}) => {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [uploadingIndex, setUploadingIndex] = React.useState<number | null>(null);

  const addItem = () => {
    onChange([...items, ""]);
  };

  const updateItem = (index: number, value: string) => {
    const updatedItems = items.map((item, i) => (i === index ? value : item));
    onChange(updatedItems);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
  };

  const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingIndex(index);
      try {
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
          updateItem(index, data?.data?.[0]?.url); // Cloudflare returns the image URL
        } else {
          // Fallback to mock URL for demo
          const mockUrl = `https://imagedelivery.net/demo/${Date.now()}-${file.name}`;
          updateItem(index, mockUrl);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        // Fallback to mock URL for demo
        const mockUrl = `https://imagedelivery.net/demo/${Date.now()}-${file.name}`;
        updateItem(index, mockUrl);
      } finally {
        setUploadingIndex(null);
      }
    }
  };

  const handleUploadClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-slate-800">
          {title} {required && <span className="text-red-500">*</span>}
        </h4>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center px-3 py-2 border-2 border-indigo-500 text-xs font-semibold rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </button>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="border-2 border-slate-200 rounded-xl p-4 bg-gradient-to-br from-white to-slate-50 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full text-xs font-semibold flex items-center justify-center text-slate-600 border-2 border-slate-200">
              {index + 1}
            </div>

            <div className="flex-1">
              <input
                type={allowUpload ? "url" : "text"}
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                placeholder={placeholder}
                required={required}
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {allowUpload && (
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleUploadClick(index)}
                disabled={uploadingIndex === index}
                className="inline-flex items-center px-3 py-2 border-2 border-slate-300 text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200 shadow-sm"
              >
                {uploadingIndex === index ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-3 h-3 mr-1" />
                    Upload
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
          )}
        </div>
      ))}

      {required && items.length === 0 && (
        <p className="text-sm text-red-500 mt-2">At least one item is required</p>
      )}
    </div>
  );
};

import React, { useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label,
  required = false,
  placeholder = "Enter image URL or upload image",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
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
          console.log("File upload json");
          console.log(data?.data?.[0]?.url);
          onChange(data?.data?.[0]?.url); // Cloudflare returns the image URL
        } else {
          // Fallback to mock URL for demo
          const mockUrl = `https://imagedelivery.net/demo/${Date.now()}-${file.name}`;
          onChange(mockUrl);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        // Fallback to mock URL for demo
        const mockUrl = `https://imagedelivery.net/demo/${Date.now()}-${file.name}`;
        onChange(mockUrl);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="space-y-3">
        {/* URL Input */}
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
          placeholder={placeholder}
          required={required}
        />

        {/* Upload Section */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={uploading}
            className="inline-flex items-center px-4 py-2 border-2 border-slate-300 text-sm font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200 shadow-sm"
          >
            {uploading ? (
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

          {value && (
            <button
              type="button"
              onClick={clearImage}
              className="inline-flex items-center px-3 py-2 text-sm font-semibold rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </button>
          )}
        </div>

        {/* Image Preview */}
        {value && (
          <div className="mt-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={value}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border-2 border-slate-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling!.style.display = "flex";
                  }}
                />
                <div
                  className="w-16 h-16 bg-slate-100 rounded-lg border-2 border-slate-200 flex items-center justify-center"
                  style={{ display: "none" }}
                >
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 mb-1">Image Preview</p>
                <p className="text-xs text-slate-500 truncate">{value}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

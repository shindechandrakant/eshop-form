import React, { useState } from "react";
import { Save, Download, Eye } from "lucide-react";
import { GiftCard } from "../types/GiftCard";
import { FormSection } from "./FormSection";
import { CountryForm } from "./CountryForm";
import { CategoryFormGift } from "./CategoryFormGift";
import { VoucherOptionsForm } from "./VoucherOptionsForm";
import { OccasionsForm } from "./OccasionsForm";
import { RedemptionStepsFormNew } from "./RedemptionStepsFormNew";
import { StoreLocatorForm } from "./StoreLocatorForm";
import { StringArrayFormWithUpload } from "./StringArrayFormWithUpload";
import { ImageUploadField } from "./ImageUploadField";
import { slugify } from "../utils/slugify";
import { addCardService } from "../../public/api/api";

export const GiftCardForm: React.FC = () => {
  const [formData, setFormData] = useState<GiftCard>({
    country: [],
    category: [],
    giftCardCompany: {
      id: "",
      name: "",
    },
    companyDescription: "",
    redemptionOption: "both",
    voucherDescription: "",
    thumbnailImage: "",
    images: [],
    howToRedeem: [],
    termsAndConditions: [],
    usageInstructions: [],
    storeLocator: [],
    watchVideo: [],
    voucherOptions: [],
    occasions: [],
    isFeatured: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validations based on Joi schema
    if (formData.country.length === 0) {
      newErrors.country = "At least one country is required";
    }

    if (formData.category.length === 0) {
      newErrors.category = "At least one category is required";
    }

    if (!formData.giftCardCompany.name.trim()) {
      newErrors.giftCardCompanyName = "Company name is required";
    }

    if (!formData.companyDescription.trim()) {
      newErrors.companyDescription = "Company description is required";
    }

    if (!formData.thumbnailImage.trim()) {
      newErrors.thumbnailImage = "Thumbnail image is required";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    if (formData.termsAndConditions.length === 0) {
      newErrors.termsAndConditions = "Terms and conditions are required";
    }

    if (formData.voucherOptions.length === 0) {
      newErrors.voucherOptions = "At least one voucher option is required";
    }

    // Validate voucher options
    formData.voucherOptions.forEach((option, index) => {
      if (!option.denominationCurrency) {
        newErrors[`voucherOption${index}Currency`] = "Currency is required";
      }
      if (!option.denomination) {
        newErrors[`voucherOption${index}Denomination`] = "Denomination is required";
      }
      if (!option.customerPrice) {
        newErrors[`voucherOption${index}CustomerPrice`] = "Customer price is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Gift Card Data:", JSON.stringify(formData, null, 2));
      const response = await addCardService(formData);
      console.log("Response:", response);
      alert("Gift card data logged to console!");
    } else {
      alert("Please fix the validation errors before submitting.");
    }
  };

  const handleExport = () => {
    if (validateForm()) {
      const dataStr = JSON.stringify(formData, null, 2);
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `gift-card-${formData.giftCardCompany.name || "untitled"}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } else {
      alert("Please fix the validation errors before exporting.");
    }
  };

  const handlePreview = () => {
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Gift Card Preview</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
              pre { background: #f4f4f4; padding: 20px; border-radius: 5px; overflow-x: auto; }
            </style>
          </head>
          <body>
            <h1>Gift Card Schema Preview</h1>
            <pre>${JSON.stringify(formData, null, 2)}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Gift Card Management
          </h1>
          <p className="text-lg text-slate-600">
            Create and configure gift cards with detailed information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Countries */}
          <FormSection title="Supported Countries">
            <CountryForm
              countries={formData.country}
              onChange={(country) => setFormData({ ...formData, country })}
            />
            {errors.country && <p className="text-red-500 text-sm mt-2">{errors.country}</p>}
          </FormSection>

          {/* Categories */}
          <FormSection title="Categories">
            <CategoryFormGift
              categories={formData.category}
              onChange={(category) => setFormData({ ...formData, category })}
            />
            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
          </FormSection>

          {/* Gift Card Company */}
          <FormSection title="Gift Card Company">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.giftCardCompany.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      giftCardCompany: {
                        ...formData.giftCardCompany,
                        name: e.target.value,
                        id: slugify(e.target.value),
                      },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Amazon"
                  required
                />
                {errors.giftCardCompanyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.giftCardCompanyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Company ID (Auto-generated)
                </label>
                <input
                  type="text"
                  value={formData.giftCardCompany.id}
                  className="block w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl shadow-sm text-slate-600 placeholder-slate-400"
                  placeholder="Auto-generated from name"
                  readOnly
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Company Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                  rows={4}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                  placeholder="Amazon is the world's largest online marketplace, offering a wide range of products."
                  required
                />
                {errors.companyDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyDescription}</p>
                )}
              </div>
            </div>
          </FormSection>

          {/* Basic Information */}
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Redemption Option <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {["in-store", "online", "both"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="redemptionOption"
                        value={option}
                        checked={formData.redemptionOption === option}
                        onChange={(e) =>
                          setFormData({ ...formData, redemptionOption: e.target.value })
                        }
                        className="w-4 h-4 text-indigo-600 bg-white border-2 border-slate-300 focus:ring-indigo-500 focus:ring-2"
                        required
                      />
                      <span className="text-sm font-medium text-slate-700 capitalize">
                        {option === "in-store"
                          ? "In-Store Only"
                          : option === "online"
                          ? "Online Only"
                          : "Both In-Store & Online"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Featured</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-5 h-5 text-indigo-600 bg-white border-2 border-slate-200 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-700">Mark as featured gift card</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Voucher Description
                </label>
                <textarea
                  value={formData.voucherDescription}
                  onChange={(e) => setFormData({ ...formData, voucherDescription: e.target.value })}
                  rows={4}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                  placeholder="Use this gift card on Amazon.in for shopping across categories."
                />
              </div>
            </div>
          </FormSection>

          {/* Images */}
          <FormSection title="Images">
            <div className="space-y-6">
              <ImageUploadField
                value={formData.thumbnailImage}
                onChange={(thumbnailImage) => setFormData({ ...formData, thumbnailImage })}
                label="Thumbnail Image"
                required
                placeholder="https://example.com/images/amazon-thumbnail.jpg"
              />
              {errors.thumbnailImage && (
                <p className="text-red-500 text-sm mt-1">{errors.thumbnailImage}</p>
              )}

              <StringArrayFormWithUpload
                items={formData.images}
                onChange={(images) => setFormData({ ...formData, images })}
                title="Gallery Images"
                placeholder="https://example.com/images/amazon1.jpg"
                required
                allowUpload
              />
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}

              <StringArrayFormWithUpload
                items={formData.watchVideo}
                onChange={(watchVideo) => setFormData({ ...formData, watchVideo })}
                title="Watch Videos"
                placeholder="https://example.com/videos/amazon-demo.mp4"
                allowUpload
              />
            </div>
          </FormSection>

          {/* Voucher Options */}
          <FormSection title="Voucher Options">
            <VoucherOptionsForm
              voucherOptions={formData.voucherOptions}
              onChange={(voucherOptions) => setFormData({ ...formData, voucherOptions })}
            />
            {errors.voucherOptions && (
              <p className="text-red-500 text-sm mt-1">{errors.voucherOptions}</p>
            )}
          </FormSection>

          {/* Occasions */}
          <FormSection title="Occasions">
            <OccasionsForm
              occasions={formData.occasions}
              onChange={(occasions) => setFormData({ ...formData, occasions })}
            />
          </FormSection>

          {/* Redemption Steps */}
          <FormSection title="Redemption Instructions">
            <RedemptionStepsFormNew
              steps={formData.howToRedeem}
              onChange={(howToRedeem) => setFormData({ ...formData, howToRedeem })}
            />
          </FormSection>

          {/* Terms and Instructions */}
          <FormSection title="Terms and Instructions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StringArrayFormWithUpload
                items={formData.termsAndConditions}
                onChange={(termsAndConditions) => setFormData({ ...formData, termsAndConditions })}
                title="Terms and Conditions"
                placeholder="Gift card can be used only on Amazon.in."
                required
              />

              <StringArrayFormWithUpload
                items={formData.usageInstructions}
                onChange={(usageInstructions) => setFormData({ ...formData, usageInstructions })}
                title="Usage Instructions"
                placeholder="Use the code at checkout."
              />
            </div>
            {errors.termsAndConditions && (
              <p className="text-red-500 text-sm mt-1">{errors.termsAndConditions}</p>
            )}
          </FormSection>

          {/* Store Locator */}
          <FormSection title="Store Locator">
            <StoreLocatorForm
              stores={formData.storeLocator}
              onChange={(storeLocator) => setFormData({ ...formData, storeLocator })}
            />
          </FormSection>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex items-center px-8 py-4 border-2 border-slate-300 shadow-lg text-base font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview Schema
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center px-8 py-4 border-2 border-emerald-500 text-base font-semibold rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all duration-200 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Export JSON
            </button>

            <button
              type="submit"
              className="inline-flex items-center px-10 py-4 border-2 border-indigo-600 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Gift Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

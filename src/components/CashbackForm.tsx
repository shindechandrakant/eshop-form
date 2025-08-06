import React, { useState } from "react";
import { Save, Download, Eye, ArrowLeft } from "lucide-react";
import { Cashback } from "../types/Cashback";
import { FormSection } from "./FormSection";
import { CountryFormCashback } from "./CountryFormCashback";
import { ContactDetailsForm } from "./ContactDetailsForm";
import { CouponsForm } from "./CouponsForm";
import { DealsForm } from "./DealsForm";
import { PricingDetailsForm } from "./PricingDetailsForm";
import { RatingForm } from "./RatingForm";
import { FAQsForm } from "./FAQsForm";
import { StoreLocatorFormCashback } from "./StoreLocatorFormCashback";
import { TimelineForm } from "./TimelineForm";
import { StringArrayFormWithUpload } from "./StringArrayFormWithUpload";
import { ImageUploadField } from "./ImageUploadField";
import { addCashbackService } from "../../public/api/api";

// Available categories for dropdown
const AVAILABLE_CATEGORIES = [
  { id: "cat001", name: "Electronics" },
  { id: "cat002", name: "Fashion" },
  { id: "cat003", name: "Home & Garden" },
  { id: "cat004", name: "Sports & Fitness" },
  { id: "cat005", name: "Health & Beauty" },
  { id: "cat006", name: "Books & Education" },
  { id: "cat007", name: "Food & Dining" },
  { id: "cat008", name: "Travel" },
  { id: "cat009", name: "Entertainment" },
  { id: "cat010", name: "Automotive" },
];

interface CashbackFormProps {
  editingCashback?: Cashback | null;
  onBackToList?: () => void;
}

export const CashbackForm: React.FC<CashbackFormProps> = ({ editingCashback, onBackToList }) => {
  const [formData, setFormData] = useState<Cashback>({
    country: [],
    category: {
      id: "",
      name: "",
    },
    brand: {
      id: "",
      name: "",
      description: "",
    },
    contactDetails: {
      customerServiceNumber: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      tiktok: "",
      pinterest: "",
    },
    thumbnailImage: "",
    images: [],
    cashbackOption: "both",
    isFeatured: false,
    coupons: [],
    deals: [],
    pricingDetails: {
      maxCashbackPercentage: 0,
      cashbackRates: [],
      previousCashbackPercentage: 0,
    },
    brandRedirectURL: "",
    rating: {
      totalRatings: 0,
      outOfRating: 5,
      ratingCount: 0,
    },
    faqs: [],
    termsAndConditions: [],
    storeLocator: [],
    watchVideo: "",
    timeline: [],
  });

  // Initialize form with editing data
  React.useEffect(() => {
    if (editingCashback) {
      setFormData(editingCashback);
    }
  }, [editingCashback]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validations
    if (formData.country.length === 0) {
      newErrors.country = "At least one country is required";
    }

    if (!formData.category.id.trim()) {
      newErrors.categoryId = "Category ID is required";
    }

    if (!formData.category.name.trim()) {
      newErrors.categoryName = "Category name is required";
    }

    if (!formData.brand.id.trim()) {
      newErrors.brandId = "Brand ID is required";
    }

    if (!formData.brand.name.trim()) {
      newErrors.brandName = "Brand name is required";
    }

    if (!formData.brand.description.trim()) {
      newErrors.brandDescription = "Brand description is required";
    }

    if (!formData.contactDetails.customerServiceNumber.trim()) {
      newErrors.customerServiceNumber = "Customer service number is required";
    }

    if (!formData.thumbnailImage.trim()) {
      newErrors.thumbnailImage = "Thumbnail image is required";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    if (!formData.brandRedirectURL.trim()) {
      newErrors.brandRedirectURL = "Brand redirect URL is required";
    }

    // if (!formData.watchVideo.trim()) {
    //   newErrors.watchVideo = "Watch video URL is required";
    // }

    // if (formData.coupons.length === 0) {
    //   newErrors.coupons = "At least one coupon is required";
    // }

    // if (formData.deals.length === 0) {
    //   newErrors.deals = "At least one deal is required";
    // }

    if (formData.faqs.length === 0) {
      newErrors.faqs = "At least one FAQ is required";
    }

    if (formData.termsAndConditions.length === 0) {
      newErrors.termsAndConditions = "Terms and conditions are required";
    }

    // if (formData.storeLocator.length === 0) {
    //   newErrors.storeLocator = "At least one store location is required";
    // }

    if (formData.timeline.length === 0) {
      newErrors.timeline = "At least one timeline item is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Cashback Data:", JSON.stringify(formData, null, 2));
      const response = await addCashbackService(formData);
      console.log("Response:", response);

      alert("Cashback data logged to console!");
    } else {
      alert("Please fix the validation errors before submitting.");
    }
  };

  const handleExport = () => {
    if (validateForm()) {
      const dataStr = JSON.stringify(formData, null, 2);
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = `cashback-${formData.brand.name || "untitled"}.json`;

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
            <title>Cashback Preview</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
              pre { background: #f4f4f4; padding: 20px; border-radius: 5px; overflow-x: auto; }
            </style>
          </head>
          <body>
            <h1>Cashback Schema Preview</h1>
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
            {editingCashback ? "Edit Cashback" : "Create New Cashback"}
          </h1>
          <p className="text-lg text-slate-600">
            {editingCashback
              ? "Update cashback information"
              : "Create and configure cashback offers with detailed information"}
          </p>

          {onBackToList && (
            <button
              type="button"
              onClick={onBackToList}
              className="inline-flex items-center px-4 py-2 mt-4 border-2 border-slate-300 text-sm font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Countries */}
          <FormSection title="Supported Countries">
            <CountryFormCashback
              countries={formData.country}
              onChange={(country) => setFormData({ ...formData, country })}
            />
            {errors.country && <p className="text-red-500 text-sm mt-2">{errors.country}</p>}
          </FormSection>

          {/* Category */}
          <FormSection title="Category Information">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category.id}
                onChange={(e) => {
                  const selectedCategory = AVAILABLE_CATEGORIES.find(
                    (cat) => cat.id === e.target.value
                  );
                  if (selectedCategory) {
                    setFormData({
                      ...formData,
                      category: { id: selectedCategory.id, name: selectedCategory.name },
                    });
                  }
                }}
                className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900"
                required
              >
                <option value="">Select a category</option>
                {AVAILABLE_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
              )}
              {errors.categoryName && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryName}</p>
              )}
            </div>
          </FormSection>

          {/* Brand Information */}
          <FormSection title="Brand Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Brand ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.brand.id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brand: { ...formData.brand, id: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="brand001"
                  required
                />
                {errors.brandId && <p className="text-red-500 text-sm mt-1">{errors.brandId}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.brand.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brand: { ...formData.brand, name: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Apple"
                  required
                />
                {errors.brandName && (
                  <p className="text-red-500 text-sm mt-1">{errors.brandName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Brand Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.brand.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brand: { ...formData.brand, description: e.target.value },
                    })
                  }
                  rows={4}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                  placeholder="Leading consumer electronics brand"
                  required
                />
                {errors.brandDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.brandDescription}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <ImageUploadField
                  value={formData.brand.image || ""}
                  onChange={(image) =>
                    setFormData({
                      ...formData,
                      brand: { ...formData.brand, image },
                    })
                  }
                  label="Brand Logo/Image"
                  placeholder="https://example.com/images/apple-logo.jpg"
                />
              </div>
            </div>
          </FormSection>

          {/* Contact Details */}
          <FormSection title="Contact Details">
            <ContactDetailsForm
              contactDetails={formData.contactDetails}
              onChange={(contactDetails) => setFormData({ ...formData, contactDetails })}
            />
            {errors.customerServiceNumber && (
              <p className="text-red-500 text-sm mt-2">{errors.customerServiceNumber}</p>
            )}
          </FormSection>

          {/* Images */}
          <FormSection title="Images">
            <div className="space-y-6">
              <ImageUploadField
                value={formData.thumbnailImage}
                onChange={(thumbnailImage) => setFormData({ ...formData, thumbnailImage })}
                label="Thumbnail Image"
                required
                placeholder="https://example.com/images/apple-thumbnail.jpg"
              />
              {errors.thumbnailImage && (
                <p className="text-red-500 text-sm mt-1">{errors.thumbnailImage}</p>
              )}

              <StringArrayFormWithUpload
                items={formData.images}
                onChange={(images) => setFormData({ ...formData, images })}
                title="Gallery Images"
                placeholder="https://example.com/images/apple-1.jpg"
                required
                allowUpload
              />
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>
          </FormSection>

          {/* Basic Settings */}
          <FormSection title="Basic Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Cashback Option <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {["online", "offline", "both"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="cashbackOption"
                        value={option}
                        checked={formData.cashbackOption === option}
                        onChange={(e) =>
                          setFormData({ ...formData, cashbackOption: e.target.value })
                        }
                        className="w-4 h-4 text-indigo-600 bg-white border-2 border-slate-300 focus:ring-indigo-500 focus:ring-2"
                        required
                      />
                      <span className="text-sm font-medium text-slate-700 capitalize">
                        {option === "both" ? "Both Online & Offline" : option}
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
                  <span className="text-sm text-slate-700">Mark as featured cashback offer</span>
                </div>
              </div>
            </div>

            {/* Conditional Fields Based on Cashback Option */}
            <div className="mt-6 space-y-6">
              {(formData.cashbackOption === "online" || formData.cashbackOption === "both") && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Brand Redirect URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={formData.brandRedirectURL}
                    onChange={(e) => setFormData({ ...formData, brandRedirectURL: e.target.value })}
                    className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="https://apple.com/shop"
                    required
                  />
                  {errors.brandRedirectURL && (
                    <p className="text-red-500 text-sm mt-1">{errors.brandRedirectURL}</p>
                  )}
                </div>
              )}

              {(formData.cashbackOption === "offline" || formData.cashbackOption === "both") && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Store Locations</h4>
                  <StoreLocatorFormCashback
                    stores={formData.storeLocator}
                    onChange={(storeLocator) => setFormData({ ...formData, storeLocator })}
                  />
                  {errors.storeLocator && (
                    <p className="text-red-500 text-sm mt-2">{errors.storeLocator}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Watch Video URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.watchVideo}
                  onChange={(e) => setFormData({ ...formData, watchVideo: e.target.value })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="https://youtube.com/watch?v=exampleVideo123"
                  required
                />
                {errors.watchVideo && (
                  <p className="text-red-500 text-sm mt-1">{errors.watchVideo}</p>
                )}
              </div>
            </div>
          </FormSection>

          {/* Coupons */}
          <FormSection title="Coupons">
            <CouponsForm
              coupons={formData.coupons}
              onChange={(coupons) => setFormData({ ...formData, coupons })}
            />
            {errors.coupons && <p className="text-red-500 text-sm mt-2">{errors.coupons}</p>}
          </FormSection>

          {/* Deals */}
          <FormSection title="Deals">
            <DealsForm
              deals={formData.deals}
              onChange={(deals) => setFormData({ ...formData, deals })}
            />
            {errors.deals && <p className="text-red-500 text-sm mt-2">{errors.deals}</p>}
          </FormSection>

          {/* Pricing Details */}
          <FormSection title="Pricing Details">
            <PricingDetailsForm
              pricingDetails={formData.pricingDetails}
              onChange={(pricingDetails) => setFormData({ ...formData, pricingDetails })}
            />
          </FormSection>

          {/* Rating */}
          <FormSection title="Rating Information (Optional)">
            <RatingForm
              rating={formData.rating}
              onChange={(rating) => setFormData({ ...formData, rating })}
            />
          </FormSection>

          {/* FAQs */}
          <FormSection title="Frequently Asked Questions">
            <FAQsForm
              faqs={formData.faqs}
              onChange={(faqs) => setFormData({ ...formData, faqs })}
            />
            {errors.faqs && <p className="text-red-500 text-sm mt-2">{errors.faqs}</p>}
          </FormSection>

          {/* Terms and Conditions */}
          <FormSection title="Terms and Conditions">
            <StringArrayFormWithUpload
              items={formData.termsAndConditions}
              onChange={(termsAndConditions) => setFormData({ ...formData, termsAndConditions })}
              title="Terms and Conditions"
              placeholder="Cashback valid only on online purchases."
              required
            />
            {errors.termsAndConditions && (
              <p className="text-red-500 text-sm mt-2">{errors.termsAndConditions}</p>
            )}
          </FormSection>

          {/* Timeline */}
          <FormSection title="Timeline">
            <TimelineForm
              timeline={formData.timeline}
              onChange={(timeline) => setFormData({ ...formData, timeline })}
            />
            {errors.timeline && <p className="text-red-500 text-sm mt-2">{errors.timeline}</p>}
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
              {editingCashback ? "Update Cashback" : "Save Cashback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

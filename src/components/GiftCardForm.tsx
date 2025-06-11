import React, { useState } from "react";
import { Save, Download, Eye } from "lucide-react";
import { GiftCard } from "../types/GiftCard";
import { FormSection } from "./FormSection";
import { ImageForm } from "./ImageForm";
import { SimpleArrayForm } from "./SimpleArrayForm";
import { RedemptionStepsForm } from "./RedemptionStepsForm";
import { ConditionsForm } from "./ConditionsForm";
import { InformationForm } from "./InformationForm";
import { addCardService } from "../api";

export const GiftCardForm: React.FC = () => {
  const object = {
    name: "",
    images: [],
    categories: [],
    occasions: [],
    categoriesImages: [],
    description: "",
    whereToRedeem: [],
    howToRedeem: [],
    termsAndConditions: {
      title: "",
      conditions: [],
    },
    instructions: {
      title: "",
      conditions: [],
    },
    moreInfo: {
      title: "",
      description: "",
      information: [],
    },
    discount: 0,
    oldPrice: {
      type: "",
      value: "",
    },
    B2B: 0,
    B2C: 0,
    Brand: [],
    cardType: "",
    status: "active",
  };
  const [formData, setFormData] = useState<GiftCard>({ ...object });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCardService(formData);
    setFormData({ ...object });
    alert("Gift card data logged to console!");
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `gift-card-${formData.name || "untitled"}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
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
          {/* Basic Information */}
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Gift Card Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Amazon Gift Card"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Card Type</label>
                <input
                  type="text"
                  value={formData.cardType}
                  onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="e-gift, physical, digital"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                  placeholder="Use this Amazon Gift Card to shop millions of items online."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Status</label>
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="active, inactive, pending"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  min="0"
                  max="100"
                  placeholder="20"
                />
              </div>
            </div>
          </FormSection>

          {/* Pricing */}
          <FormSection title="Pricing Information">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Old Price Type
                </label>
                <input
                  type="text"
                  value={formData.oldPrice.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      oldPrice: { ...formData.oldPrice, type: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="currency"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Old Price Value
                </label>
                <input
                  type="text"
                  value={formData.oldPrice.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      oldPrice: { ...formData.oldPrice, value: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="₹1000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">B2B Price</label>
                <input
                  type="number"
                  value={formData.B2B}
                  onChange={(e) => setFormData({ ...formData, B2B: parseInt(e.target.value) || 0 })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">B2C Price</label>
                <input
                  type="number"
                  value={formData.B2C}
                  onChange={(e) => setFormData({ ...formData, B2C: parseInt(e.target.value) || 0 })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="1000"
                />
              </div>
            </div>
          </FormSection>

          {/* Images */}
          <FormSection title="Images">
            <ImageForm
              images={formData.images}
              onChange={(images) => setFormData({ ...formData, images })}
              title="Gift Card Images"
            />
          </FormSection>

          {/* Categories Images */}
          <FormSection title="Category Images">
            <ImageForm
              images={formData.categoriesImages}
              onChange={(categoriesImages) => setFormData({ ...formData, categoriesImages })}
              title="Category Icons"
            />
          </FormSection>

          {/* Categories & Occasions */}
          <FormSection title="Categories & Occasions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SimpleArrayForm
                items={formData.categories}
                onChange={(categories) => setFormData({ ...formData, categories })}
                title="Categories"
                singular="Category"
              />

              <SimpleArrayForm
                items={formData.occasions}
                onChange={(occasions) => setFormData({ ...formData, occasions })}
                title="Occasions"
                singular="Occasion"
              />
            </div>
          </FormSection>

          {/* Brands & Stores */}
          <FormSection title="Brands & Redemption Stores">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SimpleArrayForm
                items={formData.Brand}
                onChange={(Brand) => setFormData({ ...formData, Brand })}
                title="Brands"
                singular="Brand"
              />

              <SimpleArrayForm
                items={formData.whereToRedeem}
                onChange={(whereToRedeem) => setFormData({ ...formData, whereToRedeem })}
                title="Where to Redeem"
                singular="Store"
              />
            </div>
          </FormSection>

          {/* Redemption Steps */}
          <FormSection title="Redemption Instructions">
            <RedemptionStepsForm
              steps={formData.howToRedeem}
              onChange={(howToRedeem) => setFormData({ ...formData, howToRedeem })}
            />
          </FormSection>

          {/* Terms and Conditions */}
          <FormSection title="Terms and Conditions">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Terms Title
                </label>
                <input
                  type="text"
                  value={formData.termsAndConditions.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAndConditions: { ...formData.termsAndConditions, title: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Amazon Gift Card Terms"
                />
              </div>

              <ConditionsForm
                conditions={formData.termsAndConditions.conditions}
                onChange={(conditions) =>
                  setFormData({
                    ...formData,
                    termsAndConditions: { ...formData.termsAndConditions, conditions },
                  })
                }
                title="Conditions"
              />
            </div>
          </FormSection>

          {/* Instructions */}
          <FormSection title="Usage Instructions">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Instructions Title
                </label>
                <input
                  type="text"
                  value={formData.instructions.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instructions: { ...formData.instructions, title: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Usage Instructions"
                />
              </div>

              <ConditionsForm
                conditions={formData.instructions.conditions}
                onChange={(conditions) =>
                  setFormData({
                    ...formData,
                    instructions: { ...formData.instructions, conditions },
                  })
                }
                title="Instructions"
              />
            </div>
          </FormSection>

          {/* More Info */}
          <FormSection title="Additional Information">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  More Info Title
                </label>
                <input
                  type="text"
                  value={formData.moreInfo.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      moreInfo: { ...formData.moreInfo, title: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Additional Info"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Description
                </label>
                <textarea
                  value={formData.moreInfo.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      moreInfo: { ...formData.moreInfo, description: e.target.value },
                    })
                  }
                  rows={4}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400 resize-none"
                  placeholder="Valid for all Amazon categories except services."
                />
              </div>

              <InformationForm
                information={formData.moreInfo.information}
                onChange={(information) =>
                  setFormData({
                    ...formData,
                    moreInfo: { ...formData.moreInfo, information },
                  })
                }
              />
            </div>
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

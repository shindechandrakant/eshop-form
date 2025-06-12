import React, { useState } from "react";
import { Save, Download, Eye } from "lucide-react";
import { Product } from "../types/Product";
import { FormSection } from "./FormSection";
import { CategoryForm } from "./CategoryForm";
import { ColorForm } from "./ColorForm";
import { SizeForm } from "./SizeForm";
import { ThumbnailImageForm } from "./ThumbnailImageForm";
import { ProductDetailsForm } from "./ProductDetailsForm";
import { CompanyForm } from "./CompanyForm";
import { SimpleStringArrayForm } from "./SimpleStringArrayForm";
import { addProductService } from "../api";

export const ProductForm: React.FC = () => {
  const object = {
    title: "",
    shortTitle: "",
    itemNumber: 0,
    description: "",
    category: [],
    brand: {
      id: "",
      name: "",
    },
    colours: [],
    thumbnailImages: {
      id: "",
      string: "",
      caption: "",
      height: 0,
      width: 0,
    },
    delivery: {
      type: "",
      value: "",
      description: "",
      deliveryInDays: "",
    },
    productDetails: {
      description: [],
      specifications: [],
      features: [],
      includedInDelivery: [],
      notes: [],
    },
    supplier: {
      id: "",
      name: "",
      address: "",
      contact: "",
    },
    manufacturer: {
      id: "",
      name: "",
      address: "",
      contact: "",
    },
    returnPolicy: [],
    pricing: {
      b2b: 0,
      b2c: 0,
      taxes: 0,
      deliveryCharges: 0,
      cashback: 0,
    },
    sizes: [],
  };
  const [formData, setFormData] = useState<Product>({ ...object });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data:", JSON.stringify(formData, null, 2));
    addProductService(formData);
    setFormData({ ...object });
    alert("Product data logged to console!");
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `product-${formData.title || "untitled"}.json`;

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
            <title>Product Preview</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
              pre { background: #f4f4f4; padding: 20px; border-radius: 5px; overflow-x: auto; }
            </style>
          </head>
          <body>
            <h1>Product Schema Preview</h1>
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
            Product Management
          </h1>
          <p className="text-lg text-slate-600">
            Create and configure products with detailed information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Wireless Mouse"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Short Title
                </label>
                <input
                  type="text"
                  value={formData.shortTitle}
                  onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Mouse"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Item Number
                </label>
                <input
                  type="number"
                  value={formData.itemNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, itemNumber: parseInt(e.target.value) || 0 })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="101"
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
                  placeholder="A comfortable and responsive wireless mouse."
                />
              </div>
            </div>
          </FormSection>

          {/* Brand */}
          <FormSection title="Brand Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Brand ID</label>
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
                  placeholder="logitech"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Brand Name
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
                  placeholder="Logitech"
                />
              </div>
            </div>
          </FormSection>

          {/* Categories */}
          <FormSection title="Categories">
            <CategoryForm
              categories={formData.category}
              onChange={(category) => setFormData({ ...formData, category })}
            />
          </FormSection>

          {/* Colors */}
          <FormSection title="Available Colors">
            <ColorForm
              colors={formData.colours}
              onChange={(colours) => setFormData({ ...formData, colours })}
            />
          </FormSection>

          {/* Sizes */}
          <FormSection title="Available Sizes">
            <SizeForm
              sizes={formData.sizes}
              onChange={(sizes) => setFormData({ ...formData, sizes })}
            />
          </FormSection>

          {/* Thumbnail Image */}
          <FormSection title="Thumbnail Image">
            <ThumbnailImageForm
              image={formData.thumbnailImages}
              onChange={(thumbnailImages) => setFormData({ ...formData, thumbnailImages })}
            />
          </FormSection>

          {/* Delivery Information */}
          <FormSection title="Delivery Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Delivery Type
                </label>
                <input
                  type="text"
                  value={formData.delivery.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delivery: { ...formData.delivery, type: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="standard"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Delivery Value
                </label>
                <input
                  type="text"
                  value={formData.delivery.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delivery: { ...formData.delivery, value: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="free"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Delivery Description
                </label>
                <input
                  type="text"
                  value={formData.delivery.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delivery: { ...formData.delivery, description: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="Delivered in 3-5 business days"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Delivery Days
                </label>
                <input
                  type="text"
                  value={formData.delivery.deliveryInDays}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      delivery: { ...formData.delivery, deliveryInDays: e.target.value },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="5"
                />
              </div>
            </div>
          </FormSection>

          {/* Product Details */}
          <FormSection title="Product Details">
            <ProductDetailsForm
              productDetails={formData.productDetails}
              onChange={(productDetails) => setFormData({ ...formData, productDetails })}
            />
          </FormSection>

          {/* Supplier */}
          <FormSection title="Supplier Information">
            <CompanyForm
              company={formData.supplier}
              onChange={(supplier) => setFormData({ ...formData, supplier })}
              title="Supplier"
            />
          </FormSection>

          {/* Manufacturer */}
          <FormSection title="Manufacturer Information">
            <CompanyForm
              company={formData.manufacturer}
              onChange={(manufacturer) => setFormData({ ...formData, manufacturer })}
              title="Manufacturer"
            />
          </FormSection>

          {/* Return Policy */}
          <FormSection title="Return Policy">
            <SimpleStringArrayForm
              items={formData.returnPolicy}
              onChange={(returnPolicy) => setFormData({ ...formData, returnPolicy })}
              title="Return Policy Rules"
              singular="Rule"
            />
          </FormSection>

          {/* Pricing */}
          <FormSection title="Pricing Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">B2B Price</label>
                <input
                  type="number"
                  value={formData.pricing.b2b}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, b2b: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="450"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">B2C Price</label>
                <input
                  type="number"
                  value={formData.pricing.b2c}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, b2c: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Taxes (%)</label>
                <input
                  type="number"
                  value={formData.pricing.taxes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, taxes: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="18"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Delivery Charges
                </label>
                <input
                  type="number"
                  value={formData.pricing.deliveryCharges}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData.pricing,
                        deliveryCharges: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Cashback</label>
                <input
                  type="number"
                  value={formData.pricing.cashback}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, cashback: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  placeholder="25"
                />
              </div>
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
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

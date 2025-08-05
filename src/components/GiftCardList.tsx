import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Search, Star, MapPin } from "lucide-react";
import { GiftCard } from "../types/GiftCard";

interface GiftCardListProps {
  onEdit: (giftCard: GiftCard) => void;
  onCreateNew: () => void;
}

// Mock data - replace with actual API call
const mockGiftCards: GiftCard[] = [
  {
    _id: { $oid: "507f1f77bcf86cd799439011" },
    country: [{ name: "India", ISOCode: "IN" }],
    category: [{ id: "cat001", name: "E-commerce" }],
    giftCardCompany: { id: "amazon", name: "Amazon" },
    companyDescription:
      "Amazon is the world's largest online marketplace, offering a wide range of products.",
    redemptionOption: "both",
    voucherDescription: "Use this gift card on Amazon.in for shopping across categories.",
    thumbnailImage:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    howToRedeem: [
      {
        stepText: "Go to Amazon.in and log into your account.",
        imgUrl:
          "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
    termsAndConditions: [
      "Gift card can be used only on Amazon.in.",
      "No returns or refunds on gift cards.",
    ],
    usageInstructions: [
      "Use the code at checkout.",
      "Valid for 12 months from the date of purchase.",
    ],
    storeLocator: [{ name: "Amazon Store Delhi", address: "Plot No. 1, Delhi, India" }],
    watchVideo: ["https://example.com/videos/amazon-demo.mp4"],
    voucherOptions: [
      {
        denominationCurrency: "INR",
        denomination: 500,
        customerPrice: 475,
        discountPercentage: 5,
        discountValue: 25,
      },
      {
        denominationCurrency: "INR",
        denomination: 1000,
        customerPrice: 950,
        discountPercentage: 5,
        discountValue: 50,
      },
    ],
    occasions: [
      { id: "birthday", name: "Birthday" },
      { id: "anniversary", name: "Anniversary" },
    ],
    isFeatured: true,
  },
  {
    _id: { $oid: "507f1f77bcf86cd799439012" },
    country: [{ name: "United States", ISOCode: "US" }],
    category: [{ id: "cat002", name: "Fashion" }],
    giftCardCompany: { id: "nike", name: "Nike" },
    companyDescription: "Nike is a global leader in athletic footwear, apparel, and equipment.",
    redemptionOption: "online",
    voucherDescription: "Shop the latest Nike products with this gift card.",
    thumbnailImage:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    howToRedeem: [
      {
        stepText: "Visit Nike.com and add items to cart.",
        imgUrl:
          "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
    termsAndConditions: ["Valid only on Nike.com", "Cannot be combined with other offers"],
    usageInstructions: ["Enter code at checkout"],
    storeLocator: [],
    watchVideo: [],
    voucherOptions: [
      { denominationCurrency: "USD", denomination: 50, customerPrice: 50 },
      { denominationCurrency: "USD", denomination: 100, customerPrice: 100 },
    ],
    occasions: [{ id: "sports", name: "Sports Events" }],
    isFeatured: false,
  },
  {
    _id: { $oid: "507f1f77bcf86cd799439013" },
    country: [{ name: "United Kingdom", ISOCode: "GB" }],
    category: [{ id: "cat004", name: "Food & Dining" }],
    giftCardCompany: { id: "starbucks", name: "Starbucks" },
    companyDescription: "Starbucks is the world's leading coffeehouse chain.",
    redemptionOption: "in-store",
    voucherDescription: "Enjoy your favorite Starbucks beverages and food.",
    thumbnailImage:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    howToRedeem: [
      {
        stepText: "Present the gift card at any Starbucks store.",
        imgUrl:
          "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
    ],
    termsAndConditions: ["Valid at participating Starbucks locations", "No cash value"],
    usageInstructions: ["Present card to barista"],
    storeLocator: [
      { name: "Starbucks London Bridge", address: "123 London Bridge St, London, UK" },
      { name: "Starbucks Oxford Street", address: "456 Oxford St, London, UK" },
    ],
    watchVideo: [],
    voucherOptions: [
      { denominationCurrency: "GBP", denomination: 10, customerPrice: 10 },
      { denominationCurrency: "GBP", denomination: 25, customerPrice: 25 },
    ],
    occasions: [{ id: "morning", name: "Morning Treat" }],
    isFeatured: true,
  },
];

export const GiftCardList: React.FC<GiftCardListProps> = ({ onEdit, onCreateNew }) => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGiftCards(mockGiftCards);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this gift card?")) {
      setGiftCards(giftCards.filter((card) => card._id?.$oid !== id));
    }
  };

  const filteredGiftCards = giftCards.filter((card) => {
    const matchesSearch =
      card.giftCardCompany.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.companyDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filterCategory || card.category.some((cat) => cat.name === filterCategory);
    const matchesCountry =
      !filterCountry || card.country.some((country) => country.name === filterCountry);
    const matchesFeatured = !showFeaturedOnly || card.isFeatured;

    return matchesSearch && matchesCategory && matchesCountry && matchesFeatured;
  });

  const categories = Array.from(
    new Set(giftCards.flatMap((card) => card.category.map((cat) => cat.name)))
  );
  const countries = Array.from(
    new Set(giftCards.flatMap((card) => card.country.map((country) => country.name)))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading gift cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Gift Card Management
          </h1>
          <p className="text-lg text-slate-600">Manage and organize your gift card collection</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gift cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 bg-white border-2 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-slate-700">Featured Only</span>
              </label>

              <button
                onClick={onCreateNew}
                className="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-lg transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredGiftCards.length} of {giftCards.length} gift cards
          </p>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGiftCards.map((giftCard) => (
            <div
              key={giftCard._id?.$oid}
              className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={giftCard.thumbnailImage}
                  alt={giftCard.giftCardCompany.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400";
                  }}
                />
                {giftCard.isFeatured && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                  {giftCard.country[0]?.name}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900 truncate">
                    {giftCard.giftCardCompany.name}
                  </h3>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                    {giftCard.category[0]?.name}
                  </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {giftCard.companyDescription}
                </p>

                {/* Voucher Options */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {giftCard.voucherOptions.slice(0, 3).map((option, index) => (
                      <span
                        key={index}
                        className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium"
                      >
                        {option.denominationCurrency} {option.denomination}
                      </span>
                    ))}
                    {giftCard.voucherOptions.length > 3 && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                        +{giftCard.voucherOptions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Redemption Option */}
                <div className="mb-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      giftCard.redemptionOption === "both"
                        ? "bg-blue-100 text-blue-700"
                        : giftCard.redemptionOption === "online"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {giftCard.redemptionOption === "both"
                      ? "Online & In-Store"
                      : giftCard.redemptionOption === "online"
                      ? "Online Only"
                      : "In-Store Only"}
                  </span>
                </div>

                {/* Store Locations */}
                {giftCard.storeLocator.length > 0 && (
                  <div className="mb-4 flex items-center text-xs text-slate-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {giftCard.storeLocator.length} store
                    {giftCard.storeLocator.length !== 1 ? "s" : ""} available
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onEdit(giftCard)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border-2 border-indigo-500 text-sm font-semibold rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 hover:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(giftCard._id?.$oid || "")}
                    className="inline-flex items-center justify-center px-4 py-2 border-2 border-red-300 text-sm font-semibold rounded-lg text-red-600 bg-white hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGiftCards.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No gift cards found</h3>
              <p className="text-slate-600 mb-6">
                {searchTerm || filterCategory || filterCountry || showFeaturedOnly
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first gift card"}
              </p>
              <button
                onClick={onCreateNew}
                className="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-200 shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Gift Card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

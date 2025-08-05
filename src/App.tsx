import React, { useState } from "react";
import { GiftCardForm } from "./components/GiftCardForm";
import { ProductForm } from "./components/ProductForm";
import { CashbackForm } from "./components/CashbackForm";
import { GiftCardList } from "./components/GiftCardList";
import { Gift, Package, List, Percent } from "lucide-react";
import { GiftCard } from "./types/GiftCard";
import { Cashback } from "./types/Cashback";

type ViewType = "giftcard" | "product" | "cashback" | "list";

function App() {
  const [activeView, setActiveView] = useState<ViewType>("list");
  const [editingGiftCard, setEditingGiftCard] = useState<GiftCard | null>(null);
  const [editingCashback, setEditingCashback] = useState<Cashback | null>(null);

  const handleEditGiftCard = (giftCard: GiftCard) => {
    setEditingGiftCard(giftCard);
    setActiveView("giftcard");
  };

  const handleCreateNew = () => {
    setEditingGiftCard(null);
    setActiveView("giftcard");
  };

  const handleBackToList = () => {
    setEditingGiftCard(null);
    setEditingCashback(null);
    setActiveView("list");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Sidebar Navigation */}
      <div className="w-80 bg-white/90 backdrop-blur-sm border-r-2 border-slate-200 shadow-xl">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Save 360
            </h1>
            <p className="text-slate-600 text-sm mt-1">Manage your forms and data</p>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => setActiveView("list")}
              className={`w-full flex items-center px-6 py-4 text-left font-semibold rounded-xl transition-all duration-300 ${
                activeView === "list"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              <List className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Gift Card List</div>
                <div
                  className={`text-xs ${
                    activeView === "list" ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  View and manage all gift cards
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveView("giftcard")}
              className={`w-full flex items-center px-6 py-4 text-left font-semibold rounded-xl transition-all duration-300 ${
                activeView === "giftcard"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              <Gift className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">
                  {editingGiftCard ? "Edit Gift Card" : "Create Gift Card"}
                </div>
                <div
                  className={`text-xs ${
                    activeView === "giftcard" ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  {editingGiftCard ? "Modify existing gift card" : "Add new gift card"}
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveView("product")}
              className={`w-full flex items-center px-6 py-4 text-left font-semibold rounded-xl transition-all duration-300 ${
                activeView === "product"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              <Package className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Product Form</div>
                <div
                  className={`text-xs ${
                    activeView === "product" ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  Manage product information
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveView("cashback")}
              className={`w-full flex items-center px-6 py-4 text-left font-semibold rounded-xl transition-all duration-300 ${
                activeView === "cashback"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              <Percent className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">
                  {editingCashback ? "Edit Cashback" : "Create Cashback"}
                </div>
                <div
                  className={`text-xs ${
                    activeView === "cashback" ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  {editingCashback ? "Modify existing cashback" : "Add new cashback offer"}
                </div>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-500 ease-in-out">
        {activeView === "list" && (
          <GiftCardList onEdit={handleEditGiftCard} onCreateNew={handleCreateNew} />
        )}
        {activeView === "giftcard" && (
          <GiftCardForm editingGiftCard={editingGiftCard} onBackToList={handleBackToList} />
        )}
        {activeView === "product" && <ProductForm />}
        {activeView === "cashback" && (
          <CashbackForm editingCashback={editingCashback} onBackToList={handleBackToList} />
        )}
      </div>
    </div>
  );
}

export default App;

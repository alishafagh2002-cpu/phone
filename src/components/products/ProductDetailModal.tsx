import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ShoppingBag, 
  CreditCard, 
  Scale, 
  Smartphone,
  ChevronLeft
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleCompare,
    comparisonItems,
    setIsCheckoutOpen,
    setCurrentOrderDraft,
    setIsPaymentGatewayOpen,
  } = useStore();

  if (!quickViewProduct) return null;

  const [selectedImage, setSelectedImage] = useState(quickViewProduct.image);
  const [selectedColor, setSelectedColor] = useState(
    quickViewProduct.colors && quickViewProduct.colors.length > 0
      ? quickViewProduct.colors[0].name
      : undefined
  );
  const [selectedModel, setSelectedModel] = useState(
    quickViewProduct.compatibleModels.length > 0
      ? quickViewProduct.compatibleModels[0]
      : 'عمومی'
  );
  const [quantity, setQuantity] = useState(1);

  const isCompared = comparisonItems.some(p => p.id === quickViewProduct.id);

  const handleInstantBuy = () => {
    // Direct 1-click buy to checkout
    addToCart(quickViewProduct, quantity, selectedColor, selectedModel);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedModel);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{quickViewProduct.brand}</span>
            <span>/</span>
            <span>{quickViewProduct.category}</span>
          </div>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images Section */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative">
              <img
                src={selectedImage}
                alt={quickViewProduct.title}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.discountPercent && (
                <span className="absolute top-3 right-3 bg-rose-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                  {toPersianDigits(quickViewProduct.discountPercent)}٪ تخفیف
                </span>
              )}
            </div>

            {/* Gallery thumbnails */}
            {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {quickViewProduct.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 block">اصالت ۱۰۰٪</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <RotateCcw className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 block">۷ روز مهلت تست</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <Truck className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 block">ارسال اکسپرس</span>
              </div>
            </div>
          </div>

          {/* Details & Selectors */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-relaxed">
                {quickViewProduct.title}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                {quickViewProduct.titleEn}
              </p>
            </div>

            {/* Rating and Sales */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{toPersianDigits(quickViewProduct.rating)}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-slate-500 dark:text-slate-400">
                {toPersianDigits(quickViewProduct.reviewsCount)} دیدگاه خریداران
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {toPersianDigits(quickViewProduct.salesCount)} فروش موفق
              </span>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{quickViewProduct.warranty}</span>
              </div>
            </div>

            {/* Color Swatches */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  انتخاب رنگ: <span className="text-indigo-600 dark:text-indigo-400">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedColor === color.name
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Compatible Models Selector */}
            {quickViewProduct.compatibleModels && quickViewProduct.compatibleModels.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  سازگار با مدل گوشی شما:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.compatibleModels.map(model => (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                        selectedModel === model
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features Bullet Points */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">ویژگی‌های برجسته محصول:</span>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {quickViewProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Table */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">مشخصات فنی:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                  <div key={key} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block">{key}:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => toggleCompare(quickViewProduct)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isCompared
                ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-200'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isCompared ? 'در لیست مقایسه' : 'افزودن به مقایسه'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              افزودن به سبد
            </button>

            <button
              onClick={handleInstantBuy}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <CreditCard className="w-4 h-4" />
              خرید فوری و پرداخت آنلاین
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, ShoppingBag, CheckCircle, Percent, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { POPULAR_BUNDLES } from '../../data/products';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const BundleBuilder: React.FC = () => {
  const { addBundleToCart, setIsCartOpen } = useStore();

  const handleAddBundle = (bundle: typeof POPULAR_BUNDLES[0]) => {
    addBundleToCart(bundle);
    setIsCartOpen(true);
  };

  return (
    <div id="bundle-builder-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              پکیج‌های محافظت اقتصادی ۳ در ۱ (تخفیف شگفت‌انگیز تجمیعی)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              خرید همزمان قاب + گلس + محافظ لنز با تا ۲۵٪ تخفیف مازاد بر روی فاکتور
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {POPULAR_BUNDLES.map(bundle => {
          const totalOriginal = bundle.items.reduce((sum, i) => sum + (i.product.originalPrice || i.product.price), 0);
          const totalNormal = bundle.items.reduce((sum, i) => sum + i.product.price, 0);
          const bundlePrice = Math.round(totalNormal * (1 - bundle.bundleDiscountPercent / 100));
          const totalSavings = totalOriginal - bundlePrice;

          return (
            <div
              key={bundle.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Discount Tag */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Percent className="w-3.5 h-3.5" />
                <span>{toPersianDigits(bundle.bundleDiscountPercent)}٪ تخفیف پکیج</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 inline-block mb-1">
                  مناسب برای: {bundle.targetPhone}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {bundle.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {bundle.description}
                </p>

                {/* Items in bundle */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {bundle.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-center flex flex-col items-center justify-between"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 mb-1.5"
                      />
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                        {item.role}
                      </span>
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium line-clamp-1">
                        {item.product.brand}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Add to Cart button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                      {formatPrice(bundlePrice)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(totalNormal)}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                    سود شما: {formatPrice(totalSavings)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddBundle(bundle)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>افزودن کل پکیج به سبد</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

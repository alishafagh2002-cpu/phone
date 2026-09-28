import React from 'react';
import { 
  Star, 
  ShoppingBag, 
  Eye, 
  Scale, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    setQuickViewProduct,
    toggleCompare,
    comparisonItems,
  } = useStore();

  const isCompared = comparisonItems.some(p => p.id === product.id);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image & Badges Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end z-10">
          {product.discountPercent && (
            <span className="bg-rose-500 text-white font-bold text-[11px] px-2 py-0.5 rounded-full shadow">
              {toPersianDigits(product.discountPercent)}٪ تخفیف
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-indigo-600 text-white font-medium text-[10px] px-2 py-0.5 rounded-full shadow">
              پرفروش‌ترین
            </span>
          )}
        </div>

        {/* Quick action overlay buttons */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-indigo-600 hover:text-white transition-colors shadow-lg cursor-pointer"
            title="مشاهده جزئیات و مشخصات"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleCompare(product)}
            className={`p-2.5 rounded-xl shadow-lg transition-colors cursor-pointer ${
              isCompared
                ? 'bg-amber-500 text-white'
                : 'bg-white text-slate-800 hover:bg-amber-500 hover:text-white'
            }`}
            title="مقایسه محصول"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <span>{toPersianDigits(product.rating)}</span>
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-relaxed cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {product.title}
          </h3>

          {/* Compatible Phone preview */}
          {product.compatibleModels.length > 0 && (
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              <span>سازگار با: </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {product.compatibleModels.slice(0, 2).join('، ')}
                {product.compatibleModels.length > 2 && ' و بیشتر...'}
              </span>
            </div>
          )}

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 pt-0.5">
              {product.colors.map(c => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Add to cart button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[10px] text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">افزودن</span>
          </button>
        </div>
      </div>
    </div>
  );
};

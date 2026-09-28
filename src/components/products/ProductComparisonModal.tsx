import React from 'react';
import { X, Scale, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const ProductComparisonModal: React.FC = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    comparisonItems,
    toggleCompare,
    clearCompare,
    addToCart,
  } = useStore();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-slate-900 dark:text-white text-base">
              مقایسه مشخصات فنی و سازگاری محصولات ({toPersianDigits(comparisonItems.length)} کالا)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {comparisonItems.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-500 hover:text-rose-700 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                پاک کردن لیست
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto p-4 sm:p-6">
          {comparisonItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Scale className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-sm text-slate-500">هیچ محصولی برای مقایسه انتخاب نشده است.</p>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
              >
                بازگشت به محصولات
              </button>
            </div>
          ) : (
            <table className="w-full text-right text-xs">
              <tbody>
                {/* Image & Remove row */}
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-3 font-bold text-slate-400 w-32">تصویر و محصول</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-3 min-w-[200px] text-center align-top">
                      <div className="relative group inline-block">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 mx-auto"
                        />
                        <button
                          onClick={() => toggleCompare(item)}
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow"
                          title="حذف از مقایسه"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mt-2 text-xs line-clamp-2">
                        {item.title}
                      </h4>
                    </td>
                  ))}
                </tr>

                {/* Price Row */}
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <td className="p-3 font-bold text-slate-500">قیمت فروش</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-3 text-center font-black text-sm text-indigo-600 dark:text-indigo-400">
                      {formatPrice(item.price)}
                    </td>
                  ))}
                </tr>

                {/* Brand */}
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-3 font-bold text-slate-500">برند تولیدکننده</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-3 text-center font-semibold text-slate-800 dark:text-slate-200">
                      {item.brand}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <td className="p-3 font-bold text-slate-500">دسته‌بندی</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-3 text-center text-slate-700 dark:text-slate-300">
                      {item.category}
                    </td>
                  ))}
                </tr>

                {/* Compatible models */}
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-3 font-bold text-slate-500">مدل‌های سازگار</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-3 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {item.compatibleModels.map(m => (
                          <span key={m} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300">
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Warranty */}
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <td className="p-3 font-bold text-slate-500">گارانتی و ضمانت</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-3 text-center text-slate-700 dark:text-slate-300">
                      {item.warranty}
                    </td>
                  ))}
                </tr>

                {/* Action button row */}
                <tr>
                  <td className="p-3 font-bold text-slate-500">خرید مستقیم</td>
                  {comparisonItems.map(item => (
                    <td key={item.id} className="p-3 text-center">
                      <button
                        onClick={() => {
                          addToCart(item);
                          setIsCompareOpen(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>افزودن به سبد</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ProductCard } from './ProductCard';
import { useStore } from '../../context/StoreContext';
import { toPersianDigits } from '../../utils/formatters';
import { SlidersHorizontal, PackageOpen } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    selectedBrand,
    selectedDevice,
    searchQuery,
    sortBy,
    setSortBy,
    setSelectedCategory,
    setSelectedBrand,
    setSelectedDevice,
    setSearchQuery
  } = useStore();

  // Filter products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Brand filter
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
      return false;
    }

    // Device filter
    if (selectedDevice !== 'all') {
      const isCompatible = product.compatibleModels.some(model =>
        model.toLowerCase().includes(selectedDevice.toLowerCase()) ||
        model.includes('همه مدل‌های گوشی')
      );
      if (!isCompatible) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchEn = product.titleEn.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchTags = product.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchEn && !matchBrand && !matchCat && !matchTags) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'expensive') return b.price - a.price;
    if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
    if (sortBy === 'newest') return b.salesCount - a.salesCount;
    // default 'popular'
    return b.rating - a.rating;
  });

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedDevice('all');
    setSearchQuery('');
  };

  return (
    <div id="products-section" className="space-y-6">
      {/* Header bar: Count & Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            لیست لوازم جانبی موبایل
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
            {toPersianDigits(sortedProducts.length)} کالا
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>مرتب‌سازی:</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                sortBy === 'popular'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              محبوب‌ترین
            </button>
            <button
              onClick={() => setSortBy('cheapest')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                sortBy === 'cheapest'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              ارزان‌ترین
            </button>
            <button
              onClick={() => setSortBy('expensive')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                sortBy === 'expensive'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              گران‌ترین
            </button>
            <button
              onClick={() => setSortBy('discount')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                sortBy === 'discount'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              بیشترین تخفیف
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Empty */}
      {sortedProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-500 mx-auto flex items-center justify-center">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
            کالایی با فیلترهای انتخابی شما یافت نشد!
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            می‌توانید مدل گوشی یا دسته‌بندی را تغییر دهید یا دکمه زیر را برای نمایش همه کالاها بزنید.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer shadow-md"
          >
            مشاهده همه لوازم جانبی
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

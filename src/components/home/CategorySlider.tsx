import React from 'react';
import { 
  Layers, 
  Shield, 
  Zap, 
  Headphones, 
  BatteryCharging, 
  Cable, 
  Compass, 
  Camera, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory, BrandName } from '../../types/store';

interface CategoryItem {
  id: ProductCategory | 'all';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'همه محصولات', icon: Sparkles },
  { id: 'قاب و کاور', label: 'قاب و کاور', icon: Shield },
  { id: 'محافظ صفحه و گلس', label: 'محافظ صفحه و گلس', icon: Smartphone },
  { id: 'شارژر و آداپتور', label: 'شارژر و آداپتور', icon: Zap },
  { id: 'هندزفری و هدفون', label: 'ایرپاد و هدفون', icon: Headphones },
  { id: 'پاوربانک', label: 'پاوربانک و مگ‌سیف', icon: BatteryCharging },
  { id: 'کابل و تبدیل', label: 'کابل و شارژ سریع', icon: Cable },
  { id: 'هولدر و پایه', label: 'هولدر خودرو و استند', icon: Compass },
  { id: 'محافظ لنز دوربین', label: 'محافظ لنز دوربین', icon: Camera },
];

const BRANDS: (BrandName | 'all')[] = [
  'all',
  'Apple',
  'Samsung',
  'Xiaomi',
  'Anker',
  'Baseus',
  'Nillkin',
  'Spigen',
  'Mcdodo'
];

export const CategorySlider: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand
  } = useStore();

  return (
    <div className="space-y-4">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Brand Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium shrink-0 ml-1">برند:</span>
        {BRANDS.map(brand => {
          const isSelected = selectedBrand === brand;

          return (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1 rounded-xl text-xs transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {brand === 'all' ? 'همه برندها' : brand}
            </button>
          );
        })}
      </div>
    </div>
  );
};

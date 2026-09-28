import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Moon, 
  Sun, 
  Scale, 
  Truck, 
  ShieldCheck, 
  Smartphone, 
  Clock, 
  CheckCircle2,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { POPULAR_DEVICES } from '../../data/products';
import { toPersianDigits, formatPrice } from '../../utils/formatters';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    cartTotal,
    setIsCartOpen,
    isDarkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    selectedDevice,
    setSelectedDevice,
    comparisonItems,
    setIsCompareOpen,
    setLookupModalOpen,
  } = useStore();

  const [deviceDropdownOpen, setDeviceDropdownOpen] = useState(false);

  const selectedDeviceObj = POPULAR_DEVICES.find(d => d.name === selectedDevice) || POPULAR_DEVICES[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top micro-bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              ارسال اکسپرس و رایگان سفارش‌های بالای ۵۰۰,۰۰۰ تومان
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ضمانت ۱۰۰٪ اصالت کالا و گارانتی تعویض ۷ روزه
            </span>
          </div>

          <div className="flex items-center gap-4 text-indigo-100">
            <button 
              onClick={() => setLookupModalOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              پیگیری سفارش و سوابق خرید
            </button>
            <span className="hidden sm:inline text-indigo-400">|</span>
            <span className="hidden sm:flex items-center gap-1">
              پشتیبانی فوری: <span className="font-mono text-amber-300">۰۲۱-۸۸۹۹۲۲۰۰</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-2 group cursor-pointer" onClick={() => { setSelectedDevice('all'); setSearchQuery(''); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">جانبی‌</span>
                <span className="px-1.5 py-0.5 rounded text-xs font-black bg-indigo-600 text-white">پلاس</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wide font-sans">
                JanebiPlus • لوازم جانبی تخصصی
              </p>
            </div>
          </div>
        </div>

        {/* Device Selector Pill */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setDeviceDropdownOpen(!deviceDropdownOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              selectedDevice !== 'all'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <Smartphone className="w-4 h-4 text-indigo-500" />
            <span className="truncate max-w-[140px]">
              {selectedDevice === 'all' ? 'انتخاب مدل گوشی شما' : selectedDevice}
            </span>
            {selectedDevice !== 'all' && (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDevice('all');
                }}
                className="hover:bg-indigo-200 dark:hover:bg-indigo-800 p-0.5 rounded-full"
                title="پاک کردن فیلتر مدل گوشی"
              >
                <X className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              </span>
            )}
          </button>

          {deviceDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-20"
                onClick={() => setDeviceDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-30 space-y-1">
                <div className="px-3 py-1.5 text-xs text-slate-400 font-medium border-b border-slate-100 dark:border-slate-700 mb-1">
                  نمایش لوازم جانبی مناسب گوشی شما:
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                  {POPULAR_DEVICES.map(device => (
                    <button
                      key={device.id}
                      onClick={() => {
                        setSelectedDevice(device.slug === 'all' ? 'all' : device.name);
                        setDeviceDropdownOpen(false);
                      }}
                      className={`w-full text-right px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        (selectedDevice === device.name || (selectedDevice === 'all' && device.slug === 'all'))
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{device.name}</span>
                      {(selectedDevice === device.name || (selectedDevice === 'all' && device.slug === 'all')) && (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Live Search Bar */}
        <div className="flex-1 max-w-lg relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی قاب، گلس، شارژر، ایرپاد یا برند..."
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pr-10 pl-9 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Actions Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Comparison button */}
          {comparisonItems.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-all cursor-pointer"
              title="مقایسه محصولات"
            >
              <Scale className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                {toPersianDigits(comparisonItems.length)}
              </span>
            </button>
          )}

          {/* Dark / Light toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title={isDarkMode ? 'حالت روز' : 'حالت شب'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:from-indigo-700 hover:to-blue-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -left-2 min-w-4.5 h-4.5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-pulse">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold">
              {cartCount > 0 ? formatPrice(cartTotal) : 'سبد خرید'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

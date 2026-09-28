import React from 'react';
import { Smartphone, Check, X, Filter } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { POPULAR_DEVICES } from '../../data/products';

export const DeviceFilterBar: React.FC = () => {
  const { selectedDevice, setSelectedDevice } = useStore();

  return (
    <div className="bg-gradient-to-r from-slate-100 to-indigo-50/50 dark:from-slate-800/80 dark:to-indigo-950/30 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              انتخاب اختصاصی مدل گوشی شما
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {selectedDevice === 'all'
                ? 'با انتخاب مدل موبایلتان، فقط قاب، گلس و لوازم ۱۰۰٪ تست‌شده برای ابعاد گوشی شما نشان داده می‌شود.'
                : `در حال نمایش لوازم جانبی کاملاً سازگار با ${selectedDevice}`}
            </p>
          </div>
        </div>

        {/* Selected badge or Reset */}
        {selectedDevice !== 'all' && (
          <button
            onClick={() => setSelectedDevice('all')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer border border-rose-200 dark:border-rose-800"
          >
            <X className="w-3.5 h-3.5" />
            <span>حذف فیلتر مدل گوشی</span>
          </button>
        )}
      </div>

      {/* Quick Phone Pills */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {POPULAR_DEVICES.map(device => {
          const isSelected = selectedDevice === device.name || (selectedDevice === 'all' && device.slug === 'all');

          return (
            <button
              key={device.id}
              onClick={() => setSelectedDevice(device.slug === 'all' ? 'all' : device.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <span>{device.name}</span>
              {isSelected && <Check className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

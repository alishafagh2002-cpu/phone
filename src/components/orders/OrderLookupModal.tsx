import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  Package, 
  CheckCircle2, 
  CreditCard, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';
import { Order } from '../../types/store';

export const OrderLookupModal: React.FC = () => {
  const { lookupModalOpen, setLookupModalOpen, ordersHistory } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  if (!lookupModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const term = searchTerm.trim().toLowerCase();
    const found = ordersHistory.find(
      o => o.trackingCode.toLowerCase().includes(term) || o.orderNumber.toLowerCase().includes(term)
    );
    setSearchedOrder(found || null);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">پیگیری سفارش و سوابق خرید</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">مشاهده وضعیت بسته‌بندی، ارسال پستی و رسید تراکنش</p>
            </div>
          </div>
          <button
            onClick={() => setLookupModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Tracking Search Input Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              کد رهگیری پستی یا شماره سفارش را وارد کنید:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                dir="ltr"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="مثال: TRK-12345678 یا JNB-123456"
                className="flex-1 text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>استعلام</span>
              </button>
            </div>
          </form>

          {/* Searched Result Result Banner */}
          {searched && (
            searchedOrder ? (
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-900 dark:text-indigo-300">
                    سفارش {searchedOrder.orderNumber} یافت شد
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                    پرداخت شده و آماده‌سازی ارسال
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">کد رهگیری: </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{searchedOrder.trackingCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">مبلغ پرداخت: </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{formatPrice(searchedOrder.finalAmount)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4" />
                <span>سفارشی با این مشخصات یافت نشد. لطفاً کد را مجدداً بررسی فرمایید.</span>
              </div>
            )
          )}

          {/* Recent Orders List */}
          <div className="space-y-3">
            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              سفارش‌های ثبت شده شما ({toPersianDigits(ordersHistory.length)} سفارش):
            </span>

            {ordersHistory.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                تاکنون خریدی ثبت نکرده‌اید. اولین خرید آنلاین خود را ثبت و از درگاه شاپرک پرداخت نمایید!
              </div>
            ) : (
              <div className="space-y-3">
                {ordersHistory.map(order => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {order.orderNumber}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{order.date}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        پرداخت آنلاین موفق
                      </span>
                    </div>

                    {/* Items miniature */}
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-700">
                          <img src={item.product.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                          <div className="text-[11px] max-w-[140px] truncate">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">{item.product.title}</span>
                            <span className="text-slate-400">{toPersianDigits(item.quantity)} عدد</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Metadata & Bank details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-100 dark:border-slate-700/60 text-slate-500">
                      <div>
                        <span>کد رهگیری پستی: </span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{order.trackingCode}</span>
                      </div>
                      <div>
                        <span>شماره مرجع شاپرک: </span>
                        <span className="font-mono text-emerald-600 font-bold">{order.paymentDetails.rrn}</span>
                      </div>
                      <div className="sm:text-left">
                        <span>مبلغ کل: </span>
                        <span className="font-bold text-slate-900 dark:text-white">{formatPrice(order.finalAmount)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={() => setLookupModalOpen(false)}
            className="px-6 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 transition-colors"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  Printer, 
  ShoppingBag, 
  Package, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  X,
  Copy
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export const OrderSuccessModal: React.FC = () => {
  const { completedOrder, setCompletedOrder, setLookupModalOpen } = useStore();

  useEffect(() => {
    if (completedOrder) {
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [completedOrder]);

  if (!completedOrder) return null;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('کد رهگیری در حافظه کپی شد: ' + text);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top celebratory header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 text-center relative">
          <button
            onClick={() => setCompletedOrder(null)}
            className="absolute top-4 left-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mx-auto flex items-center justify-center shadow-lg mb-3">
            <CheckCircle className="w-9 h-9 text-white" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black">پرداخت آنلاین با موفقیت انجام شد!</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            سفارش شما در سامانه جانبی‌پلاس ثبت شد و فرآیند آماده‌سازی و ارسال آغاز گردید.
          </p>
        </div>

        {/* Invoice Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Key Codes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Order Number */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">شماره سفارش:</span>
              <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400">
                {completedOrder.orderNumber}
              </span>
            </div>

            {/* Tracking Code with copy */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">کد رهگیری پستی:</span>
                <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                  {completedOrder.trackingCode}
                </span>
              </div>
              <button
                onClick={() => handleCopyCode(completedOrder.trackingCode)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                title="کپی کد رهگیری"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bank RRN */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">شماره مرجع شاپرک (RRN):</span>
              <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                {completedOrder.paymentDetails.rrn}
              </span>
            </div>
          </div>

          {/* Pipeline Tracker */}
          <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
            <span className="block text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-3">
              وضعیت پردازش سفارش در انبار مرکزی جانبی‌پلاس:
            </span>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900">
                  ✓
                </div>
                <span className="text-[10px] sm:text-xs font-semibold mt-1.5 text-emerald-700 dark:text-emerald-400">پرداخت تایید شد</span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900 animate-pulse">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold mt-1.5 text-indigo-700 dark:text-indigo-300">تخصیص از انبار</span>
              </div>

              <div className="relative z-10 flex flex-col items-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs ring-4 ring-white dark:ring-slate-900">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-1.5">تحویل به پست</span>
              </div>

              <div className="relative z-10 flex flex-col items-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs ring-4 ring-white dark:ring-slate-900">
                  🏠
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 mt-1.5">تحویل به شما</span>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              اقلام خریداری شده:
            </span>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white dark:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.product.title}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.selectedModel && <span>مدل: {item.selectedModel}</span>}
                        {item.selectedColor && <span>رنگ: {item.selectedColor}</span>}
                        <span>تعداد: {toPersianDigits(item.quantity)} عدد</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left shrink-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment details summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                نشانی مقصد:
              </span>
              <p className="text-slate-600 dark:text-slate-400">{completedOrder.shippingAddress.fullName} - {completedOrder.shippingAddress.phone}</p>
              <p className="text-slate-600 dark:text-slate-400">{completedOrder.shippingAddress.province}، {completedOrder.shippingAddress.city}، {completedOrder.shippingAddress.address}</p>
              <p className="text-slate-500 font-mono">کد پستی: {completedOrder.shippingAddress.postalCode}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1.5">
                <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                اطلاعات تراکنش بانکی:
              </span>
              <p className="text-slate-600 dark:text-slate-400">بانک: {completedOrder.paymentDetails.bankName}</p>
              <p className="text-slate-600 dark:text-slate-400">کارت: <span className="font-mono">{completedOrder.paymentDetails.cardNumberMasked}</span></p>
              <p className="text-slate-600 dark:text-slate-400">شماره پیگیری: <span className="font-mono font-bold text-indigo-600">{completedOrder.paymentDetails.traceNumber}</span></p>
              <p className="text-slate-500">تاریخ پرداخت: {completedOrder.paymentDetails.paidAt}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              چاپ فاکتور خرید
            </button>

            <button
              onClick={() => {
                setCompletedOrder(null);
                setLookupModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              پیگیری سوابق سفارش
            </button>
          </div>

          <button
            onClick={() => setCompletedOrder(null)}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            ادامه خرید از جانبی‌پلاس
          </button>
        </div>
      </div>
    </div>
  );
};

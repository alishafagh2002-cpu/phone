import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Truck, 
  Tag, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Phone,
  User,
  Building
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatPrice, toPersianDigits } from '../../utils/formatters';
import { ShippingAddress } from '../../types/store';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartOriginalTotal,
    cartDiscount,
    couponCode,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    setCurrentOrderDraft,
    setIsPaymentGatewayOpen,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'علی شفق',
    phone: '09121234567',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، نرسیده به میدان ونک، برج نگین، طبقه ۴',
    postalCode: '۱۹۸۷۶۵۴۳۲۱',
    deliveryMethod: 'pishtaz'
  });

  const [selectedGateway, setSelectedGateway] = useState<'shaparak_saman' | 'shaparak_mellat' | 'zarinpal'>('shaparak_saman');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const shippingCost = address.deliveryMethod === 'peyk' ? 65000 : (cartTotal > 500000 ? 0 : 39000);
  const finalPayable = cartTotal + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({
      text: res.message,
      type: res.success ? 'success' : 'error'
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!address.fullName.trim()) errs.fullName = 'نام و نام خانوادگی را وارد کنید.';
    if (!address.phone.trim() || !address.phone.startsWith('09') || address.phone.length !== 11) {
      errs.phone = 'شماره موبایل ۱۱ رقمی معتبر وارد نمایید (مانند ۰۹۱۲۱۲۳۴۵۶۷).';
    }
    if (!address.province.trim()) errs.province = 'استان را وارد کنید.';
    if (!address.city.trim()) errs.city = 'شهر را وارد کنید.';
    if (!address.address.trim()) errs.address = 'آدرس کامل پستی ضروری است.';
    if (!address.postalCode.trim() || address.postalCode.length < 10) {
      errs.postalCode = 'کد پستی ۱۰ رقمی معتبر الزامی است.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGoToPayment = () => {
    if (!validate()) return;

    setCurrentOrderDraft({
      items: cart,
      totalAmount: cartOriginalTotal,
      discountAmount: cartDiscount,
      shippingCost,
      finalAmount: finalPayable,
      shippingAddress: address
    });

    setIsCheckoutOpen(false);
    setIsPaymentGatewayOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">تکمیل اطلاعات و پرداخت آنلاین</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">ثبت نشانی تحویل و اتصال به درگاه شاپرک</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Items Summary bar */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold mb-3">
              <span>اقلام سفارش شما ({toPersianDigits(cart.length)} قلم کالا)</span>
              <span>مجموع اقلام: {formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {cart.map(item => (
                <div key={item.id} className="relative shrink-0 w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 bg-indigo-600 text-white text-[10px] px-1 font-bold rounded-tl-md">
                    x{toPersianDigits(item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: Shipping Address Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>آدرس و مشخصات تحویل‌گیرنده</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">نام و نام خانوادگی تحویل‌گیرنده</label>
                <div className="relative">
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm py-2 px-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="مثال: علی شفق"
                  />
                  <User className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3" />
                </div>
                {formErrors.fullName && <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">شماره تلفن همراه</label>
                <div className="relative">
                  <input
                    type="text"
                    dir="ltr"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm py-2 px-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-right focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="0912xxxxxxx"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3" />
                </div>
                {formErrors.phone && <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>}
              </div>

              {/* Province */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">استان</label>
                <input
                  type="text"
                  value={address.province}
                  onChange={(e) => setAddress({ ...address, province: e.target.value })}
                  className="w-full text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="تهران، اصفهان، فارس..."
                />
                {formErrors.province && <p className="text-[11px] text-rose-500 mt-1">{formErrors.province}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">شهر</label>
                <div className="relative">
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full text-xs sm:text-sm py-2 px-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="نام شهر"
                  />
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3" />
                </div>
                {formErrors.city && <p className="text-[11px] text-rose-500 mt-1">{formErrors.city}</p>}
              </div>

              {/* Full Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">نشانی دقیق پستی</label>
                <textarea
                  rows={2}
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="w-full text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                  placeholder="خیابان اصلی، کوچه، پلاک، زنگ، واحد..."
                />
                {formErrors.address && <p className="text-[11px] text-rose-500 mt-1">{formErrors.address}</p>}
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">کد پستی ۱۰ رقمی</label>
                <input
                  type="text"
                  dir="ltr"
                  maxLength={10}
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value.replace(/\D/g, '') })}
                  className="w-full text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center font-mono"
                  placeholder="1234567890"
                />
                {formErrors.postalCode && <p className="text-[11px] text-rose-500 mt-1">{formErrors.postalCode}</p>}
              </div>

              {/* Delivery method selector */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">روش ارسال کالا</label>
                <select
                  value={address.deliveryMethod}
                  onChange={(e) => setAddress({ ...address, deliveryMethod: e.target.value as any })}
                  className="w-full text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="pishtaz">پست پیشتاز سراسری (تحویل ۲ الی ۴ روزه)</option>
                  <option value="tipax">تیپاکس اکسپرس (تحویل ۱ الی ۲ روزه)</option>
                  <option value="peyk">پیک فوری همان روز (مخصوص تهران)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Coupon Code */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              <Tag className="w-3.5 h-3.5 text-indigo-600" />
              <span>کد تخفیف دارید؟</span>
              <span className="text-[10px] text-slate-400 font-normal">(کدهای تست: OFF20 ، WELCOME)</span>
            </div>

            {couponCode ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  کد {couponCode} فعال شد ({toPersianDigits(couponDiscountPercent)}٪ تخفیف)
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  حذف کد
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  dir="ltr"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="کد تخفیف (مثلاً OFF20)"
                  className="flex-1 text-xs py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
                >
                  اعمال تخفیف
                </button>
              </form>
            )}

            {couponMessage && (
              <p className={`text-[11px] mt-1.5 ${couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
                {couponMessage.text}
              </p>
            )}
          </div>

          {/* Section 3: Payment Gateway Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>انتخاب درگاه پرداخت الکترونیک شاپرک</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Saman */}
              <div
                onClick={() => setSelectedGateway('shaparak_saman')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedGateway === 'shaparak_saman'
                    ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 ring-2 ring-sky-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-sky-700 dark:text-sky-400">درگاه سامان کیش</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedGateway === 'shaparak_saman' ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'}`}>
                    {selectedGateway === 'shaparak_saman' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">اتصال مستقیم به شاپرک بانک سامان</p>
              </div>

              {/* Mellat */}
              <div
                onClick={() => setSelectedGateway('shaparak_mellat')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedGateway === 'shaparak_mellat'
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-rose-700 dark:text-rose-400">به‌پرداخت ملت</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedGateway === 'shaparak_mellat' ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300'}`}>
                    {selectedGateway === 'shaparak_mellat' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">پایداری بالا با شبکه شتاب ملت</p>
              </div>

              {/* ZarinPal */}
              <div
                onClick={() => setSelectedGateway('zarinpal')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedGateway === 'zarinpal'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-amber-700 dark:text-amber-400">زرین‌پال شاپرک</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedGateway === 'zarinpal' ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'}`}>
                    {selectedGateway === 'zarinpal' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">پشتیبانی از تمامی کارت‌های عضو شتاب</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Summary & Gateway Button */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-xs w-full sm:w-auto">
            <div className="flex items-center justify-between sm:justify-start gap-4 text-slate-500 dark:text-slate-400">
              <span>هزینه ارسال:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {shippingCost === 0 ? <span className="text-emerald-600 font-bold">رایگان</span> : formatPrice(shippingCost)}
              </span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex items-center justify-between sm:justify-start gap-4 text-emerald-600 dark:text-emerald-400 font-medium">
                <span>سود شما از این خرید:</span>
                <span>{formatPrice(cartDiscount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between sm:justify-start gap-4 text-sm font-bold text-slate-900 dark:text-white">
              <span>مبلغ نهایی قابل پرداخت:</span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{formatPrice(finalPayable)}</span>
            </div>
          </div>

          <button
            onClick={handleGoToPayment}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>انتقال امن به درگاه شاپرک</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  HelpCircle, 
  ArrowLeft,
  CheckCircle,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { 
  formatCardNumber, 
  detectIranianBank, 
  formatPrice, 
  toPersianDigits, 
  generateRandomCode,
  generateRRN,
  generateTraceNumber,
  getCurrentPersianDate
} from '../../utils/formatters';
import { Order } from '../../types/store';

export const PaymentGatewayModal: React.FC = () => {
  const {
    isPaymentGatewayOpen,
    setIsPaymentGatewayOpen,
    currentOrderDraft,
    addCompletedOrder,
    setIsCheckoutOpen
  } = useStore();

  if (!isPaymentGatewayOpen || !currentOrderDraft) return null;

  // Gateway state
  const [gatewayType, setGatewayType] = useState<'shaparak_saman' | 'shaparak_mellat' | 'zarinpal'>('shaparak_saman');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv2, setCvv2] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode(5));
  const [otpInput, setOtpInput] = useState('');

  // Dynamic OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showSmsBanner, setShowSmsBanner] = useState(false);

  // Gateway Session Countdown (10 mins)
  const [sessionTimer, setSessionTimer] = useState(600);

  // Errors & Processing
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const bankInfo = detectIranianBank(cardNumber);
  const totalAmount = currentOrderDraft.finalAmount || 0;

  // Session timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPaymentError('زمان مجاز شما برای تکمیل پرداخت به پایان رسید. لطفاً مجدداً اقدام فرمایید.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // OTP countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const refreshCaptcha = () => {
    setCaptchaCode(generateRandomCode(5));
    setCaptchaInput('');
  };

  const handleRequestOtp = () => {
    const cleanCard = cardNumber.replace(/\D/g, '');
    if (cleanCard.length < 16) {
      setErrors(prev => ({ ...prev, cardNumber: 'ابتدا شماره کارت ۱۶ رقمی معتبر را وارد کنید.' }));
      return;
    }
    const newOtp = generateRandomCode(6);
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setOtpTimer(120);
    setShowSmsBanner(true);
    setErrors(prev => ({ ...prev, otp: '' }));
  };

  const handleFillOtp = () => {
    setOtpInput(generatedOtp);
    setShowSmsBanner(false);
  };

  // Quick Test Cards
  const fillSuccessCard = () => {
    setCardNumber('6219861044882030'); // Saman
    setCvv2('745');
    setExpMonth('۰۸');
    setExpYear('۰۶');
    setCaptchaInput(captchaCode);
    const mockOtp = generateRandomCode(6);
    setGeneratedOtp(mockOtp);
    setOtpInput(mockOtp);
    setErrors({});
    setPaymentError(null);
  };

  const fillFailCard = () => {
    setCardNumber('6037997123456789'); // Melli
    setCvv2('999');
    setExpMonth('۱۲');
    setExpYear('۰۵');
    setCaptchaInput(captchaCode);
    setOtpInput('123456');
    setErrors({});
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const cleanCard = cardNumber.replace(/\D/g, '');
    if (cleanCard.length !== 16) errs.cardNumber = 'شماره کارت باید ۱۶ رقم باشد.';
    if (cvv2.length < 3 || cvv2.length > 4) errs.cvv2 = 'کد CVV2 صحیح نیست.';
    if (!expMonth || parseInt(expMonth) < 1 || parseInt(expMonth) > 12) errs.expMonth = 'ماه انقضا معتبر نیست.';
    if (!expYear || expYear.length !== 2) errs.expYear = 'سال انقضا نامعتبر است.';
    if (captchaInput !== captchaCode) errs.captcha = 'کد امنیتی کپچا مطابقت ندارد.';
    if (!otpInput || otpInput.length < 5) errs.otp = 'رمز پویا وارد نشده است.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProcessPayment = () => {
    if (!validate()) return;
    setIsProcessing(true);
    setPaymentError(null);

    setTimeout(() => {
      setIsProcessing(false);

      // Check simulated decline if test failure card is used
      if (cardNumber.includes('6037997123456789')) {
        setPaymentError('تراکنش ناموفق: موجودی حساب شما برای این خرید کافی نمی‌باشد (کد خطا: ۵۱).');
        return;
      }

      // Success Payment
      const rrn = generateRRN();
      const trace = generateTraceNumber();
      const orderNumber = `JNB-${Math.floor(100000 + Math.random() * 900000)}`;

      const completedOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        trackingCode: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        date: getCurrentPersianDate(),
        items: currentOrderDraft.items || [],
        totalAmount: currentOrderDraft.totalAmount || 0,
        discountAmount: currentOrderDraft.discountAmount || 0,
        shippingCost: currentOrderDraft.shippingCost || 0,
        finalAmount: totalAmount,
        shippingAddress: currentOrderDraft.shippingAddress!,
        paymentDetails: {
          gateway: gatewayType,
          cardNumberMasked: `${cardNumber.slice(0, 4)} - **** - **** - ${cardNumber.slice(-4)}`,
          bankName: bankInfo.name,
          rrn,
          traceNumber: trace,
          paidAt: getCurrentPersianDate(),
          status: 'success'
        },
        status: 'paid'
      };

      setIsPaymentGatewayOpen(false);
      setIsCheckoutOpen(false);
      addCompletedOrder(completedOrder);
    }, 1800);
  };

  const minutes = Math.floor(sessionTimer / 60);
  const seconds = sessionTimer % 60;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      {/* Simulated SMS Notification Popup */}
      {showSmsBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 w-full max-w-md px-4 animate-bounce">
          <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-indigo-500/50 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600 text-white mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-right text-xs">
                <div className="font-bold text-amber-300 mb-0.5 flex items-center gap-1">
                  <span>پیامک بانکی: {bankInfo.name}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  رمز پویا شما: <span className="font-mono font-bold text-base text-emerald-400 px-1.5 py-0.5 bg-slate-800 rounded">{toPersianDigits(generatedOtp)}</span> جهت خرید درگاه شاپرک با مبلغ {formatPrice(totalAmount)}.
                </p>
              </div>
            </div>
            <button
              onClick={handleFillOtp}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap shadow cursor-pointer"
            >
              جایگذاری رمز
            </button>
          </div>
        </div>
      )}

      {/* Gateway Modal Card */}
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-4">
        {/* Gateway Official Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 border-b border-indigo-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1.5 border border-white/20">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide text-white">شبکه پرداخت الکترونیک شاپرک</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono">
                    <Lock className="w-2.5 h-2.5" /> امن ۲۵۶ بیتی
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">درگاه پرداخت اینترنتی معتبر بانک مرکزی ج.ا.ا</p>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 rounded-xl border border-slate-700 text-amber-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{toPersianDigits(minutes)}:{toPersianDigits(seconds < 10 ? `0${seconds}` : seconds)}</span>
            </div>
          </div>

          {/* Gateway Switcher Tabs */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">ارائه‌دهنده درگاه:</span>
            <button
              onClick={() => setGatewayType('shaparak_saman')}
              className={`px-3 py-1 rounded-lg transition-all font-medium ${
                gatewayType === 'shaparak_saman'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              سامان کیش
            </button>
            <button
              onClick={() => setGatewayType('shaparak_mellat')}
              className={`px-3 py-1 rounded-lg transition-all font-medium ${
                gatewayType === 'shaparak_mellat'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              به‌پرداخت ملت
            </button>
            <button
              onClick={() => setGatewayType('zarinpal')}
              className={`px-3 py-1 rounded-lg transition-all font-medium ${
                gatewayType === 'zarinpal'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              زرین‌پال شاپرک
            </button>
          </div>
        </div>

        {/* Merchant & Order Summary Header */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-slate-500 dark:text-slate-400">پذیرنده: <span className="font-semibold text-slate-800 dark:text-slate-200">فروشگاه جانبی‌پلاس (JanebiPlus)</span></div>
            <div className="text-slate-500 dark:text-slate-400 mt-0.5">شماره ترمینال: <span className="font-mono text-slate-700 dark:text-slate-300">۹۸۴۲۵۱۰۳</span></div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-slate-500 dark:text-slate-400">مبلغ قابل پرداخت:</div>
            <div className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400">
              {formatPrice(totalAmount)}
            </div>
          </div>
        </div>

        {/* Quick Testing Bar for user convenience */}
        <div className="px-4 py-2 bg-indigo-50/70 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-indigo-900 dark:text-indigo-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>حالت شبیه‌ساز پرداخت:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fillSuccessCard}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-slate-700 font-medium transition-colors"
            >
              کارت تست موفق (سامان)
            </button>
            <button
              onClick={fillFailCard}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-700 font-medium transition-colors"
            >
              تست خطای موجودی
            </button>
          </div>
        </div>

        {/* Payment Error Alert */}
        {paymentError && (
          <div className="mx-4 mt-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">خطا در عملیات بانکی</p>
              <p>{paymentError}</p>
            </div>
          </div>
        )}

        {/* Card Form */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Card Number Input & Detected Bank Card Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>شماره کارت ۱۶ رقمی</label>
              {cardNumber.length >= 6 && (
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                  <CreditCard className="w-3.5 h-3.5" />
                  {bankInfo.name}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                dir="ltr"
                value={formatCardNumber(cardNumber)}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '').slice(0, 16);
                  setCardNumber(cleaned);
                  if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
                }}
                placeholder="____ - ____ - ____ - ____"
                className={`w-full font-mono text-base tracking-widest text-center py-2.5 px-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all ${
                  errors.cardNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
            </div>
            {errors.cardNumber && <p className="text-[11px] text-rose-500 font-medium">{errors.cardNumber}</p>}
          </div>

          {/* CVV2 and Expiration Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* CVV2 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <label>کد شناسایی دوم (CVV2)</label>
                <span title="کد ۳ یا ۴ رقمی پشت یا روی کارت" className="text-slate-400 cursor-help">
                  <HelpCircle className="w-3.5 h-3.5" />
                </span>
              </div>
              <input
                type="password"
                dir="ltr"
                maxLength={4}
                value={cvv2}
                onChange={(e) => {
                  setCvv2(e.target.value.replace(/\D/g, '').slice(0, 4));
                  if (errors.cvv2) setErrors(prev => ({ ...prev, cvv2: '' }));
                }}
                placeholder="•••"
                className={`w-full font-mono text-center py-2.5 px-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${
                  errors.cvv2 ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.cvv2 && <p className="text-[11px] text-rose-500">{errors.cvv2}</p>}
            </div>

            {/* Expiry Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                تاریخ انقضای کارت
              </label>
              <div className="flex items-center gap-2" dir="ltr">
                <input
                  type="text"
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) => {
                    setExpMonth(e.target.value.replace(/\D/g, '').slice(0, 2));
                    if (errors.expMonth) setErrors(prev => ({ ...prev, expMonth: '' }));
                  }}
                  placeholder="ماه (۰۱)"
                  className="w-full font-mono text-center py-2.5 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <span className="text-slate-400 font-bold">/</span>
                <input
                  type="text"
                  maxLength={2}
                  value={expYear}
                  onChange={(e) => {
                    setExpYear(e.target.value.replace(/\D/g, '').slice(0, 2));
                    if (errors.expYear) setErrors(prev => ({ ...prev, expYear: '' }));
                  }}
                  placeholder="سال (۰۶)"
                  className="w-full font-mono text-center py-2.5 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              {(errors.expMonth || errors.expYear) && (
                <p className="text-[11px] text-rose-500">تاریخ انقضا را به درستی وارد نمایید.</p>
              )}
            </div>
          </div>

          {/* Dynamic Captcha Row */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              کد امنیتی داخل تصویر
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                dir="ltr"
                maxLength={5}
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);
                  if (errors.captcha) setErrors(prev => ({ ...prev, captcha: '' }));
                }}
                placeholder="کد تصویر"
                className={`w-1/2 font-mono text-center py-2.5 px-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${
                  errors.captcha ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />

              {/* Captcha graphic canvas simulation */}
              <div className="w-1/2 flex items-center justify-between bg-slate-200 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-300 dark:border-slate-700 select-none">
                <span className="font-mono text-lg font-black tracking-widest text-slate-800 dark:text-amber-400 line-through decoration-slate-400 rotate-1">
                  {captchaCode}
                </span>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
                  title="تغییر کد امنیتی"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            {errors.captcha && <p className="text-[11px] text-rose-500">{errors.captcha}</p>}
          </div>

          {/* One-Time Password (رمز پویا) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>رمز دوم پویا (اینترنتی)</label>
              {otpSent && (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono">
                  زمان باقی‌مانده: {toPersianDigits(otpTimer)} ثانیه
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="password"
                dir="ltr"
                value={otpInput}
                onChange={(e) => {
                  setOtpInput(e.target.value.replace(/\D/g, ''));
                  if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }));
                }}
                placeholder="رمز پیامک شده"
                className={`w-full font-mono text-center py-2.5 px-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white ${
                  errors.otp ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />

              <button
                type="button"
                disabled={otpSent && otpTimer > 0}
                onClick={handleRequestOtp}
                className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white disabled:text-slate-500 text-xs font-semibold transition-all cursor-pointer"
              >
                {otpSent && otpTimer > 0 ? 'رمز ارسال شد' : 'دریافت رمز پویا'}
              </button>
            </div>
            {errors.otp && <p className="text-[11px] text-rose-500">{errors.otp}</p>}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsPaymentGatewayOpen(false)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            انصراف و بازگشت
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleProcessPayment}
            className="w-full sm:w-auto min-w-[200px] px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                در حال احراز و برقراری ارتباط با بانک...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                پرداخت نهایی {formatPrice(totalAmount)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Smartphone, 
  Clock, 
  Flame, 
  CreditCard 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { toPersianDigits } from '../../utils/formatters';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, setSelectedDevice, setIsCheckoutOpen } = useStore();

  // Flash Sale Countdown simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-indigo-900/50">
      {/* Background glow effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-5 text-right">
          {/* Flash sale tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold backdrop-blur-sm">
            <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>جشنواره فروش ویژه لوازم جانبی پرچمداران ۲۰۲۵</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span className="text-[11px] font-mono text-white">تا ۳۰٪ تخفیف</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-tight">
            تجهیزات اورجینال، <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              محافظت بی‌نقص از گوشی شما
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            مجموعه تخصصی قاب‌های ضدضربه نیلکین و اسپیگن، گلس‌های پرایوسی، شارژرهای GaN انکر، پاوربانک‌های مگ‌سیف باسئوس و هندزفری‌های بلوتوثی با ضمانت اصالت ۱۰۰٪ و پرداخت مستقیم درگاه شاپرک.
          </p>

          {/* Flash sale countdown clock */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              مهلت خرید با تخفیف شگفت‌انگیز:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-300">
              <div className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
                {toPersianDigits(timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds)}
                <span className="text-[10px] text-slate-400 font-sans block text-center">ثانیه</span>
              </div>
              <span>:</span>
              <div className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
                {toPersianDigits(timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes)}
                <span className="text-[10px] text-slate-400 font-sans block text-center">دقیقه</span>
              </div>
              <span>:</span>
              <div className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
                {toPersianDigits(timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours)}
                <span className="text-[10px] text-slate-400 font-sans block text-center">ساعت</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const element = document.getElementById('products-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>مشاهده و خرید لوازم جانبی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const bundleSection = document.getElementById('bundle-builder-section');
                bundleSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>پکیج‌های تخفیف‌دار ۳ در ۱</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid on the Left */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <CreditCard className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="font-bold text-xs sm:text-sm text-white">پرداخت آنلاین شاپرک</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              درگاه‌های امن به‌پرداخت ملت، سامان کیش و زرین‌پال با رمز پویا
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <Smartphone className="w-6 h-6 text-sky-400 mb-2" />
            <h4 className="font-bold text-xs sm:text-sm text-white">فیلتر هوشمند مدل گوشی</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              تطابق ۱۰۰٪ اندازه قاب، گلس و لنز با مدل اختصاصی موبایل شما
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <ShieldCheck className="w-6 h-6 text-indigo-400 mb-2" />
            <h4 className="font-bold text-xs sm:text-sm text-white">گارانتی تعویض و اصالت</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              ضمانت بازگشت وجه تا ۷ روز در صورت عدم رضایت یا عدم تطابق کالا
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <Truck className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="font-bold text-xs sm:text-sm text-white">ارسال سریع سراسری</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              پست پیشتاز، تیپاکس و پیک اکسپرس همان روز در شهر تهران
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

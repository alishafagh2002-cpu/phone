import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  CreditCard, 
  Smartphone, 
  Phone, 
  Mail, 
  MapPin, 
  Lock 
} from 'lucide-react';
import { toPersianDigits } from '../../utils/formatters';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-slate-800 text-right">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">تحویل اکسپرس و سریع</h4>
              <p className="text-[11px] text-slate-400">ارسال در تهران و سراسر کشور</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">ضمانت اصالت ۱۰۰٪ کالا</h4>
              <p className="text-[11px] text-slate-400">تنها برندهای اصلی و تاییدشده</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">۷ روز ضمانت تعویض</h4>
              <p className="text-[11px] text-slate-400">تضمین سلامت فیزیکی و بی قید و شرط</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">پرداخت آنلاین شاپرک</h4>
              <p className="text-[11px] text-slate-400">به‌پرداخت ملت و سامان کیش</p>
            </div>
          </div>
        </div>

        {/* Links and Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">جانبی‌پلاس</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              فروشگاه اینترنتی تخصصی لوازم جانبی گوشی هوشمند و تبلت. ما با حذف واسطه‌ها، باکیفیت‌ترین قاب‌ها، گلس‌ها، شارژرها و تجهیزات مگ‌سیف را با گارانتی معتبر به دست شما می‌رسانیم.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>شماره تماس: ۰۲۱-۸۸۹۹۲۲۰۰</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>پشتیبانی: support@janebiplus.ir</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white">خدمات مشتریان</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">پاسخ به پرسش‌های متداول</a></li>
              <li><a href="#" className="hover:text-white transition-colors">رویه‌های بازگرداندن کالا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شرایط استفاده و حریم خصوصی</a></li>
              <li><a href="#" className="hover:text-white transition-colors">راهنمای انتخاب گلس و کاور مناسب</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white">دسته‌بندی‌های پرطرفدار</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">قاب و کاور نیلکین آیفون ۱۶ پرو</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شارژرهای GaN انکر ۶۵ و ۱۰۰ وات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">گلس‌های ضدجاسوسی (پرایوسی)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">پاوربانک‌های وایرلس مگ‌سیف</a></li>
            </ul>
          </div>

          {/* Electronic Trust Seals (E-Namad & Shaparak) */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white">نمادهای اعتماد الکترونیکی</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center flex flex-col items-center justify-center space-y-1">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
                <span className="text-[11px] font-bold text-white">اینماد پنج‌ستاره</span>
                <span className="text-[9px] text-slate-400">وزارت صنعت و معدن</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center flex flex-col items-center justify-center space-y-1">
                <Lock className="w-7 h-7 text-sky-400" />
                <span className="text-[11px] font-bold text-white">درگاه شاپرک</span>
                <span className="text-[9px] text-slate-400">پرداخت امن بانکی</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 text-center">
              دارای مجوز رسمی کسب‌وکار اینترنتی و درگاه متصل به سامانه جامع شاپرک
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            تمامی حقوق مادی و معنوی برای فروشگاه آنلاین <strong className="text-slate-200">جانبی‌پلاس</strong> محفوظ است.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>طراحی مدرن و رابط کاربری اختصاصی فارسی</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

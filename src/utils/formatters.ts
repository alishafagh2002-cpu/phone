// Utilities for Persian formatting, currency, numbers, and bank detection

export function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n
    .toString()
    .replace(/[0-9]/g, (w) => farsiDigits[+w]);
}

export function formatPrice(price: number, withUnit = true): string {
  const formatted = price.toLocaleString('fa-IR');
  return withUnit ? `${formatted} تومان` : formatted;
}

export function formatCardNumber(val: string): string {
  const cleaned = val.replace(/\D/g, '').slice(0, 16);
  const parts: string[] = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.slice(i, i + 4));
  }
  return parts.join(' - ');
}

export interface BankInfo {
  name: string;
  color: string;
  bgGradient: string;
  logoText: string;
}

export function detectIranianBank(cardNumber: string): BankInfo {
  const clean = cardNumber.replace(/\D/g, '').slice(0, 6);
  
  if (clean.startsWith('603799')) return { name: 'بانک ملی ایران', color: '#1d4ed8', bgGradient: 'from-blue-700 to-indigo-900', logoText: 'BMI' };
  if (clean.startsWith('610433')) return { name: 'بانک ملت', color: '#dc2626', bgGradient: 'from-red-600 to-rose-900', logoText: 'MELLAT' };
  if (clean.startsWith('621986')) return { name: 'بانک سامان', color: '#0284c7', bgGradient: 'from-sky-500 to-cyan-800', logoText: 'SAMAN' };
  if (clean.startsWith('502229')) return { name: 'بانک پاسارگاد', color: '#ca8a04', bgGradient: 'from-amber-500 to-yellow-800', logoText: 'PASARGAD' };
  if (clean.startsWith('603769')) return { name: 'بانک صادرات ایران', color: '#4338ca', bgGradient: 'from-indigo-600 to-blue-950', logoText: 'BSI' };
  if (clean.startsWith('627412')) return { name: 'بانک اقتصاد نوین', color: '#7c3aed', bgGradient: 'from-purple-600 to-indigo-900', logoText: 'EN' };
  if (clean.startsWith('622106')) return { name: 'بانک پارسیان', color: '#b91c1c', bgGradient: 'from-red-700 to-rose-950', logoText: 'PARSIAN' };
  if (clean.startsWith('589463')) return { name: 'بانک رفاه کارگران', color: '#15803d', bgGradient: 'from-emerald-600 to-teal-900', logoText: 'REFAH' };
  if (clean.startsWith('585983')) return { name: 'بانک تجارت', color: '#0369a1', bgGradient: 'from-blue-600 to-slate-900', logoText: 'TEJARAT' };
  if (clean.startsWith('636214')) return { name: 'بانک آینده', color: '#854d0e', bgGradient: 'from-yellow-700 to-amber-950', logoText: 'AYANDEH' };
  if (clean.startsWith('603770')) return { name: 'بانک کشاورزی', color: '#16a34a', bgGradient: 'from-green-600 to-emerald-900', logoText: 'BK' };
  if (clean.startsWith('628023')) return { name: 'بانک مسکن', color: '#ea580c', bgGradient: 'from-orange-600 to-amber-900', logoText: 'MASKAN' };
  if (clean.startsWith('504706')) return { name: 'بانک شهر', color: '#e11d48', bgGradient: 'from-rose-600 to-pink-900', logoText: 'SHAHAR' };
  if (clean.startsWith('606373')) return { name: 'بانک مهر ایران', color: '#059669', bgGradient: 'from-emerald-500 to-green-800', logoText: 'QMB' };
  if (clean.startsWith('627760')) return { name: 'پست بانک ایران', color: '#047857', bgGradient: 'from-teal-600 to-emerald-900', logoText: 'POST' };

  return {
    name: 'شبکه شتاب بانکی (شاپرک)',
    color: '#334155',
    bgGradient: 'from-slate-700 to-slate-900',
    logoText: 'SHATAB'
  };
}

export function generateRandomCode(length = 6): string {
  const chars = '0123456789';
  let res = '';
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

export function generateRRN(): string {
  // 12 digit Reference Retrieval Number
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

export function generateTraceNumber(): string {
  // 6 digit trace number
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getCurrentPersianDate(): string {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());
  } catch {
    return 'امروز';
  }
}

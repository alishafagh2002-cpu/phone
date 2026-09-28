import { Product, DeviceModel } from '../types/store';

export const POPULAR_DEVICES: DeviceModel[] = [
  { id: 'all', brand: 'Apple', name: 'همه مدل‌های گوشی', slug: 'all' },
  { id: 'ip16pm', brand: 'Apple', name: 'iPhone 16 Pro Max', slug: 'iphone-16-pro-max' },
  { id: 'ip16p', brand: 'Apple', name: 'iPhone 16 Pro', slug: 'iphone-16-pro' },
  { id: 'ip16', brand: 'Apple', name: 'iPhone 16', slug: 'iphone-16' },
  { id: 'ip15pm', brand: 'Apple', name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max' },
  { id: 'ip15p', brand: 'Apple', name: 'iPhone 15 Pro', slug: 'iphone-15-pro' },
  { id: 'ip13p', brand: 'Apple', name: 'iPhone 13 Pro Max', slug: 'iphone-13-pro-max' },
  { id: 's24u', brand: 'Samsung', name: 'Galaxy S24 Ultra', slug: 'galaxy-s24-ultra' },
  { id: 's24p', brand: 'Samsung', name: 'Galaxy S24 Plus', slug: 'galaxy-s24-plus' },
  { id: 's23u', brand: 'Samsung', name: 'Galaxy S23 Ultra', slug: 'galaxy-s23-ultra' },
  { id: 'a55', brand: 'Samsung', name: 'Galaxy A55 5G', slug: 'galaxy-a55' },
  { id: 'mi14p', brand: 'Xiaomi', name: 'Xiaomi 14 Pro', slug: 'xiaomi-14-pro' },
  { id: 'mi13t', brand: 'Xiaomi', name: 'Xiaomi 13T Pro', slug: 'xiaomi-13t-pro' },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    title: 'قاب محافظ نیلکین مدل CamShield Pro مجهز به درب کشویی محافظ لنز',
    titleEn: 'Nillkin CamShield Pro Armor Case with Camera Slider',
    category: 'قاب و کاور',
    brand: 'Nillkin',
    compatibleModels: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'Galaxy S24 Ultra'],
    price: 685000,
    originalPrice: 850000,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'مشکی مات', hex: '#1e293b' },
      { name: 'سبز کانتینری', hex: '#166534' },
      { name: 'سرمه‌ای تیره', hex: '#1e3a8a' }
    ],
    features: [
      'درب اسلایدی اختصاصی محافظ لنز دوربین ۰.۲ میلی‌متری',
      'پوشش ۳۶۰ درجه پلی‌کربنات نسوز و ضد لغزش',
      'لبه‌های تقویت‌شده ایربگ دار جهت مهار ضربات سقوط',
      'پشتیبانی کامل از شارژرهای بیسیم Qi'
    ],
    specs: {
      'جنس بدنه': 'ترکیب PC سخت و TPU ژله‌ای ضدضربه',
      'وزن': '۴۲ گرم',
      'استاندارد مقاومت': 'استاندارد سقوط نظامی MIL-STD-810G',
      'سازگاری با شارژ وایرلس': 'دارد'
    },
    warranty: '۱۲ ماه گارانتی اصالت و تعویض نیلکین ایران',
    inStock: true,
    stockCount: 24,
    isSpecialOffer: true,
    isBestSeller: true,
    salesCount: 890,
    tags: ['قاب ضدضربه', 'محافظ لنز', 'نیلکین', 'آیفون ۱۶', 'اس ۲۴ اولترا']
  },
  {
    id: 'prod-2',
    title: 'شارژر دیواری انکر ۶۵ وات مجهز به تکنولوژی GaNPrime و ۳ پورت همزمان',
    titleEn: 'Anker 735 Charger (GaNPrime 65W) 3-Port Fast Charger',
    category: 'شارژر و آداپتور',
    brand: 'Anker',
    compatibleModels: ['همه مدل‌های گوشی', 'iPhone 16 Pro Max', 'Galaxy S24 Ultra', 'Xiaomi 14 Pro', 'مک‌بوک و لپ‌تاپ'],
    price: 2490000,
    originalPrice: 2950000,
    discountPercent: 16,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622445268045-8f4b00516bcf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'مشکی کربن', hex: '#0f172a' },
      { name: 'نقره‌ای متالیک', hex: '#94a3b8' }
    ],
    features: [
      'تراشه فوق پیشرفته گالیوم نیترید (GaN) نسل پنجم با ۵۳٪ ابعاد کوچکتر',
      'فناوری PowerIQ 4.0 با تخصیص هوشمند توان مصرفی به هر دیوایس',
      'کنترل حرارتی مداوم ActiveShield 2.0 با پایش ۳ میلیون بار در روز',
      'دارای ۲ پورت Type-C و یک پورت USB-A با شارژ همزمان ۳ دستگاه'
    ],
    specs: {
      'توان خروجی کل': '۶۵ وات توان واقعی سوپرفست',
      'تعداد درگاه‌ها': '۲ عدد USB-C با خروجی تا ۶۵W و ۱ عدد USB-A',
      'پروتکل‌ها': 'PD 3.0, PPS, QC 4.0+, Samsung Super Fast Charging 2.0',
      'وزن': '۱۳۲ گرم'
    },
    warranty: '۱۸ ماه گارانتی طلایی تعویض آسان سرویس',
    inStock: true,
    stockCount: 15,
    isSpecialOffer: true,
    isBestSeller: true,
    salesCount: 1240,
    tags: ['شارژر سریع', 'انکر', 'GaN', 'تایپ سی', '۶۵ وات']
  },
  {
    id: 'prod-3',
    title: 'گلس محافظ صفحه نمایش پرایوسی نیلکین مدل Amazing CP+ Pro ضد جاسوسی',
    titleEn: 'Nillkin Amazing CP+ Pro Anti-Spy Privacy Tempered Glass',
    category: 'محافظ صفحه و گلس',
    brand: 'Nillkin',
    compatibleModels: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 13 Pro Max'],
    price: 490000,
    originalPrice: 620000,
    discountPercent: 21,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'فریم مشکی فول کاور', hex: '#000000' }
    ],
    features: [
      'فناوری زاویه دید ۲۸ درجه برای محرمانه ماندن اطلاعات نمایشگر',
      'سختی الماسه ۹H واقعی ضد خط و خش تیغ و کلید',
      'پوشش نانومتری اولئوفوبیک جهت مقاومت در برابر اثر انگشت و چربی',
      'لبه‌های تراش خورده سه بعدی 2.5D بدون ایجاد اختلال با انواع قاب'
    ],
    specs: {
      'درجه سختی': '9H Pro Tempered Glass',
      'ضخامت': '۰.۳۳ میلی‌متر بسیار شفاف با لمس فوق‌سریع',
      'اقلام همراه': 'پک کامل نصب، شابلون آسان‌نصب، پد الکلی و برچسب گردگیر'
    },
    warranty: 'ضمانت نصب بدون حباب و سلامت فیزیکی هنگام تحویل',
    inStock: true,
    stockCount: 40,
    isSpecialOffer: false,
    isBestSeller: true,
    salesCount: 620,
    tags: ['گلس پرایوسی', 'گلس آیفون', 'محافظ صفحه', 'ضد جاسوسی']
  },
  {
    id: 'prod-4',
    title: 'پاوربانک مغناطیسی وایرلس باسئوس مجهز به استند فلزی و توان ۲۰ وات',
    titleEn: 'Baseus 10000mAh Magnetic Wireless MagSafe Power Bank 20W',
    category: 'پاوربانک',
    brand: 'Baseus',
    compatibleModels: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'Galaxy S24 Ultra'],
    price: 1980000,
    originalPrice: 2350000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1609592426861-125be7d01309?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609592426861-125be7d01309?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'خاکستری تیتانیوم', hex: '#64748b' },
      { name: 'سفید صدفی', hex: '#f8fafc' },
      { name: 'آبی اقیانوسی', hex: '#0284c7' }
    ],
    features: [
      'مگنت پرقدرت با ۳۵۰۰ گاوس نیروی چسبندگی محکم به پشت گوشی',
      'پایه فلزی تاشو با قابلیت نگه‌داری عمودی و افقی برای تماشای ویدیو',
      'خروجی سیم‌دار ۲۰ وات PD تایپ سی و وایرلس تا ۱۵ وات',
      'نمایشگر هوشمند درصد باتری به صورت دیجیتالی دقیق'
    ],
    specs: {
      'ظرفیت اسمی': '۱۰,۰۰۰ میلی‌آمپر ساعت لیتیوم پلیمری',
      'توان خروجی وایرلس': '۵W / 7.5W / 10W / 15W MagSafe',
      'توان خروجی کابل': '20W PD Fast Charge',
      'وزن': '۲۱۰ گرم جمع و جور و خوش‌دست'
    },
    warranty: '۱۲ ماه گارانتی تعویض شرکتی باسئوس',
    inStock: true,
    stockCount: 18,
    isSpecialOffer: true,
    isBestSeller: true,
    salesCount: 450,
    tags: ['پاوربانک', 'مگ سیف', 'باسئوس', 'شارژر وایرلس', 'استنددار']
  },
  {
    id: 'prod-5',
    title: 'هندزفری بلوتوثی انکر مدل Soundcore Liberty 4 NC با نویزکنسلینگ ۹۸.۵٪',
    titleEn: 'Anker Soundcore Liberty 4 NC True Wireless Earbuds',
    category: 'هندزفری و هدفون',
    brand: 'Anker',
    compatibleModels: ['همه مدل‌های گوشی', 'iPhone 16 Pro Max', 'Galaxy S24 Ultra', 'Xiaomi 14 Pro'],
    price: 3650000,
    originalPrice: 4200000,
    discountPercent: 13,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'مشکی مخملی', hex: '#09090b' },
      { name: 'سفید یخی', hex: '#f1f5f9' },
      { name: 'سرمه‌ای دریایی', hex: '#1e3a8a' },
      { name: 'آبی روشن پاستلی', hex: '#7dd3fc' }
    ],
    features: [
      'سیستم پیشرفته اکتیو نویزکنسلینگ تطبیقی ۲.۰ با حذف تا ۹۸.۵ درصد نویز',
      'درایورهای ۱۱ میلی‌متری سفارشی با استاندارد صدای Hi-Res Wireless و کدک LDAC',
      'شارژدهی اعجاب‌انگیز ۱۰ ساعت پخش مداوم و مجموعاً ۵۰ ساعت با کیس',
      '۶ میکروفون مجهز به هوش مصنوعی برای تفکیک فوق شفاف صدا هنگام مکالمه'
    ],
    specs: {
      'نسخه بلوتوث': 'بلوتوث ۵.۳ پایدار با قابلیت اتصال همزمان به دو دستگاه',
      'استاندارد مقاومت': 'مقاوم در برابر آب و تعریق با گواهی IPX4',
      'شارژ سریع': '۱۰ دقیقه شارژ = ۴ ساعت پخش موسیقی',
      'اپلیکیشن اختصاصی': 'پشتیبانی کامل از نرم‌افزار Soundcore با ۲۲ اکولایزر'
    },
    warranty: '۱۸ ماه گارانتی ایستا تجارت اروند',
    inStock: true,
    stockCount: 12,
    isSpecialOffer: true,
    isBestSeller: true,
    salesCount: 1530,
    tags: ['ایرپاد', 'انکر', 'نویزکنسلینگ', 'های رز', 'هندزفری بی سیم']
  },
  {
    id: 'prod-6',
    title: 'کابل فست شارژ تایپ‌سی به تایپ‌سی باسئوس مدل Tungsten Gold توان ۱۰۰ وات',
    titleEn: 'Baseus Tungsten Gold 100W USB-C to USB-C Fast Charging Cable 2m',
    category: 'کابل و تبدیل',
    brand: 'Baseus',
    compatibleModels: ['همه مدل‌های گوشی', 'iPhone 16 Pro Max', 'iPhone 15 Pro Max', 'Galaxy S24 Ultra', 'مک‌بوک'],
    price: 340000,
    originalPrice: 420000,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'مشکی کروم طلایی', hex: '#27272a' }
    ],
    features: [
      'روکش الیاف نایلونی بافته‌شده ضدگره‌خوردگی با تحمل ۱۰,۰۰۰ بار خمش',
      'سری‌های ساخته شده از آلیاژ روی تنگستن براق و ضد اکسیداسیون',
      'تراشه E-Marker هوشمند برای تنظیم امن آمپر و ولتاژ تا ۵ آمپر',
      'سرعت انتقال دیتای بالا با نرخ ۴۸۰ مگابیت بر ثانیه'
    ],
    specs: {
      'طول کابل': '۲ متر آزاد برای استفاده روزمره و خودرو',
      'توان عبوری حداکثر': '۱۰۰ وات PD واقعی سازگار با لپ‌تاپ و گوشی',
      'نوع رابط': 'USB-C به Type-C با چیپست هوشمند محافظ باتری'
    },
    warranty: '۶ ماه گارانتی تعویض کابل',
    inStock: true,
    stockCount: 50,
    isSpecialOffer: false,
    isBestSeller: true,
    salesCount: 880,
    tags: ['کابل ۱۰۰ وات', 'تایپ سی', 'باسئوس', 'فست شارژ']
  },
  {
    id: 'prod-7',
    title: 'هولدر و پایه نگهدارنده دریچه‌ای خودرو مگ‌سیف مک‌دودو با چرخش ۳۶۰ درجه',
    titleEn: 'Mcdodo MagSafe Car Air Vent Mount Holder with Ring Lock',
    category: 'هولدر و پایه',
    brand: 'Mcdodo',
    compatibleModels: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'Galaxy S24 Ultra'],
    price: 590000,
    originalPrice: 720000,
    discountPercent: 18,
    rating: 4.6,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'مشکی مات تیتانیومی', hex: '#18181b' }
    ],
    features: [
      '۱۶ مگنت نئودیمیوم N52 با قدرت جذب فوق‌العاده در دست‌اندازهای شدید جاده',
      'گیره قفل‌شونده دندانه‌دار سازگار با تمام انواع دریچه‌های کولر خودرو',
      'مفصل توپی با گردش ۳۶۰ درجه و تغییر زاویه دلخواه عمودی یا افقی',
      'همراه با رینگ مغناطیسی چسبی برای گوشی‌های فاقد مگ‌سیف'
    ],
    specs: {
      'نوع نصب': 'دریچه کولر خودرو با پیچ تنظیم قفل فلزی',
      'جنس بدنه': 'آلیاژ آلومینیوم آنودایز شده و سیلیکون محافظ',
      'وزن': '۸۵ گرم'
    },
    warranty: '۱۲ ماه گارانتی مک‌دودو سنتر',
    inStock: true,
    stockCount: 22,
    isSpecialOffer: false,
    isBestSeller: false,
    salesCount: 310,
    tags: ['هولدر ماشین', 'مگ سیف', 'مک دودو', 'پایه موبایل']
  },
  {
    id: 'prod-8',
    title: 'محافظ لنز شیشه‌ای تیتانیومی نیلکین مدل Cloak Pro ضد انعکاس و خط و خش',
    titleEn: 'Nillkin Cloak Pro Titanium Camera Lens Protector',
    category: 'محافظ لنز دوربین',
    brand: 'Nillkin',
    compatibleModels: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'Galaxy S24 Ultra'],
    price: 380000,
    originalPrice: 480000,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'رینگ تیتانیوم نچرال', hex: '#a1a1aa' },
      { name: 'رینگ مشکی فانتوم', hex: '#09090b' },
      { name: 'رینگ طلایی کویر', hex: '#d97706' }
    ],
    features: [
      'شیشه سافایر ضدخش گرید یاقوت با انتقال نور ۹۹.۸ درصدی بدون افت کیفیت عکاسی',
      'پوشش ضد تابش AR برای جلوگیری از فلش بک و لکه‌های نوری در عکاسی شب',
      'رینگ آلیاژ تیتانیوم فضایی دقیقاً هم‌رنگ با بدنه اصلی گوشی',
      'چسب نانو ضدآب IP68 بدون ورود گرد و خاک به زیر محافظ'
    ],
    specs: {
      'پوشش لنز': 'یاقوت کبود مصنوعی (Synthetic Sapphire)',
      'فریم دور': 'تیتانیوم گرید هوافضا با آبکاری PVD',
      'تعداد در بسته': 'ست کامل محافظ ۳ لنز دوربین مجزا'
    },
    warranty: 'ضمانت اصالت و عدم افت کیفیت تصویر دوربین',
    inStock: true,
    stockCount: 35,
    isSpecialOffer: true,
    isBestSeller: true,
    salesCount: 780,
    tags: ['محافظ لنز', 'تیتانیوم', 'ضد خش', 'آیفون ۱۶']
  },
  {
    id: 'prod-9',
    title: 'قاب سیلیکونی مگ‌سیف‌دار اورجینال اپل با پوشش داخلی میکروفایبر مخملی',
    titleEn: 'Official Apple Silicone Case with MagSafe',
    category: 'قاب و کاور',
    brand: 'Apple',
    compatibleModels: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro'],
    price: 1150000,
    originalPrice: 1400000,
    discountPercent: 17,
    rating: 4.9,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'آبی جین (Denim)', hex: '#3b82f6' },
      { name: 'مشکی کربن', hex: '#18181b' },
      { name: 'نارنجی اولترامارین', hex: '#ea580c' },
      { name: 'سبز کاجی', hex: '#14532d' }
    ],
    features: [
      'سیلیکون مایع اصل و اورجینال با لمس نرم و ابریشمی بدون لکه‌پذیری',
      'آهنرباهای داخلی مگ‌سیف کاملاً تراز با صدای انیمیشن قفل گوشی',
      'پوشش کامل دکمه کنترل دوربین (Camera Control Capable)',
      'پوشش داخلی الیاف میکروفایبر نرم برای پیشگیری از هرگونه خط روی بدنه'
    ],
    specs: {
      'جنس': 'سیلیکون بهداشتی گرید غذایی با لایه آستر مخمل جیر',
      'پشتیبانی مگ‌سیف': 'دارد با آهنربای ۳۸ تایی اصلی',
      'وزن': '۳۵ گرم'
    },
    warranty: 'تضمین مادام‌العمر عدم تغییر رنگ و پوسته شدن سیلیکون',
    inStock: true,
    stockCount: 19,
    isSpecialOffer: true,
    isBestSeller: true,
    salesCount: 940,
    tags: ['قاب سیلیکونی', 'اپل', 'مگ سیف', 'اورجینال']
  },
  {
    id: 'prod-10',
    title: 'قاب اسپیگن مدل Tough Armor ضدضربه فوق‌العاده سخت مجهز به پایه‌استند',
    titleEn: 'Spigen Tough Armor Heavy Duty Shockproof Kickstand Case',
    category: 'قاب و کاور',
    brand: 'Spigen',
    compatibleModels: ['Galaxy S24 Ultra', 'Galaxy S24 Plus', 'Galaxy S23 Ultra'],
    price: 1390000,
    originalPrice: 1650000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'مشکی گرافیتی', hex: '#18181b' },
      { name: 'خاکستری تفنگی', hex: '#3f3f46' }
    ],
    features: [
      'فناوری محافظت فوم جاذب شوک اکستریم (Extreme Impact Foam)',
      'پایه نگه‌دارنده تاشو مخفی تقویت‌شده فلزی',
      'طراحی دو لایه TPU انعطاف‌پذیر و پلی‌کربنات فوق سخت ضدگلوله',
      'طراحی ارگونومیک با دسترسی کامل به قلم S-Pen'
    ],
    specs: {
      'ساخت': 'کشور کره جنوبی اصل اسپیگن',
      'تاییدیه': 'گواهینامه تست سقوط سقوط از ارتفاع ۲ متری',
      'وزن': '۴۸ گرم'
    },
    warranty: 'گارانتی ۱۲ ماهه هولوگرام‌دار شرکت پارت',
    inStock: true,
    stockCount: 14,
    isSpecialOffer: false,
    isBestSeller: true,
    salesCount: 520,
    tags: ['قاب اسپیگن', 'سامسونگ', 'ضدضربه', 'استنددار']
  }
];

export interface BundleDeal {
  id: string;
  title: string;
  description: string;
  targetPhone: string;
  items: {
    product: Product;
    role: 'کاور ضدضربه' | 'محافظ صفحه' | 'شارژر اورجینال' | 'محافظ لنز';
  }[];
  bundleDiscountPercent: number;
}

export const POPULAR_BUNDLES: BundleDeal[] = [
  {
    id: 'bundle-ip16',
    title: 'پکیج محافظت کامل آیفون ۱۶ پرو (کاور + گلس + محافظ لنز)',
    description: 'شامل قاب ضدضربه نیلکین CamShield Pro، گلس پرایوسی و محافظ لنز تیتانیومی با ۲۵٪ تخفیف تجمیعی',
    targetPhone: 'iPhone 16 Pro Max',
    bundleDiscountPercent: 25,
    items: [
      { product: PRODUCTS_DATA[0], role: 'کاور ضدضربه' },
      { product: PRODUCTS_DATA[2], role: 'محافظ صفحه' },
      { product: PRODUCTS_DATA[7], role: 'محافظ لنز' }
    ]
  },
  {
    id: 'bundle-s24',
    title: 'سوپر پک شارژ سریع و محافظت گلکسی S24 اولترا',
    description: 'شامل شارژر ۶۵ وات ۳ پورت انکر GaNPrime، قاب سخت اسپیگن و کابل ۱۰۰ وات طلایی باسئوس با ۲۲٪ تخفیف',
    targetPhone: 'Galaxy S24 Ultra',
    bundleDiscountPercent: 22,
    items: [
      { product: PRODUCTS_DATA[1], role: 'شارژر اورجینال' },
      { product: PRODUCTS_DATA[9], role: 'کاور ضدضربه' },
      { product: PRODUCTS_DATA[5], role: 'محافظ صفحه' }
    ]
  }
];

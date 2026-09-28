export type ProductCategory = 
  | 'قاب و کاور'
  | 'محافظ صفحه و گلس'
  | 'شارژر و آداپتور'
  | 'هندزفری و هدفون'
  | 'پاوربانک'
  | 'کابل و تبدیل'
  | 'هولدر و پایه'
  | 'محافظ لنز دوربین';

export type BrandName = 
  | 'Apple'
  | 'Samsung'
  | 'Xiaomi'
  | 'Anker'
  | 'Baseus'
  | 'Nillkin'
  | 'Spigen'
  | 'Mcdodo';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  title: string;
  titleEn: string;
  category: ProductCategory;
  brand: BrandName;
  compatibleModels: string[]; // e.g. ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max"]
  price: number; // in Tomans
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  colors?: ProductColor[];
  features: string[];
  specs: Record<string, string>;
  warranty: string;
  inStock: boolean;
  stockCount: number;
  isSpecialOffer?: boolean;
  isBestSeller?: boolean;
  salesCount: number;
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id (productId + color + model)
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedModel?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  deliveryMethod: 'peyk' | 'pishtaz' | 'tipax';
}

export type PaymentGatewayType = 'shaparak_saman' | 'shaparak_mellat' | 'zarinpal';

export interface PaymentDetails {
  gateway: PaymentGatewayType;
  cardNumberMasked: string;
  bankName: string;
  rrn: string; // شماره مرجع
  traceNumber: string; // شماره پیگیری
  paidAt: string;
  status: 'success' | 'failed';
  errorMessage?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  trackingCode: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  shippingCost: number;
  finalAmount: number;
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  status: 'paid' | 'processing' | 'shipped' | 'delivered';
}

export interface DeviceModel {
  id: string;
  brand: 'Apple' | 'Samsung' | 'Xiaomi';
  name: string;
  slug: string;
  image?: string;
}

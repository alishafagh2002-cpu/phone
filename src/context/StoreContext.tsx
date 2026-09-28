import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ProductCategory } from '../types/store';
import { PRODUCTS_DATA, BundleDeal } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, model?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartOriginalTotal: number;
  cartDiscount: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Filters & State
  selectedDevice: string;
  setSelectedDevice: (device: string) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (category: ProductCategory | 'all') => void;
  selectedBrand: string | 'all';
  setSelectedBrand: (brand: string | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'popular' | 'cheapest' | 'expensive' | 'discount' | 'newest';
  setSortBy: (sort: 'popular' | 'cheapest' | 'expensive' | 'discount' | 'newest') => void;

  // Modals & Navigation
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  comparisonItems: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  
  // Checkout & Payment
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPaymentGatewayOpen: boolean;
  setIsPaymentGatewayOpen: (open: boolean) => void;
  currentOrderDraft: Partial<Order> | null;
  setCurrentOrderDraft: (order: Partial<Order> | null) => void;
  completedOrder: Order | null;
  setCompletedOrder: (order: Order | null) => void;
  ordersHistory: Order[];
  addCompletedOrder: (order: Order) => void;
  lookupModalOpen: boolean;
  setLookupModalOpen: (open: boolean) => void;

  // Coupon
  couponCode: string;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Bundle Actions
  addBundleToCart: (bundle: BundleDeal) => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS_DATA);
  
  // Load Cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('janebi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders history from localStorage
  const [ordersHistory, setOrdersHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('janebi_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter States
  const [selectedDevice, setSelectedDevice] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'cheapest' | 'expensive' | 'discount' | 'newest'>('popular');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [comparisonItems, setComparisonItems] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);
  const [currentOrderDraft, setCurrentOrderDraft] = useState<Partial<Order> | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [lookupModalOpen, setLookupModalOpen] = useState(false);

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('janebi_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('janebi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('janebi_orders', JSON.stringify(ordersHistory));
  }, [ordersHistory]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('janebi_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('janebi_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const addToCart = (product: Product, quantity = 1, color?: string, model?: string) => {
    const itemColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const itemModel = model || (product.compatibleModels.length > 0 ? product.compatibleModels[0] : undefined);
    const cartItemId = `${product.id}-${itemColor || 'none'}-${itemModel || 'none'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          selectedColor: itemColor,
          selectedModel: itemModel
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
  };

  const addBundleToCart = (bundle: BundleDeal) => {
    bundle.items.forEach(({ product }) => {
      // Apply bundle discount
      const discountedPrice = Math.round(product.price * (1 - bundle.bundleDiscountPercent / 100));
      const bundleProduct: Product = {
        ...product,
        price: discountedPrice,
        originalPrice: product.price,
        discountPercent: bundle.bundleDiscountPercent
      };
      addToCart(bundleProduct, 1, undefined, bundle.targetPhone);
    });
  };

  // Calculations
  const cartOriginalTotal = cart.reduce((sum, item) => {
    const original = item.product.originalPrice || item.product.price;
    return sum + original * item.quantity;
  }, 0);

  const rawCartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const couponDiscountAmount = Math.round(rawCartTotal * (couponDiscountPercent / 100));
  const cartTotal = Math.max(0, rawCartTotal - couponDiscountAmount);
  const cartDiscount = (cartOriginalTotal - rawCartTotal) + couponDiscountAmount;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'OFF20' || clean === 'JANEBI20') {
      setCouponCode(clean);
      setCouponDiscountPercent(20);
      return { success: true, message: 'کد تخفیف ۲۰ درصدی با موفقیت اعمال شد!' };
    }
    if (clean === 'NEWUSER' || clean === 'WELCOME') {
      setCouponCode(clean);
      setCouponDiscountPercent(15);
      return { success: true, message: 'کد تخفیف ۱۵ درصدی خوش‌آمدگویی اعمال شد!' };
    }
    if (clean === 'SHAPARAK10') {
      setCouponCode(clean);
      setCouponDiscountPercent(10);
      return { success: true, message: 'کد تخفیف ۱۰ درصدی درگاه شاپرک اعمال شد!' };
    }
    return { success: false, message: 'کد تخفیف وارد شده معتبر یا منقضی شده است.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
  };

  const toggleCompare = (product: Product) => {
    setComparisonItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('حداکثر ۴ محصول را می‌توانید به طور همزمان مقایسه کنید.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const clearCompare = () => setComparisonItems([]);

  const addCompletedOrder = (order: Order) => {
    setOrdersHistory(prev => [order, ...prev]);
    setCompletedOrder(order);
    clearCart();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartOriginalTotal,
        cartDiscount,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        selectedDevice,
        setSelectedDevice,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        quickViewProduct,
        setQuickViewProduct,
        comparisonItems,
        toggleCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPaymentGatewayOpen,
        setIsPaymentGatewayOpen,
        currentOrderDraft,
        setCurrentOrderDraft,
        completedOrder,
        setCompletedOrder,
        ordersHistory,
        addCompletedOrder,
        lookupModalOpen,
        setLookupModalOpen,
        couponCode,
        couponDiscountPercent,
        applyCoupon,
        removeCoupon,
        addBundleToCart,
        isDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

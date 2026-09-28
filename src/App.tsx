import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategorySlider } from './components/home/CategorySlider';
import { DeviceFilterBar } from './components/home/DeviceFilterBar';
import { BundleBuilder } from './components/home/BundleBuilder';
import { ProductGrid } from './components/products/ProductGrid';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { ProductComparisonModal } from './components/products/ProductComparisonModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { PaymentGatewayModal } from './components/payment/PaymentGatewayModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { OrderLookupModal } from './components/orders/OrderLookupModal';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Storefront Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
          {/* Hero Promotional Banner with Flash Countdown */}
          <HeroBanner />

          {/* Device Model Selector Bar */}
          <DeviceFilterBar />

          {/* Category Pills & Brand Filter */}
          <CategorySlider />

          {/* 3-in-1 Discounted Bundle Deals */}
          <BundleBuilder />

          {/* Main Products Grid with Live Search & Sorting */}
          <ProductGrid />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Interactive Modals and Drawers */}
        <CartDrawer />
        <ProductDetailModal />
        <ProductComparisonModal />
        <CheckoutModal />
        <PaymentGatewayModal />
        <OrderSuccessModal />
        <OrderLookupModal />
      </div>
    </StoreProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { NoveraAIChatPanel } from './components/NoveraAIChatPanel';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import {
  CategoriesPage,
  CartPage,
  WishlistPage,
  OrdersPage,
} from './pages/CommercePages';
import { InfoPolicyPage } from './pages/InfoPolicyPages';

function RouterView() {
  const { currentPath } = useCommerce();

  if (currentPath === '/' || currentPath === '') {
    return <HomePage />;
  }
  if (currentPath === '/shop') {
    return <ShopPage />;
  }
  if (currentPath === '/categories') {
    return <CategoriesPage />;
  }
  if (currentPath.startsWith('/product/')) {
    const productId = currentPath.replace('/product/', '').trim();
    return <ProductDetailPage productId={productId} />;
  }
  if (currentPath === '/ai-assistant') {
    return <AIAssistantPage />;
  }
  if (currentPath === '/cart') {
    return <CartPage />;
  }
  if (currentPath === '/wishlist') {
    return <WishlistPage />;
  }
  if (currentPath === '/orders') {
    return <OrdersPage />;
  }
  if (currentPath === '/help') {
    return <InfoPolicyPage variant="help" />;
  }
  if (currentPath === '/shipping') {
    return <InfoPolicyPage variant="shipping" />;
  }
  if (currentPath === '/returns') {
    return <InfoPolicyPage variant="returns" />;
  }
  if (currentPath === '/about') {
    return <InfoPolicyPage variant="about" />;
  }
  if (currentPath === '/contact') {
    return <InfoPolicyPage variant="contact" />;
  }
  if (currentPath === '/privacy') {
    return <InfoPolicyPage variant="privacy" />;
  }
  if (currentPath === '/terms') {
    return <InfoPolicyPage variant="terms" />;
  }

  return <HomePage />;
}

function AppShell() {
  const { currentPath } = useCommerce();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-[#F8FAFC]">
      <Header />
      <main className="flex-1">
        <RouterView />
      </main>
      <Footer />
      <CartDrawer />
      {currentPath !== '/ai-assistant' && <NoveraAIChatPanel />}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CommerceProvider>
      <AppShell />
    </CommerceProvider>
  );
}

import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

import { CAFE_CONFIG } from './config/cafeConfig';
import { MENU_ITEMS } from './config/menuData';
import { generateWhatsAppLink } from './utils/whatsappHelper';

import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import FixedCartBar from './components/FixedCartBar';
import CartView from './components/CartView';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import ContactView from './components/ContactView';
import BottomNav from './components/BottomNav';

export default function App() {
  // 1. Table Number: Defaults directly to Table 01 (or reads ?table= from URL)
  const [currentTable] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tableParam = urlParams.get('table');
      if (tableParam) {
        return tableParam.trim().padStart(2, '0');
      }
    } catch (e) {
      console.warn('URL parsing error:', e);
    }
    return CAFE_CONFIG.defaultTable || '01';
  });

  // 2. Active Screen State: directly opens the Home Page!
  const [activeView, setActiveView] = useState('home');

  // 3. Category & Search Filters
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 4. Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('brew_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // 5. Modals & Notifications
  const [specialNote, setSpecialNote] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const menuScrollRef = useRef(null);

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('brew_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const cartGst = useMemo(() => {
    return Math.round((cartSubtotal * CAFE_CONFIG.taxPercentage) / 100);
  }, [cartSubtotal]);

  const cartTotal = cartSubtotal + cartGst;

  // Cart Actions
  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to cart`);
  };

  const handleIncrement = (itemId) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemove = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    if (window.confirm('Do you want to clear your cart?')) {
      setCartItems([]);
      showToast('Cart cleared');
    }
  };

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Open Order Confirmation Modal
  const handleInitiateOrder = () => {
    setIsOrderModalOpen(true);
  };

  // Confirm and Open WhatsApp
  const handleConfirmAndSendWhatsApp = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    const link = generateWhatsAppLink({
      items: cartItems,
      total: cartTotal,
      tableNumber: currentTable,
      specialNote: specialNote
    });

    setIsOrderModalOpen(false);

    // Open WhatsApp in new tab
    window.open(link, '_blank');

    showToast('Opening WhatsApp... Please tap Send to place order!');
  };

  const scrollToMenu = () => {
    setActiveView('menu');
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="toast-notice">
          <Sparkles size={16} color="#E09F67" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header with Table Number on Nav Bar (No dropdown) */}
      {activeView !== 'cart' && (
        <Header
          currentTable={currentTable}
          cartCount={cartCount}
          onOpenCart={() => setActiveView('cart')}
          onGoHome={() => setActiveView('home')}
        />
      )}

      {/* Scrollable Content Area */}
      <main className="scroll-content">
        {/* VIEW: HOME & MENU */}
        {(activeView === 'home' || activeView === 'menu') && (
          <div>
            {/* Table Context Banner: Clean Indicator (No Dropdown) */}
            <div className="table-context-banner">
              <div className="table-context-left">
                <UtensilsCrossed size={14} color="#613C27" />
                <span>
                  Ordering from <strong style={{ color: '#2B1810', marginLeft: '2px' }}>Table {currentTable}</strong>
                </span>
              </div>
            </div>

            {/* Hero Banner on Home View */}
            {activeView === 'home' && (
              <HeroBanner onExploreMenu={scrollToMenu} />
            )}

            {/* Sticky / Scroll Section Header */}
            <div ref={menuScrollRef}>
              <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {/* Menu Items Grid */}
            {filteredItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 16px', color: '#886E5E' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>
                  No matching items found
                </p>
                <p style={{ fontSize: '0.8rem' }}>
                  Try a different search term or category.
                </p>
              </div>
            ) : (
              <div className="menu-grid">
                {filteredItems.map((item) => {
                  const cartEntry = cartItems.find((i) => i.id === item.id);
                  const qty = cartEntry ? cartEntry.quantity : 0;
                  return (
                    <ProductCard
                      key={item.id}
                      item={item}
                      quantityInCart={qty}
                      onAdd={handleAddToCart}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                      onRemove={handleRemove}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VIEW: CART (Preserves Table 01 throughout checkout, no dropdown) */}
        {activeView === 'cart' && (
          <CartView
            cartItems={cartItems}
            currentTable={currentTable}
            specialNote={specialNote}
            setSpecialNote={setSpecialNote}
            onBack={() => setActiveView('home')}
            onClearCart={handleClearCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            onPlaceOrder={handleInitiateOrder}
          />
        )}

        {/* VIEW: CONTACT */}
        {activeView === 'contact' && (
          <ContactView onOpenAdmin={() => {}} />
        )}
      </main>

      {/* Fixed Bottom Cart Bar (when items in cart and viewing Home/Menu) */}
      {(activeView === 'home' || activeView === 'menu') && (
        <FixedCartBar
          count={cartCount}
          total={cartTotal}
          onOpenCart={() => setActiveView('cart')}
        />
      )}

      {/* Bottom Navigation: Home, Menu, Cart, Contact */}
      <BottomNav
        activeView={activeView}
        onViewChange={setActiveView}
        cartCount={cartCount}
      />

      {/* Order Confirmation Modal */}
      {isOrderModalOpen && (
        <OrderConfirmationModal
          cartItems={cartItems}
          total={cartTotal}
          tableNumber={currentTable}
          specialNote={specialNote}
          onClose={() => setIsOrderModalOpen(false)}
          onConfirmWhatsApp={handleConfirmAndSendWhatsApp}
        />
      )}
    </div>
  );
}

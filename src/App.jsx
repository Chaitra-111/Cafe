import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { UtensilsCrossed, Sparkles, QrCode } from 'lucide-react';

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
import TableQRModal from './components/TableQRModal';

export default function App() {
  // 1. Table Number: Identified from URL ?table=01 or ?table=02, defaults to '01'
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

  // 4. Cart State with Per-Table Isolation & Fresh Scan Detection
  const [cartItems, setCartItems] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const isFreshScan = urlParams.get('fresh') === '1' || urlParams.get('fresh') === 'true';
      const tableParam = urlParams.get('table') 
        ? urlParams.get('table').trim().padStart(2, '0') 
        : (CAFE_CONFIG.defaultTable || '01');

      const storageKey = `brew_cart_table_${tableParam}`;

      // When scanned as a fresh customer, initialize completely empty
      if (isFreshScan) {
        localStorage.removeItem(storageKey);
        return [];
      }

      const savedCart = localStorage.getItem(storageKey);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // 5. Special Notes & Modals
  const [specialNote, setSpecialNote] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const menuScrollRef = useRef(null);

  // Sync cart strictly to this specific table's storage
  useEffect(() => {
    try {
      const storageKey = `brew_cart_table_${currentTable}`;
      if (cartItems.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(cartItems));
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems, currentTable]);

  // Clean the ?fresh=1 URL parameter silently so normal refreshes during browsing retain added items
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('fresh')) {
        url.searchParams.delete('fresh');
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
  }, []);

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
      localStorage.removeItem(`brew_cart_table_${currentTable}`);
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

  // Confirm and Place Order on WhatsApp
  // Requirement: Cart must be completely cleared when place order is clicked!
  const handleConfirmAndSendWhatsApp = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {}

    const link = generateWhatsAppLink({
      items: cartItems,
      total: cartTotal,
      tableNumber: currentTable,
      specialNote: specialNote
    });

    // 1. Immediately clear the cart and special notes for this table
    setCartItems([]);
    setSpecialNote('');
    localStorage.removeItem(`brew_cart_table_${currentTable}`);

    // 2. Close modal and return to fresh Home page
    setIsOrderModalOpen(false);
    setActiveView('home');

    // 3. Open WhatsApp in new tab
    window.open(link, '_blank');

    showToast(`Order sent to WhatsApp! Cart for Table ${currentTable} is now cleared.`);
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

      {/* Main Header with Table Number Badge (No dropdown) */}
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
              <button 
                onClick={() => setIsQRModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#C78248',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
                title="View Table 1 & Table 2 QR Codes"
              >
                <QrCode size={13} />
                <span>Table QRs</span>
              </button>
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

        {/* VIEW: CART (Preserves Table number throughout checkout, no dropdown) */}
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
          <ContactView onOpenAdmin={() => setIsQRModalOpen(true)} />
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

      {/* Table 1 & Table 2 QR Stands Modal */}
      {isQRModalOpen && (
        <TableQRModal onClose={() => setIsQRModalOpen(false)} />
      )}
    </div>
  );
}

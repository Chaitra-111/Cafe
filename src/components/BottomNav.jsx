import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, PhoneCall } from 'lucide-react';

export default function BottomNav({ activeView, onViewChange, cartCount }) {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item-btn ${activeView === 'home' ? 'active' : ''}`}
        onClick={() => onViewChange('home')}
      >
        <Home size={20} strokeWidth={activeView === 'home' ? 2.5 : 2} />
        <span>Home</span>
      </button>

      <button 
        className={`nav-item-btn ${activeView === 'menu' ? 'active' : ''}`}
        onClick={() => onViewChange('menu')}
      >
        <UtensilsCrossed size={20} strokeWidth={activeView === 'menu' ? 2.5 : 2} />
        <span>Menu</span>
      </button>

      <button 
        className={`nav-item-btn ${activeView === 'cart' ? 'active' : ''}`}
        onClick={() => onViewChange('cart')}
      >
        <ShoppingBag size={20} strokeWidth={activeView === 'cart' ? 2.5 : 2} />
        {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
        <span>Cart</span>
      </button>

      <button 
        className={`nav-item-btn ${activeView === 'contact' ? 'active' : ''}`}
        onClick={() => onViewChange('contact')}
      >
        <PhoneCall size={20} strokeWidth={activeView === 'contact' ? 2.5 : 2} />
        <span>Contact</span>
      </button>
    </nav>
  );
}

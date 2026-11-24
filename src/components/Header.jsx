import React from 'react';
import { Coffee, ShoppingBag, MapPin } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function Header({ currentTable, cartCount, onOpenCart, onGoHome }) {
  // Format table nicely e.g. "01" -> "Table 01"
  const formattedTable = `Table ${currentTable}`;

  return (
    <header className="cafe-header">
      <div className="cafe-brand" onClick={onGoHome}>
        <div className="cafe-logo-badge">
          <Coffee size={20} strokeWidth={2.2} />
        </div>
        <div className="cafe-brand-text">
          <h1>{CAFE_CONFIG.shortName}</h1>
          <span>Café</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Fixed Table Indicator on Nav Bar (No Dropdown) */}
        <div className="table-nav-badge" title={`Ordering from ${formattedTable}`}>
          <MapPin size={12} color="#DF9B63" />
          <span>{formattedTable}</span>
        </div>

        <button 
          className="cart-icon-btn" 
          onClick={onOpenCart}
          aria-label="View Shopping Cart"
        >
          <ShoppingBag size={19} />
          {cartCount > 0 && (
            <span className="cart-badge-count">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

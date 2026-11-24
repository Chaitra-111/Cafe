import React from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  ShoppingBag, 
  MapPin, 
  Edit2, 
  Plus, 
  Minus, 
  Coffee, 
  MessageSquare, 
  Check, 
  UtensilsCrossed 
} from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function CartView({ 
  cartItems, 
  currentTable, 
  specialNote, 
  setSpecialNote, 
  onBack, 
  onClearCart, 
  onIncrement, 
  onDecrement, 
  onRemove, 
  onOpenTableSelector, 
  onPlaceOrder 
}) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gstAmount = Math.round((subtotal * CAFE_CONFIG.taxPercentage) / 100);
  const grandTotal = subtotal + gstAmount;

  if (cartItems.length === 0) {
    return (
      <div className="cart-view-container">
        <header className="cart-screen-header">
          <button className="header-back-btn" onClick={onBack} aria-label="Go Back">
            <ArrowLeft size={18} />
          </button>
          <div className="cafe-brand" onClick={onBack}>
            <div className="cafe-logo-badge" style={{ width: 30, height: 30 }}>
              <Coffee size={16} />
            </div>
            <div className="cafe-brand-text">
              <h1 style={{ fontSize: '1rem' }}>{CAFE_CONFIG.shortName}</h1>
            </div>
          </div>
          <div style={{ width: 36 }} />
        </header>

        <div className="empty-cart-state">
          <div className="empty-cart-icon">
            <ShoppingBag size={40} />
          </div>
          <h2 className="empty-cart-title">Your Cart is Empty</h2>
          <p className="empty-cart-sub">Looks like you haven't added any delicious food or coffee yet.</p>
          <button className="explore-menu-btn" onClick={onBack}>
            Explore Delicious Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-view-container">
      {/* Header */}
      <header className="cart-screen-header">
        <button className="header-back-btn" onClick={onBack} title="Back to menu">
          <ArrowLeft size={18} />
        </button>

        <div className="cafe-brand" onClick={onBack}>
          <div className="cafe-logo-badge" style={{ width: 32, height: 32 }}>
            <Coffee size={17} />
          </div>
          <div className="cafe-brand-text">
            <h1 style={{ fontSize: '1.05rem' }}>{CAFE_CONFIG.shortName}</h1>
            <span style={{ fontSize: '0.75rem' }}>Café</span>
          </div>
        </div>

        <button 
          className="header-trash-btn" 
          onClick={onClearCart} 
          title="Clear all items in cart"
        >
          <Trash2 size={17} />
        </button>
      </header>

      {/* Cart Title & Subtitle */}
      <div className="cart-title-block">
        <div className="cart-title-row">
          <ShoppingBag size={22} color="#3D2314" />
          <span>Your Cart</span>
        </div>
        <p className="cart-subtitle">Review your order before placing it</p>
      </div>

      {/* Table Number Card (Matching Reference #2) */}
      <div className="cart-table-card">
        <div className="cart-table-info">
          <UtensilsCrossed size={18} color="#4A2E1F" />
          <span>Ordering from Table {currentTable}</span>
        </div>
      </div>

      {/* Items List */}
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-card">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            
            <div className="cart-item-details">
              <h4 className="cart-item-title">{item.name}</h4>
              <p className="cart-item-desc">{item.shortDesc || item.description}</p>
              <div className="cart-item-price">
                {CAFE_CONFIG.currencySymbol}{item.price * item.quantity}
              </div>
            </div>

            <div className="cart-item-controls">
              <div className="cart-stepper">
                <button 
                  className="cart-step-btn" 
                  onClick={() => onDecrement(item.id)}
                  title="Decrease"
                >
                  <Minus size={13} />
                </button>
                <span className="cart-step-qty">{item.quantity}</span>
                <button 
                  className="cart-step-btn add" 
                  onClick={() => onIncrement(item.id)}
                  title="Increase"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button 
                className="cart-remove-btn" 
                onClick={() => onRemove(item.id)}
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Special Cooking Note / Request */}
      <div className="special-note-box">
        <label>
          <MessageSquare size={13} />
          <span>Add Cooking Request or Dietary Notes</span>
        </label>
        <textarea
          rows={2}
          className="special-note-input"
          placeholder="e.g. Less sugar, extra hot, no onions, extra napkins..."
          value={specialNote}
          onChange={(e) => setSpecialNote(e.target.value)}
        />
      </div>

      {/* Bill Summary */}
      <div className="bill-summary-card">
        <div className="bill-row">
          <span>Subtotal</span>
          <span>{CAFE_CONFIG.currencySymbol}{subtotal}</span>
        </div>
        <div className="bill-row">
          <span>{CAFE_CONFIG.taxLabel}</span>
          <span>{CAFE_CONFIG.currencySymbol}{gstAmount}</span>
        </div>
        <div className="bill-row total-row">
          <span>Total</span>
          <span>{CAFE_CONFIG.currencySymbol}{grandTotal}</span>
        </div>
      </div>

      {/* Payment Method Badge */}
      <div className="payment-method-badge">
        <Coffee size={16} />
        <span>{CAFE_CONFIG.paymentNotice}</span>
      </div>

      {/* WhatsApp Primary Order Button (Matching Reference #2) */}
      <button 
        className="whatsapp-order-btn" 
        onClick={() => onPlaceOrder(grandTotal)}
      >
        <Check size={19} strokeWidth={3} />
        <span>Place Order on WhatsApp</span>
      </button>

      {/* WhatsApp Helper Notice Card (Matching Reference #2) */}
      <div className="whatsapp-notice-card">
        <div className="whatsapp-green-circle">
          <MessageSquare size={16} />
        </div>
        <div className="whatsapp-notice-text">
          <strong>Direct WhatsApp Order:</strong> Your order details will be prepared and shared with our restaurant counter on WhatsApp.
        </div>
      </div>
    </div>
  );
}

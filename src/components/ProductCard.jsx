import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function ProductCard({ item, quantityInCart, onAdd, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={item.image} 
          alt={item.name} 
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/assets/cappuccino.jpg';
          }}
        />
        {item.badge && (
          <span className="product-badge-pill">{item.badge}</span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{item.name}</h3>
        <p className="product-desc">{item.shortDesc || item.description}</p>
        <div className="product-price">
          {CAFE_CONFIG.currencySymbol}{item.price}
        </div>

        {quantityInCart > 0 ? (
          <div className="quantity-stepper">
            {quantityInCart === 1 ? (
              <button 
                className="stepper-btn trash" 
                onClick={() => onRemove(item.id)}
                title="Remove item"
              >
                <Trash2 size={14} />
              </button>
            ) : (
              <button 
                className="stepper-btn" 
                onClick={() => onDecrement(item.id)}
                title="Decrease quantity"
              >
                <Minus size={14} />
              </button>
            )}

            <span className="stepper-value">{quantityInCart}</span>

            <button 
              className="stepper-btn" 
              onClick={() => onIncrement(item.id)}
              title="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button 
            className="add-to-cart-btn" 
            onClick={() => onAdd(item)}
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}

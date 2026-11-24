import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function FixedCartBar({ count, total, onOpenCart }) {
  if (count === 0) return null;

  return (
    <div className="fixed-cart-bar" onClick={onOpenCart}>
      <div className="fixed-cart-bar-left">
        <ShoppingBag size={18} />
        <span>View Cart</span>
        <span className="fixed-cart-badge">{count} {count === 1 ? 'Item' : 'Items'}</span>
      </div>
      <div className="fixed-cart-bar-right">
        <span>{CAFE_CONFIG.currencySymbol}{total}</span>
        <ArrowRight size={18} />
      </div>
    </div>
  );
}

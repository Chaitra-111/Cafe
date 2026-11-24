import React from 'react';
import { X, MessageSquare, AlertCircle, CheckCircle2, Coffee, ShieldCheck } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function OrderConfirmationModal({ 
  cartItems, 
  total, 
  tableNumber, 
  specialNote, 
  onClose, 
  onConfirmWhatsApp 
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={22} color="#1EBE5D" />
            <h3 className="sheet-title">Order Summary</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Order Details Header */}
        <div style={{ 
          background: '#F9F1E8', 
          border: '1px solid #E6D5C3', 
          borderRadius: 14, 
          padding: '12px 16px', 
          marginBottom: 16 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.8rem', color: '#775E4F', fontWeight: 600 }}>Restaurant</span>
            <span style={{ fontSize: '0.85rem', color: '#2B1810', fontWeight: 700 }}>{CAFE_CONFIG.cafeName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', color: '#775E4F', fontWeight: 600 }}>Serving At</span>
            <span style={{ 
              fontSize: '0.85rem', 
              color: '#FFF', 
              background: '#3D2314', 
              padding: '1px 8px', 
              borderRadius: 6, 
              fontWeight: 800 
            }}>
              Table {tableNumber}
            </span>
          </div>
        </div>

        {/* Items List */}
        <div style={{ 
          maxHeight: '190px', 
          overflowY: 'auto', 
          marginBottom: 14,
          paddingRight: 4
        }}>
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #EFE4D6',
                fontSize: '0.88rem'
              }}
            >
              <div>
                <span style={{ fontWeight: 700, color: '#2A160C' }}>{item.quantity} × {item.name}</span>
                <div style={{ fontSize: '0.72rem', color: '#886E5E' }}>
                  {CAFE_CONFIG.currencySymbol}{item.price} each
                </div>
              </div>
              <span style={{ fontWeight: 800, color: '#2A160C', fontFamily: 'var(--font-serif)' }}>
                {CAFE_CONFIG.currencySymbol}{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Special Note if any */}
        {specialNote && specialNote.trim().length > 0 && (
          <div style={{ 
            background: '#FFF', 
            border: '1px dashed #D4C1AE', 
            borderRadius: 10, 
            padding: '8px 12px', 
            marginBottom: 14,
            fontSize: '0.78rem',
            color: '#55392A'
          }}>
            <strong>Special Note:</strong> "{specialNote.trim()}"
          </div>
        )}

        {/* Total & Payment Method */}
        <div style={{ 
          background: '#F4E8DC', 
          borderRadius: 12, 
          padding: '12px 16px', 
          marginBottom: 16 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, color: '#2B1810' }}>
              Total Payable
            </span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, color: '#2B1810' }}>
              {CAFE_CONFIG.currencySymbol}{total}
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6, 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: '#65422D' 
          }}>
            <Coffee size={14} />
            <span>Payment Method: {CAFE_CONFIG.paymentMethod}</span>
          </div>
        </div>

        {/* Mandatory WhatsApp Clarification Note */}
        <div style={{ 
          background: '#EAF8EE', 
          border: '1px solid #B5E8C4', 
          borderRadius: 12, 
          padding: '10px 14px', 
          marginBottom: 18,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start'
        }}>
          <AlertCircle size={18} color="#1EBE5D" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: '0.78rem', color: '#1B5E20', lineHeight: 1.4 }}>
            <strong>Important:</strong> Tapping confirm will open WhatsApp with your prefilled order addressed to the cafe owner (<code>{CAFE_CONFIG.displayWhatsApp}</code>). 
            <strong> You must tap the "Send" button in WhatsApp to place the order.</strong>
          </div>
        </div>

        {/* Confirm and Open WhatsApp Button */}
        <button 
          className="whatsapp-order-btn" 
          style={{ 
            width: '100%', 
            margin: '0 0 10px 0', 
            background: '#25D366', 
            color: '#FFF',
            boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)' 
          }}
          onClick={onConfirmWhatsApp}
        >
          <MessageSquare size={19} />
          <span>Confirm & Open WhatsApp</span>
        </button>

        <button 
          style={{ 
            width: '100%', 
            background: 'none', 
            border: 'none', 
            color: '#7C6758', 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            padding: '8px', 
            cursor: 'pointer' 
          }}
          onClick={onClose}
        >
          Modify Order Items
        </button>
      </div>
    </div>
  );
}

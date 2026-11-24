import React, { useState } from 'react';
import { QrCode, Coffee, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function NoTableModal({ onSelectTable, onOpenAdmin }) {
  const [showManualSelect, setShowManualSelect] = useState(false);

  return (
    <div className="modal-overlay" style={{ zIndex: 100 }}>
      <div 
        className="modal-sheet" 
        style={{ 
          maxWidth: '420px', 
          borderRadius: '24px', 
          margin: 'auto 16px', 
          padding: '28px 22px 24px 22px',
          textAlign: 'center' 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3D2314 0%, #2A160C 100%)',
          color: '#F4E5D4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: '0 8px 20px rgba(42, 22, 12, 0.25)'
        }}>
          <QrCode size={34} strokeWidth={2.2} color="#DF9B63" />
        </div>

        <h3 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '1.4rem', 
          fontWeight: 700, 
          color: '#2A160C',
          marginBottom: 8 
        }}>
          Welcome to {CAFE_CONFIG.shortName}!
        </h3>

        <div style={{ 
          background: '#F9F1E7', 
          border: '1px solid #EADBCC', 
          borderRadius: '16px', 
          padding: '16px', 
          marginBottom: 20 
        }}>
          <p style={{ fontSize: '0.9rem', color: '#4A3327', lineHeight: 1.5, fontWeight: 600 }}>
            Please scan the QR code located on your table to view our menu and place your order.
          </p>
          <p style={{ fontSize: '0.78rem', color: '#856C5D', marginTop: 8, lineHeight: 1.4 }}>
            Each restaurant table has a unique QR stand that automatically connects your order to your table number.
          </p>
        </div>

        {!showManualSelect ? (
          <div>
            <button
              className="whatsapp-order-btn"
              style={{ width: '100%', margin: '0 0 12px 0', background: '#3D2314' }}
              onClick={() => setShowManualSelect(true)}
            >
              <MapPin size={16} />
              <span>Already at a Table? Select Table</span>
            </button>

            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#8A7060',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '8px'
              }}
              onClick={onOpenAdmin}
            >
              <span>Café Staff / Owner? Print Table QR Stands</span>
              <ChevronRight size={13} />
            </button>
          </div>
        ) : (
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 10 
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3D2314' }}>
                Select Your Seated Table:
              </span>
              <button 
                onClick={() => setShowManualSelect(false)}
                style={{ background: 'none', border: 'none', color: '#C78248', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Back
              </button>
            </div>

            <div className="tables-grid" style={{ marginBottom: 14 }}>
              {CAFE_CONFIG.availableTables.map((tbl) => (
                <button
                  key={tbl}
                  className="table-select-tile"
                  onClick={() => onSelectTable(tbl)}
                >
                  <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>Table</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>{tbl}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

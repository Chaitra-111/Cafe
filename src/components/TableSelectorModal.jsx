import React from 'react';
import { X, Check, MapPin } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function TableSelectorModal({ currentTable, onSelectTable, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={20} color="#3D2314" />
            <h3 className="sheet-title">Select Your Table</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: '#7A6253', marginBottom: 16 }}>
          Normally detected automatically from the QR code on your table. You can switch your table here anytime.
        </p>

        <div className="tables-grid">
          {CAFE_CONFIG.availableTables.map((tbl) => {
            const isCurrent = currentTable === tbl;
            return (
              <button
                key={tbl}
                className={`table-select-tile ${isCurrent ? 'active' : ''}`}
                onClick={() => {
                  onSelectTable(tbl);
                  onClose();
                }}
              >
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Table</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{tbl}</div>
                {isCurrent && (
                  <div style={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button 
          className="whatsapp-order-btn" 
          style={{ width: '100%', margin: '0' }}
          onClick={onClose}
        >
          Confirm Table {currentTable}
        </button>
      </div>
    </div>
  );
}

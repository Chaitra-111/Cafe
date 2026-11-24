import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Download, ExternalLink, QrCode, Sparkles, Coffee } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function TableQRModal({ onClose }) {
  const [selectedTable, setSelectedTable] = useState('01');
  const [hostIp] = useState(() => {
    if (typeof window !== 'undefined') {
      // If running on localhost, use local network IP 192.168.0.103 so phones can scan!
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return '192.168.0.103:3000';
      }
      return window.location.host;
    }
    return '192.168.0.103:3000';
  });

  const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
  const targetUrl = `${protocol}//${hostIp}/?table=${selectedTable}&fresh=1`;

  // Download high-resolution PNG for printing table stand
  const handleDownload = () => {
    const canvas = document.getElementById(`qr-table-${selectedTable}`);
    if (!canvas) return;

    const printCanvas = document.createElement('canvas');
    printCanvas.width = 650;
    printCanvas.height = 880;
    const ctx = printCanvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FAF4EB';
    ctx.fillRect(0, 0, 650, 880);

    // Border
    ctx.strokeStyle = '#2B1810';
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, 610, 840);

    // Top Header Banner
    ctx.fillStyle = '#2B1810';
    ctx.fillRect(26, 26, 598, 140);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 38px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Brew & Bites Café', 325, 85);

    ctx.fillStyle = '#DF9B63';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText('Scan with Phone to Order', 325, 125);

    // Table Badge
    ctx.fillStyle = '#C78248';
    ctx.beginPath();
    ctx.roundRect(185, 195, 280, 60, [14]);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(`TABLE ${selectedTable}`, 325, 238);

    // Draw QR Code
    ctx.drawImage(canvas, 160, 280, 330, 330);

    // Bottom Instructions
    ctx.fillStyle = '#2B1810';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('1. Scan QR with your phone camera', 325, 660);
    ctx.fillText('2. Browse menu & add to cart', 325, 698);
    ctx.fillText('3. Place order directly on WhatsApp', 325, 736);

    ctx.fillStyle = '#856D5E';
    ctx.font = '14px monospace';
    ctx.fillText(targetUrl, 325, 790);

    // Trigger download
    const link = document.createElement('a');
    link.download = `BrewAndBites_Table_${selectedTable}_QR.png`;
    link.href = printCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 100 }}>
      <div 
        className="modal-sheet" 
        style={{ maxWidth: '420px', borderRadius: '24px 24px 0 0', padding: '22px 20px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <QrCode size={22} color="#C78248" />
            <h3 className="sheet-title" style={{ fontSize: '1.2rem' }}>Table QR Stands</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#725A4B', marginBottom: 14 }}>
          Each table has its own QR stand. When scanned, it opens a fresh home page for that table with an empty cart.
        </p>

        {/* Table Selector Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {['01', '02'].map((tbl) => {
            const isActive = selectedTable === tbl;
            return (
              <button
                key={tbl}
                onClick={() => setSelectedTable(tbl)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 14,
                  border: isActive ? '2px solid #2B1810' : '1px solid #DFC9B4',
                  background: isActive ? '#2B1810' : '#FFF',
                  color: isActive ? '#FFF' : '#3E2415',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <Coffee size={16} color={isActive ? '#DF9B63' : '#C78248'} />
                <span>Table {tbl}</span>
              </button>
            );
          })}
        </div>

        {/* QR Code Printable Preview */}
        <div className="qr-card-printable" style={{ padding: '16px', margin: '0 0 16px 0' }}>
          <div className="qr-table-tag" style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>
            TABLE {selectedTable} STAND
          </div>

          <div className="qr-svg-wrap" style={{ margin: '0 auto 10px auto', width: 200, height: 200, padding: 8 }}>
            <QRCodeCanvas
              id={`qr-table-${selectedTable}`}
              value={targetUrl}
              size={184}
              level="H"
              includeMargin={true}
              bgColor="#FFF9F3"
              fgColor="#2B1810"
            />
          </div>

          <div className="qr-target-url" style={{ fontSize: '0.72rem', marginBottom: 12 }}>
            <strong>Scan URL:</strong> {targetUrl}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              className="qr-download-btn" 
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '10px' }}
              onClick={handleDownload}
            >
              <Download size={14} />
              <span>Download Stand PNG</span>
            </button>

            <button
              onClick={() => window.open(targetUrl, '_blank')}
              style={{
                background: '#F3E6D7',
                border: '1px solid #DFC8B3',
                color: '#3B2113',
                borderRadius: 9999,
                padding: '10px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Test scan in browser"
            >
              <ExternalLink size={14} />
              <span>Test</span>
            </button>
          </div>
        </div>

        {/* Helpful Tip */}
        <div style={{ 
          background: '#F6EEE4', 
          borderRadius: 12, 
          padding: '10px 14px', 
          fontSize: '0.75rem', 
          color: '#5C4436',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <Sparkles size={16} color="#C78248" style={{ flexShrink: 0 }} />
          <span>Scanning this QR automatically opens the fresh home page with an empty cart for the new diner.</span>
        </div>
      </div>
    </div>
  );
}

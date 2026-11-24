import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Download, ExternalLink, QrCode, Sparkles, Coffee, Globe, Wifi } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function TableQRModal({ onClose }) {
  const [selectedTable, setSelectedTable] = useState('01');
  const [urlMode, setUrlMode] = useState('web'); // 'web' | 'local'
  const [customWebDomain, setCustomWebDomain] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return `${window.location.origin}${window.location.pathname}`;
      }
    }
    return 'https://chaitra-111.github.io/Cafe/';
  });

  const localWifiUrl = `http://192.168.0.103:3000/?table=${selectedTable}&fresh=1`;
  const cleanWeb = customWebDomain.endsWith('/') ? customWebDomain : `${customWebDomain}/`;
  const webTargetUrl = `${cleanWeb}?table=${selectedTable}&fresh=1`;

  const activeTargetUrl = urlMode === 'web' ? webTargetUrl : localWifiUrl;

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
    ctx.fillText(activeTargetUrl, 325, 790);

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
        style={{ maxWidth: '440px', borderRadius: '24px 24px 0 0', padding: '22px 20px', maxHeight: '90vh' }}
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

        {/* Table Selector Tabs (Table 1 vs Table 2) */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          {['01', '02'].map((tbl) => {
            const isActive = selectedTable === tbl;
            return (
              <button
                key={tbl}
                onClick={() => setSelectedTable(tbl)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 14,
                  border: isActive ? '2px solid #2B1810' : '1px solid #DFC9B4',
                  background: isActive ? '#2B1810' : '#FFF',
                  color: isActive ? '#FFF' : '#3E2415',
                  fontWeight: 800,
                  fontSize: '0.92rem',
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

        {/* URL Target Selector: Live Web vs Local Wi-Fi */}
        <div style={{ 
          display: 'flex', 
          background: '#EADBCC', 
          borderRadius: 10, 
          padding: 3, 
          marginBottom: 12 
        }}>
          <button
            onClick={() => setUrlMode('web')}
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: 8,
              border: 'none',
              background: urlMode === 'web' ? '#2B1810' : 'transparent',
              color: urlMode === 'web' ? '#FFF' : '#4C3325',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4
            }}
          >
            <Globe size={13} />
            <span>Live Website URL</span>
          </button>

          <button
            onClick={() => setUrlMode('local')}
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: 8,
              border: 'none',
              background: urlMode === 'local' ? '#2B1810' : 'transparent',
              color: urlMode === 'local' ? '#FFF' : '#4C3325',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4
            }}
          >
            <Wifi size={13} />
            <span>Local Wi-Fi (Testing)</span>
          </button>
        </div>

        {/* QR Code Printable Preview */}
        <div className="qr-card-printable" style={{ padding: '16px', margin: '0 0 14px 0' }}>
          <div className="qr-table-tag" style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>
            TABLE {selectedTable} · {urlMode === 'web' ? 'WEBSITE QR' : 'WI-FI TESTING QR'}
          </div>

          <div className="qr-svg-wrap" style={{ margin: '0 auto 8px auto', width: 190, height: 190, padding: 6 }}>
            <QRCodeCanvas
              id={`qr-table-${selectedTable}`}
              value={activeTargetUrl}
              size={178}
              level="H"
              includeMargin={true}
              bgColor="#FFF9F3"
              fgColor="#2B1810"
            />
          </div>

          <div className="qr-target-url" style={{ fontSize: '0.7rem', marginBottom: 10, wordBreak: 'break-all' }}>
            <strong>Scan URL:</strong> {activeTargetUrl}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              className="qr-download-btn" 
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', padding: '9px' }}
              onClick={handleDownload}
            >
              <Download size={14} />
              <span>Download Stand PNG</span>
            </button>

            <button
              onClick={() => window.open(activeTargetUrl, '_blank')}
              style={{
                background: '#F3E6D7',
                border: '1px solid #DFC8B3',
                color: '#3B2113',
                borderRadius: 9999,
                padding: '9px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Test scan in browser"
            >
              <ExternalLink size={13} />
              <span>Open Link</span>
            </button>
          </div>
        </div>

        {/* Editable Domain if needed */}
        {urlMode === 'web' && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4D3426', display: 'block', marginBottom: 4 }}>
              Website Base Domain (e.g. GitHub Pages / Vercel):
            </label>
            <input 
              type="text" 
              value={customWebDomain} 
              onChange={(e) => setCustomWebDomain(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
                fontSize: '0.75rem',
                borderRadius: 8,
                border: '1px solid #DFC9B4',
                background: '#FFF',
                color: '#2B1810',
                outline: 'none',
                fontFamily: 'monospace'
              }}
            />
          </div>
        )}

        {/* Helpful Tip */}
        <div style={{ 
          background: '#F6EEE4', 
          borderRadius: 12, 
          padding: '8px 12px', 
          fontSize: '0.72rem', 
          color: '#5C4436',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <Sparkles size={14} color="#C78248" style={{ flexShrink: 0 }} />
          <span>Scanning automatically clears any previous cart so each new diner starts fresh.</span>
        </div>
      </div>
    </div>
  );
}

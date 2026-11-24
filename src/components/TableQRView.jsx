import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, ExternalLink, QrCode, Coffee, Check, Sparkles } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function TableQRView({ currentTable, onSelectTable, onSwitchView }) {
  const [selectedQRTable, setSelectedQRTable] = useState(currentTable || '05');
  const [baseUrl, setBaseUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}`;
    }
    return 'https://brewandbites.cafe/';
  });

  const qrCanvasRef = useRef(null);

  // Compute exact URL for table
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}`;
  const tableUrl = `${cleanBase}?table=${selectedQRTable}`;

  // Download QR as PNG image
  const handleDownloadQR = () => {
    const canvas = document.getElementById(`qr-canvas-${selectedQRTable}`);
    if (!canvas) return;

    // Create a composite branded printable image
    const printCanvas = document.createElement('canvas');
    printCanvas.width = 600;
    printCanvas.height = 800;
    const ctx = printCanvas.getContext('2d');

    // Fill background
    ctx.fillStyle = '#FAF4EB';
    ctx.fillRect(0, 0, 600, 800);

    // Border
    ctx.strokeStyle = '#3D2314';
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, 560, 760);

    // Top Header Banner
    ctx.fillStyle = '#2B1810';
    ctx.fillRect(26, 26, 548, 140);

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Brew & Bites Café', 300, 80);

    ctx.fillStyle = '#DF9B63';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText('Scan to Order from Your Table', 300, 120);

    // Table Badge
    ctx.fillStyle = '#C78248';
    ctx.beginPath();
    ctx.roundRect(175, 195, 250, 60, [14]);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`TABLE ${selectedQRTable}`, 300, 237);

    // Draw QR from original canvas
    ctx.drawImage(canvas, 150, 290, 300, 300);

    // Bottom Instructions
    ctx.fillStyle = '#2B1810';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('1. Scan QR with your phone camera', 300, 640);
    ctx.fillText('2. Browse menu & add to cart', 300, 675);
    ctx.fillText('3. Order instantly via WhatsApp', 300, 710);

    // Download trigger
    const link = document.createElement('a');
    link.download = `BrewAndBites_Table_${selectedQRTable}_QR.png`;
    link.href = printCanvas.toDataURL('image/png');
    link.click();
  };

  const handleTestInApp = () => {
    onSelectTable(selectedQRTable);
    onSwitchView('menu');
  };

  return (
    <div className="qr-tab-content">
      {/* Top Header Card */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 8, 
          fontFamily: 'var(--font-serif)', 
          fontSize: '1.3rem', 
          fontWeight: 700, 
          color: '#2A160C' 
        }}>
          <QrCode size={22} color="#C78248" />
          <span>Restaurant Table QR Codes</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#776051', marginTop: 4 }}>
          Each restaurant table has a unique QR code. Customers scan on their phone to immediately view the menu for their table.
        </p>
      </div>

      {/* Table Selection Bar */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4B3122', display: 'block', marginBottom: 6 }}>
          Select Table to View / Download QR Code:
        </span>
        <div style={{ 
          display: 'flex', 
          gap: 6, 
          overflowX: 'auto', 
          paddingBottom: 6 
        }} className="no-scrollbar">
          {CAFE_CONFIG.availableTables.map((tbl) => {
            const isSelected = selectedQRTable === tbl;
            return (
              <button
                key={tbl}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: isSelected ? '1px solid #2B1810' : '1px solid #DECBB9',
                  background: isSelected ? '#2B1810' : '#FFF',
                  color: isSelected ? '#FFF' : '#4C3325',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedQRTable(tbl)}
              >
                Table {tbl}
              </button>
            );
          })}
        </div>
      </div>

      {/* QR Code Printable Card Preview */}
      <div className="qr-card-printable">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Coffee size={18} color="#C78248" />
          <h3 className="qr-card-title">{CAFE_CONFIG.cafeName}</h3>
        </div>
        
        <div className="qr-table-tag">
          TABLE {selectedQRTable}
        </div>

        <div className="qr-svg-wrap">
          <QRCodeCanvas
            id={`qr-canvas-${selectedQRTable}`}
            value={tableUrl}
            size={200}
            level="H"
            includeMargin={true}
            bgColor="#FFF9F3"
            fgColor="#2B1810"
          />
        </div>

        <div className="qr-target-url">
          <strong>Scanned Target:</strong> {tableUrl}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="qr-download-btn" onClick={handleDownloadQR}>
            <Download size={15} />
            <span>Download Table {selectedQRTable} QR</span>
          </button>

          <button 
            style={{
              background: '#2B1810',
              color: '#FFF',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}
            onClick={handleTestInApp}
            title="Switch to this table and browse menu"
          >
            <ExternalLink size={14} />
            <span>Test Table {selectedQRTable}</span>
          </button>
        </div>
      </div>

      {/* Deployment URL Configuration Guide */}
      <div style={{ 
        background: '#FFF', 
        border: '1px solid #E5D5C2', 
        borderRadius: 14, 
        padding: '14px 16px', 
        marginTop: 14 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <Sparkles size={16} color="#C78248" />
          <strong style={{ fontSize: '0.85rem', color: '#2B1810' }}>Configurable QR Base URL</strong>
        </div>
        <p style={{ fontSize: '0.78rem', color: '#705748', marginBottom: 10, lineHeight: 1.4 }}>
          When deploying to Netlify, Vercel, or custom domain, update the base URL below to generate production QR codes ready to print for physical tables:
        </p>
        <input 
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #D6C2AF',
            borderRadius: 8,
            fontSize: '0.82rem',
            fontFamily: 'monospace',
            color: '#2A160C',
            outline: 'none',
            background: '#FAF4EB'
          }}
        />
      </div>
    </div>
  );
}

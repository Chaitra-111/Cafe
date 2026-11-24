import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ArrowLeft, Download, Printer, ExternalLink, ShieldCheck, Sparkles, Coffee } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function AdminQRManager({ onExitAdmin }) {
  const [selectedTable, setSelectedTable] = useState('01');
  const [baseUrl, setBaseUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}`;
    }
    return 'https://brewandbites.cafe/';
  });

  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}`;
  const targetUrl = `${cleanBase}?table=${selectedTable}`;

  // Download high-resolution PNG for printing table stand
  const handleDownloadTableCard = (tbl) => {
    const tableId = tbl || selectedTable;
    const canvas = document.getElementById(`admin-qr-${tableId}`);
    if (!canvas) return;

    const printCanvas = document.createElement('canvas');
    printCanvas.width = 700;
    printCanvas.height = 950;
    const ctx = printCanvas.getContext('2d');

    // Premium Cream Background
    ctx.fillStyle = '#FAF4EB';
    ctx.fillRect(0, 0, 700, 950);

    // Outer Dark Border
    ctx.strokeStyle = '#2B1810';
    ctx.lineWidth = 14;
    ctx.strokeRect(25, 25, 650, 900);

    // Inner Subtle Gold Line
    ctx.strokeStyle = '#C78248';
    ctx.lineWidth = 3;
    ctx.strokeRect(38, 38, 624, 874);

    // Dark Espresso Header Band
    ctx.fillStyle = '#2B1810';
    ctx.fillRect(44, 44, 612, 160);

    // Header Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Brew & Bites Café', 350, 115);

    ctx.fillStyle = '#DF9B63';
    ctx.font = 'italic 22px Georgia, serif';
    ctx.fillText('Freshly Brewed · Delicious Bites', 350, 155);

    // Table Badge
    ctx.fillStyle = '#C78248';
    ctx.beginPath();
    ctx.roundRect(200, 230, 300, 70, [18]);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText(`TABLE ${tableId}`, 350, 278);

    // Draw QR Code
    ctx.drawImage(canvas, 175, 330, 350, 350);

    // Call to Action
    ctx.fillStyle = '#2B1810';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('Scan with Phone Camera', 350, 740);

    ctx.fillStyle = '#654B3B';
    ctx.font = '20px sans-serif';
    ctx.fillText('Browse Menu & Order Directly from Your Table', 350, 780);

    // Mini footer
    ctx.fillStyle = '#9C8576';
    ctx.font = '16px monospace';
    ctx.fillText(`${cleanBase}?table=${tableId}`, 350, 840);

    // Download trigger
    const link = document.createElement('a');
    link.download = `BrewAndBites_Table_${tableId}_QR_Stand.png`;
    link.href = printCanvas.toDataURL('image/png');
    link.click();
  };

  const handlePrintAll = () => {
    window.print();
  };

  const handleTestTable = (tbl) => {
    window.open(`${cleanBase}?table=${tbl}`, '_blank');
  };

  return (
    <div style={{ background: '#FAF4EB', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Top Header */}
      <header className="cart-screen-header">
        <button className="header-back-btn" onClick={onExitAdmin} title="Return to customer menu">
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldCheck size={20} color="#DF9B63" />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#FFF' }}>
            Owner QR Portal
          </h1>
        </div>
        <div style={{ width: 36 }} />
      </header>

      <div style={{ padding: '16px' }}>
        {/* Intro Banner */}
        <div style={{ 
          background: '#FFF', 
          border: '1px solid #E8D8C7', 
          borderRadius: 16, 
          padding: '16px', 
          marginBottom: 16 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Coffee size={18} color="#C78248" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#2B1810' }}>
              Physical Table QR Generator
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6A5142', lineHeight: 1.45 }}>
            These QR codes are meant to be printed and placed physically on restaurant tables (Tables 01–10).
            When customers scan a table QR code with their phone, it opens the menu directly with that table number automatically identified.
          </p>
        </div>

        {/* Base URL Configuration */}
        <div style={{ 
          background: '#F4E9DD', 
          border: '1px solid #DECBB9', 
          borderRadius: 14, 
          padding: '12px 14px', 
          marginBottom: 16 
        }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3D2314', display: 'block', marginBottom: 6 }}>
            🌐 Deployed Website URL (Used in QR Codes):
          </label>
          <input 
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #CDB8A5',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontFamily: 'monospace',
              color: '#2B1810',
              background: '#FFF',
              outline: 'none'
            }}
          />
          <span style={{ fontSize: '0.7rem', color: '#886E5E', marginTop: 4, display: 'block' }}>
            When live on Vercel or custom domain, enter the domain above before printing.
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button
            onClick={handlePrintAll}
            style={{
              flex: 1,
              background: '#2B1810',
              color: '#FFF',
              border: 'none',
              borderRadius: 12,
              padding: '12px 14px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            <Printer size={16} />
            <span>Print All 10 Tables</span>
          </button>
        </div>

        {/* Table Selector Pills */}
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#3D2314', display: 'block', marginBottom: 6 }}>
            Select Table to Preview & Download:
          </span>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6 }} className="no-scrollbar">
            {CAFE_CONFIG.availableTables.map((tbl) => {
              const isActive = selectedTable === tbl;
              return (
                <button
                  key={tbl}
                  onClick={() => setSelectedTable(tbl)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 20,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    border: isActive ? '1.5px solid #2B1810' : '1px solid #DFC9B4',
                    background: isActive ? '#2B1810' : '#FFF',
                    color: isActive ? '#FFF' : '#493021',
                    cursor: 'pointer'
                  }}
                >
                  Table {tbl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview of Current Selected Table Stand */}
        <div className="qr-card-printable" style={{ margin: '0 auto 20px auto', maxWidth: 360 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <Coffee size={18} color="#C78248" />
            <h3 className="qr-card-title">{CAFE_CONFIG.cafeName}</h3>
          </div>
          
          <div className="qr-table-tag" style={{ fontSize: '1rem', padding: '5px 18px' }}>
            TABLE {selectedTable}
          </div>

          <div className="qr-svg-wrap" style={{ margin: '0 auto 12px auto', width: 220, height: 220, padding: 10 }}>
            <QRCodeCanvas
              id={`admin-qr-${selectedTable}`}
              value={targetUrl}
              size={200}
              level="H"
              includeMargin={true}
              bgColor="#FFF9F3"
              fgColor="#2B1810"
            />
          </div>

          <div className="qr-target-url" style={{ marginBottom: 14 }}>
            <strong>Encoded Link:</strong> {targetUrl}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button 
              className="qr-download-btn" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => handleDownloadTableCard(selectedTable)}
            >
              <Download size={16} />
              <span>Download Table {selectedTable} Stand (PNG)</span>
            </button>

            <button
              onClick={() => handleTestTable(selectedTable)}
              style={{
                background: '#F3E6D7',
                border: '1px solid #DFC8B3',
                color: '#3B2113',
                borderRadius: 9999,
                padding: '10px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <ExternalLink size={14} />
              <span>Simulate Customer Scan (Table {selectedTable})</span>
            </button>
          </div>
        </div>

        {/* Hidden All Tables Canvas Render for Batch Print / Download */}
        <div style={{ display: 'none' }}>
          {CAFE_CONFIG.availableTables.map((tbl) => (
            <QRCodeCanvas
              key={tbl}
              id={`admin-qr-${tbl}`}
              value={`${cleanBase}?table=${tbl}`}
              size={240}
              level="H"
              includeMargin={true}
              bgColor="#FFF9F3"
              fgColor="#2B1810"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

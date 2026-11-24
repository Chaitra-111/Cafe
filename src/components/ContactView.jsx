import React from 'react';
import { Coffee, MapPin, Clock, Phone, MessageSquare, Wifi, Shield, ArrowRight } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function ContactView({ onOpenAdmin }) {
  const handleChatWithUs = () => {
    const phoneNumber = CAFE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hi ${CAFE_CONFIG.cafeName}, I have a question about my visit!`);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Header Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #2D170E 0%, #462516 100%)', 
        borderRadius: 20, 
        padding: '24px 20px', 
        color: '#FFF', 
        textAlign: 'center', 
        marginBottom: 16,
        boxShadow: '0 6px 18px rgba(45, 23, 14, 0.2)'
      }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto'
        }}>
          <Coffee size={24} color="#DF9B63" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700 }}>
          {CAFE_CONFIG.cafeName}
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#DF9B63', fontStyle: 'italic', marginTop: 2 }}>
          {CAFE_CONFIG.tagline}
        </p>
      </div>

      {/* Info Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {/* Address */}
        <div style={{ 
          background: '#FFF', 
          border: '1px solid #EADBCC', 
          borderRadius: 14, 
          padding: '14px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12 
        }}>
          <div style={{ 
            width: 38, 
            height: 38, 
            borderRadius: 10, 
            background: '#F6ECE0', 
            color: '#3D2314', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <MapPin size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#886E5E', fontWeight: 600 }}>Location</div>
            <div style={{ fontSize: '0.88rem', color: '#2B1810', fontWeight: 700 }}>{CAFE_CONFIG.address}</div>
          </div>
        </div>

        {/* Timings */}
        <div style={{ 
          background: '#FFF', 
          border: '1px solid #EADBCC', 
          borderRadius: 14, 
          padding: '14px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12 
        }}>
          <div style={{ 
            width: 38, 
            height: 38, 
            borderRadius: 10, 
            background: '#F6ECE0', 
            color: '#3D2314', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#886E5E', fontWeight: 600 }}>Café Hours</div>
            <div style={{ fontSize: '0.88rem', color: '#2B1810', fontWeight: 700 }}>{CAFE_CONFIG.timing}</div>
          </div>
        </div>

        {/* WhatsApp Helpline */}
        <div style={{ 
          background: '#FFF', 
          border: '1px solid #EADBCC', 
          borderRadius: 14, 
          padding: '14px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12 
        }}>
          <div style={{ 
            width: 38, 
            height: 38, 
            borderRadius: 10, 
            background: '#E8F8EE', 
            color: '#1EBE5D', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Phone size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', color: '#886E5E', fontWeight: 600 }}>Direct WhatsApp / Phone</div>
            <div style={{ fontSize: '0.88rem', color: '#2B1810', fontWeight: 700 }}>{CAFE_CONFIG.displayWhatsApp}</div>
          </div>
          <button 
            onClick={handleChatWithUs}
            style={{ 
              background: '#25D366', 
              color: '#FFF', 
              border: 'none', 
              borderRadius: 20, 
              padding: '6px 12px', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              cursor: 'pointer' 
            }}
          >
            Chat
          </button>
        </div>

        {/* Guest Wi-Fi */}
        <div style={{ 
          background: '#FFF', 
          border: '1px solid #EADBCC', 
          borderRadius: 14, 
          padding: '14px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12 
        }}>
          <div style={{ 
            width: 38, 
            height: 38, 
            borderRadius: 10, 
            background: '#F6ECE0', 
            color: '#3D2314', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Wifi size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#886E5E', fontWeight: 600 }}>Guest Wi-Fi</div>
            <div style={{ fontSize: '0.88rem', color: '#2B1810', fontWeight: 700 }}>BrewAndBites_5G (Free)</div>
          </div>
        </div>
      </div>

      {/* Friendly Café Footer */}
      <div style={{ 
        borderTop: '1px dashed #DAC4B1', 
        paddingTop: 16, 
        textAlign: 'center',
        color: '#8A7060',
        fontSize: '0.8rem'
      }}>
        <p style={{ fontStyle: 'italic', marginBottom: 4 }}>"Crafted with love and artisanal coffee beans."</p>
        <p style={{ fontWeight: 600, color: '#3D2314' }}>Brew & Bites Café · Table Ordering Service</p>
      </div>
    </div>
  );
}

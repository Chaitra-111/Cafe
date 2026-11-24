import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';

export default function HeroBanner({ onExploreMenu }) {
  return (
    <div className="hero-card">
      <div className="hero-content">
        <h2 className="hero-heading">
          Good Coffee.<br />
          Great Food.<br />
          <span className="highlight">Better Moments.</span>
        </h2>
        <p className="hero-sub">{CAFE_CONFIG.subtitle}</p>
        <button className="hero-cta" onClick={onExploreMenu}>
          Explore Menu <ArrowRight size={14} />
        </button>
      </div>

      <div className="hero-image-wrap">
        <img 
          src="/assets/hero-coffee.jpg" 
          alt="Flavored iced cold coffee mug with rich vanilla ice cream"
          className="hero-cup-img"
          loading="eager"
          onError={(e) => {
            // High-reliability fallback
            e.currentTarget.src = "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80";
          }}
        />
      </div>
    </div>
  );
}

import React from 'react';
import { CATEGORIES } from '../config/menuData';

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="categories-bar no-scrollbar">
      {CATEGORIES.map(cat => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            className={`category-pill ${isActive ? 'active' : 'inactive'}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

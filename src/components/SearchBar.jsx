import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-wrapper">
      <Search size={16} className="search-icon-left" />
      <input
        type="text"
        className="search-input"
        placeholder="Search coffee, burgers, bakery..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button 
          className="search-clear-btn" 
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

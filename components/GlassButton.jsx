'use client';

import React from 'react';
import './GlassButton.css';

function GlassButton({ items, className = '' }) {
  return (
    <div className={`glass-buttons-container ${className}`}>
      {items.map((item, index) => {
        const {
          icon,
          color = 'blue',
          label,
          onClick,
          customClass = ''
        } = item;

        return (
          <button
            key={index}
            onClick={onClick}
            className={`glass-button glass-button-${color} ${customClass}`}
            aria-label={label}
          >
            {icon && <span className="glass-button-icon">{icon}</span>}
            {label && <span className="glass-button-label">{label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default GlassButton;
'use client';
import React from 'react';

// Komponen ShinyText yang disederhanakan tanpa efek kilau
const ShinyText = ({ text, className = '' }) => {
  return (
    <div className={className}>
      {text}
    </div>
  );
};

export default ShinyText;
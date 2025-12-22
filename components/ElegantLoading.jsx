'use client';
import React from 'react';
import './ElegantLoading.css';

const ElegantLoading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">portfolio</span>
            <span className="word">projects</span>
            <span className="word">skills</span>
            <span className="word">about</span>
            <span className="word">portfolio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantLoading;
'use client';

import React from 'react';
import './TabLoader.css';

const TabLoader = () => {
  return (
    <div className="tab-loader-card">
      <div className="tab-loader">
        <p>loading</p>
        <div className="tab-loader-words">
          <span className="tab-loader-word">buttons</span>
          <span className="tab-loader-word">forms</span>
          <span className="tab-loader-word">switches</span>
          <span className="tab-loader-word">cards</span>
          <span className="tab-loader-word">buttons</span>
        </div>
      </div>
    </div>
  );
};

export default TabLoader;

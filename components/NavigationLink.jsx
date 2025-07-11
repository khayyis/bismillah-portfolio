'use client';

import React from 'react';
import Link from 'next/link';

/**
 * NavigationLink Component
 * 
 * A styled navigation link with hover effects
 */
const NavigationLink = ({ href, children, className = '' }) => {
  return (
    <Link href={href}>
      <div className={`navigation-link ${className}`}>
        {children}
        <style jsx>{`
          .navigation-link {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .navigation-link:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          
          @media (prefers-reduced-motion: reduce) {
            .navigation-link {
              transition: none;
            }
            
            .navigation-link:hover {
              transform: none;
              box-shadow: none;
            }
          }
        `}</style>
      </div>
    </Link>
  );
};

export default NavigationLink;
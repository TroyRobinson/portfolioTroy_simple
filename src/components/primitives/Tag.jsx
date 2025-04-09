import React from 'react';

/**
 * Tag component for displaying labels/categories
 */
export const Tag = ({ children, style = {} }) => (
  <span
    style={{
      backgroundColor: '#f0f0f0',
      color: '#333',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.8rem',
      display: 'inline-block',
      ...style
    }}
  >
    {children}
  </span>
); 
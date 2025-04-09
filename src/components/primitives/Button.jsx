import React from 'react';

/**
 * Primary button component with standardized styling
 * Used throughout the application for consistent UI
 */
export const Button = ({ children, onClick = () => {}, style = {}, ...props }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: 'auto',
        minWidth: '80px',
        height: 'auto',
        backgroundColor: '#e8e8e8',
        color: '#000',
        border: '1px solid #000',
        borderRadius: '0',
        padding: '4px 8px',
        cursor: 'pointer',
        fontWeight: 'normal',
        fontSize: '12px',
        fontFamily: 'Chicago, Monaco, monospace',
        boxShadow: '1px 1px 0px #000',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

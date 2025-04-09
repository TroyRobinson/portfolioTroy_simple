import React from 'react';

export const Button = ({ children, onClick, style, type, ...props }) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      style={{
        width: 'auto',
        minWidth: '120px',
        height: '40px',
        backgroundColor: '#2b6cb0',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

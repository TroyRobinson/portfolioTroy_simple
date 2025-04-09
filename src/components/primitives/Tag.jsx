import React from 'react';

/**
 * Tag component for displaying labels, technologies, etc.
 */
export const Tag = ({ children, style = {}, ...props }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '2px 4px',
        backgroundColor: '#fff',
        border: '1px solid #000',
        color: '#000',
        fontSize: '10px',
        fontFamily: 'Chicago, Monaco, monospace',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
} 
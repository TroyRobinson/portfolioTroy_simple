import React from 'react'

/**
 * Simple spinner component for loading states
 */
const Spinner = () => (
  <div
    style={{
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTopColor: '#333',
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '8px',
      verticalAlign: 'middle',
    }}
  >
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

export default Spinner 
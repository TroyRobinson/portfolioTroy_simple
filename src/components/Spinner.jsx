import React from 'react'

/**
 * Simple spinner component for loading states
 */
const Spinner = () => (
  <div
    style={{
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid #000',
      borderRadius: '0',
      animation: 'spin 1s steps(4) infinite',
      marginRight: '4px',
      verticalAlign: 'middle',
      backgroundColor: '#e8e8e8',
    }}
  >
    <style>{`
      @keyframes spin {
        0% { background-color: #000; }
        50% { background-color: #e8e8e8; }
        100% { background-color: #000; }
      }
    `}</style>
  </div>
)

export default Spinner 
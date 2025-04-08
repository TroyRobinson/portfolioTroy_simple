import React from 'react'

/**
 * Common header component used across all pages
 * @param {Object} props - Component props
 * @param {string} props.title - Page title to display
 * @param {Object} [props.style] - Additional styles (optional)
 * @minWidth 700px - Ensures component renders properly across environments
 */
export const Header = ({
  title = 'Portfolio',
  style = {},
}) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      minWidth: '700px',
      margin: '0 auto',
      padding: '0 16px',
      ...style
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        padding: '32px 0',
        border: '0'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          padding: '0 0 8px 0',
          color: 'rgb(255, 0, 0)',
          display: 'block'
        }}>
          Simple Portfolio
        </h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.2',
          padding: '0',
          color: '#666',
          display: 'block'
        }}>
          A minimal demo project
        </p>
      </div>
      
      <div style={{
        height: '1px',
        width: '100%',
        backgroundColor: '#e0e0e0',
        padding: '16px 0 0 0',
        display: 'block'
      }} />
      
      {title && (
        <div style={{
          padding: '16px 0'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            lineHeight: '1.2',
            color: '#333',
            display: 'block'
          }}>
            {title}
          </h2>
        </div>
      )}
    </div>
  )
}

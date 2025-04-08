import React from 'react'
import { FlexCol } from '../utils.jsx'

/**
 * Common header component used across all pages
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {Object} [props.style] - Additional styles (optional)
 */
export const Header = ({
  title = 'Portfolio',
  style = {},
}) => {
  return (
    <FlexCol style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', ...style }}>
      <FlexCol
        style={{
          alignItems: 'flex-start',
          width: '100%',
          padding: '32px 16px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            padding: '0 0 8px 0',
            color: 'rgb(255, 0, 0)',
            fontWeight: 'bold',
          }}
        >
          Simple Portfolio
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#666',
          marginTop: '8px',
        }}>
          A minimal demo project
        </p>
      </FlexCol>
      <div
        style={{
          height: '1px',
          backgroundColor: '#e0e0e0',
          margin: '0',
          padding: '0',
          width: '100%',
        }}
      />
      {title && (
        <h2
          style={{
            fontSize: '32px',
            padding: '16px',
            fontWeight: '600',
            textAlign: 'left',
          }}
        >
          {title}
        </h2>
      )}
    </FlexCol>
  )
}

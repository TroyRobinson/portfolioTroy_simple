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
    <FlexCol style={{ width: '100%', ...style }}>
      <FlexCol
        style={{
          alignItems: 'flex-start',
          width: '100%',
          padding: '36px 0px',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            padding: '0 0 8px 0',
            color: 'rgb(255, 0, 0, 1)',
          }}
        >
          Simple Portfolio
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          A minimal demo project
        </p>
      </FlexCol>
      <div
        style={{
          height: '1px',
          backgroundColor: '#e0e0e0',
          margin: '8px 0 16px 0',
          width: '100%',
        }}
      />
      {title && (
        <h2
          style={{
            fontSize: '1.8rem',
            padding: '16px 0',
            textAlign: 'left',
          }}
        >
          {title}
        </h2>
      )}
    </FlexCol>
  )
}

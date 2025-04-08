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
  // Force fixed spacing regardless of environment
  const headerContainerStyle = {
    width: '100%',
    maxWidth: '1200px',
    minWidth: '700px',  // Set minimum width at component level
    margin: '0 auto',
    padding: '0 16px', // 16px = 8px * 2
    ...style
  };
  
  const headerTopStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    padding: '32px 0', // 32px = 8px * 4
    margin: '0',
    border: '0',
  };
  
  const h1Style = {
    fontSize: '48px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    padding: '0 0 8px 0', // 8px = 8px * 1
    margin: '0',
    color: 'rgb(255, 0, 0)',
    display: 'block',
  };
  
  const pStyle = {
    fontSize: '18px',
    lineHeight: '1.2',
    padding: '0',
    margin: '0',
    color: '#666',
    display: 'block',
  };
  
  const dividerStyle = {
    height: '1px',
    width: '100%',
    backgroundColor: '#e0e0e0',
    padding: '0',
    margin: '16px 0', // 16px = 8px * 2
    display: 'block',
  };
  
  const h2Style = {
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    padding: '16px 0', // 16px = 8px * 2
    margin: '0',
    textAlign: 'left',
    display: 'block',
  };

  return (
    <div style={headerContainerStyle}>
      <div style={headerTopStyle}>
        <h1 style={h1Style}>
          Simple Portfolio
        </h1>
        <p style={pStyle}>
          A minimal demo project
        </p>
      </div>
      
      <div style={dividerStyle} />
      
      {title && (
        <h2 style={h2Style}>
          {title}
        </h2>
      )}
    </div>
  )
}

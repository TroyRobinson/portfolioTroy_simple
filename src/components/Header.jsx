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
  // Component-level width constraints
  const headerContainerStyle = {
    width: '100%',
    maxWidth: '1200px',
    minWidth: '700px',
    margin: '0 auto', // Using margin here for container positioning
    padding: '0 16px', // 16px = 8px * 2
    ...style
  };
  
  const headerTopStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    padding: '32px 0', // 32px = 8px * 4
    border: '0',
  };
  
  const h1Style = {
    fontSize: '48px',
    fontWeight: 'bold',
    lineHeight: '1.2', // Using global line-height setting
    padding: '0 0 8px 0', // 8px = 8px * 1
    color: 'rgb(255, 0, 0)',
    display: 'block',
  };
  
  const pStyle = {
    fontSize: '16px', // Updated to match 16px base
    lineHeight: '1.2',
    padding: '0',
    color: '#666',
    display: 'block',
  };
  
  const dividerStyle = {
    height: '1px',
    width: '100%',
    backgroundColor: '#e0e0e0',
    padding: '16px 0 0 0', // Converted top margin to padding (16px = 8px * 2)
    display: 'block',
  };
  
  const titleSectionStyle = {
    padding: '16px 0', // 16px = 8px * 2
  };
  
  const h2Style = {
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    color: '#333',
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
        <div style={titleSectionStyle}>
          <h2 style={h2Style}>
            {title}
          </h2>
        </div>
      )}
    </div>
  )
}

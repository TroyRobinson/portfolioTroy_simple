import React from 'react';
import { FlexCol } from '../utils.jsx';

/**
 * Simplified layout component for all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title
 * @param {Object} props.style - Additional styles
 */
export const PageLayout = ({ children, title = 'Portfolio', style }) => {
  return (
    <FlexCol
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        alignItems: 'flex-start',
        ...style
      }}
    >
      <FlexCol style={{ alignItems: 'flex-start', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', padding: '0 0 10px 0' }}>Simple Portfolio</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>A minimal demo project</p>
      </FlexCol>
      
      <div style={{ height: '1px', backgroundColor: '#e0e0e0', margin: '10px 0 20px 0', width: '100%' }} />
      
      {title && <h2 style={{ fontSize: '1.8rem', padding: '20px 0', textAlign: 'left' }}>{title}</h2>}
      
      <div style={{ width: '100%', alignItems: 'flex-start', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </FlexCol>
  );
}; 
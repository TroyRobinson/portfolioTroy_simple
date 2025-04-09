import React from 'react'
import { useLocation, Link } from '../Router.jsx'

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
  const [location] = useLocation();
  
  // Navigation menu items
  const navItems = [
    { name: 'Portfolio', path: '/' },
    { name: 'About', path: '/about' },
  ];
  
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        minWidth: '800px',
        margin: '0 auto',
        padding: '0px 0px',
        fontFamily: 'Chicago, Monaco, monospace',
        ...style,
      }}
    >
      {/* Mac-style menu bar */}
      <div style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '4px 0',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        borderBottom: '1px solid #000',
        marginBottom: '8px',
      }}>
        <div style={{
          display: 'flex',
          padding: '0 8px',
          width: '100%',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            {/* Apple logo */}
            <div style={{
              width: '16px',
              height: '16px',
              backgroundImage: 'radial-gradient(circle, #fff 0%, #fff 60%, transparent 60%)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                right: '2px',
                top: '3px',
                width: '6px',
                height: '6px',
                borderRadius: '0 50% 50% 0',
                background: '#000',
                transform: 'rotate(-15deg)',
              }}/>
            </div>
            
            {/* Navigation items */}
            {navItems.map((item) => {
              const isActive = location === item.path || 
                (item.path === '/' && location === '');
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <span style={{
                    fontFamily: 'Chicago, Monaco, monospace',
                    fontSize: '14px',
                    backgroundColor: isActive ? '#fff' : 'transparent',
                    color: isActive ? '#000' : '#fff',
                    padding: '2px 8px',
                    borderRadius: '0',
                  }}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
          
          {/* Clock */}
          <div style={{
            fontFamily: 'Chicago, Monaco, monospace',
            fontSize: '14px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
          }}>
            8:14 PM
          </div>
        </div>
      </div>
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          padding: '8px 0',
          border: '0',
          gap: 4,
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              lineHeight: '1.2',
              padding: '0 0 4px 0',
              color: '#000',
              display: 'block',
            }}
          >
            Troy Robinson
          </h1>
        </div>
        <p
          style={{
            fontSize: '12px',
            lineHeight: '1.2',
            padding: '0',
            color: '#000',
            display: 'block',
          }}
        >
          A starter React template that works with Utopia
        </p>
      </div>
      
      <div
        style={{
          height: '1px',
          width: '100%',
          backgroundColor: '#000',
          padding: '0',
          display: 'block',
          marginBottom: '8px',
        }}
      />
      
      {title && (
        <div 
          style={{
            padding: '4px',
            marginBottom: '4px',
            backgroundColor: '#fff',
            border: '1px solid #000',
            width: 'fit-content',
          }}
        >
          <h2
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              lineHeight: '1.2',
              color: '#000',
              display: 'block',
            }}
          >
            {title}
          </h2>
        </div>
      )}
    </div>
  )
}

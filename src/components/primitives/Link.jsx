import React from 'react'
import { Link as RouterLink } from '../../Router.jsx'

export const Link = ({ children, href, style = {}, ...props }) => {
  return (
    <RouterLink
      href={href}
      style={{
        width: 'auto',
        minWidth: '120px',
        height: '40px',
        backgroundColor: '#2b6cb0',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.8rem',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        ...style
      }}
      {...props}
    >
      {children}
    </RouterLink>
  )
} 
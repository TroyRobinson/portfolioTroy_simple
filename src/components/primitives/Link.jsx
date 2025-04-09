import React from 'react'
import { Link as RouterLink } from '../../Router.jsx'
import { Button } from './Button.jsx'

/**
 * Link component that uses Button as its base for consistent styling
 * Maintains visual consistency between links and buttons
 */
export const Link = ({ children, href, style = {}, buttonStyle = {}, ...props }) => {
  return (
    <RouterLink
      href={href}
      style={{
        textDecoration: 'none',
        display: 'inline-block',
        ...style
      }}
      {...props}
    >
      <Button
        style={{
          width: '100%',
          height: '100%',
          ...buttonStyle
        }}
      >
        {children}
      </Button>
    </RouterLink>
  )
} 
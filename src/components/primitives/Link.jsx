import React from 'react'
import { Link as RouterLink } from '../../Router.jsx'
import { Button } from './Button.jsx'

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
        onClick={() => {}}
        type="button"
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
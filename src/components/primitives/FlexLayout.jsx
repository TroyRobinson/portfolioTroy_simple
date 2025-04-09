import React from 'react'

/**
 * Primitive layout components that provide consistent flexbox and grid layouts
 */

/**
 * Vertical flex container
 */
export const FlexCol = ({ children, style = {}, ...props }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
)

/**
 * Horizontal flex container
 */
export const FlexRow = ({ children, style = {}, ...props }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
)

/**
 * Two-column grid layout
 */
export const TwoColumnGrid = ({ children, style = {}, ...props }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
)

/**
 * Three-column grid layout
 */
export const ThreeColumnGrid = ({ children, style = {}, ...props }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      width: '100%',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
) 
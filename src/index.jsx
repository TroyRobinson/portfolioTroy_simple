import React from 'react'
import { createRoot } from 'react-dom/client'
import { preloadInstantDbModule } from './services/database.js'

// Preload the InstantDB module as early as possible - before even importing App
// This starts the data fetch immediately
preloadInstantDbModule().then(() => {
  console.log('InstantDB preloaded, now rendering app')
})

// Dynamically import App to allow the preload to happen first
import('./app.jsx').then(({ App }) => {
  const rootElement = document.getElementById('root')
  if (rootElement != null) {
    const root = createRoot(rootElement)
    root.render(<App />)
  }
})

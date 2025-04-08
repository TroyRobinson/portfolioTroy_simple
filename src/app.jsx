import React, { useEffect } from 'react';
import { Router, Route, Switch } from './Router.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';

/**
 * Main application component with global styles
 */
export const App = () => {
  // Apply global styles
  useEffect(() => {
    // Remove any existing global styles that might be causing conflicts
    const existingStyles = document.querySelectorAll('style[data-app-styles]');
    existingStyles.forEach(styleEl => styleEl.remove());
    
    const style = document.createElement('style');
    style.setAttribute('data-app-styles', 'true');
    
    style.textContent = `
      /* Complete CSS Reset */
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
      }
      
      /* Document level settings */
      html, body {
        height: 100%;
        font-size: 16px;
        line-height: 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Disable all container queries */
      @container (*) {
        * {
          all: revert;
        }
      }
      
      /* Base styles */
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
      }
      
      /* Typography base settings */
      h1, h2, h3, h4, h5, h6, p, span, div {
        display: block;
        line-height: 1.2;
        max-width: 100%;
        overflow-wrap: break-word;
      }
      
      /* Explicit typography styles */
      h1 { 
        font-size: 48px !important; 
        font-weight: bold !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      
      h2 { 
        font-size: 32px !important; 
        font-weight: 600 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      
      h3 { 
        font-size: 24px !important; 
        font-weight: 600 !important;
      }
      
      p { 
        font-size: 16px !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      
      /* Fully override any external title styling */
      [class*="title"], .apptitle, .title {
        all: unset;
        display: block;
        font-size: inherit !important;
        line-height: 1.2 !important;
      }

      /* Layout container */
      .container {
        width: 100%;
        max-width: 1200px;
        padding: 0 16px;
        margin: 0 auto;
        position: relative;
      }
      
      /* Form elements reset */
      button, input, select, textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.2;
        color: inherit;
        background: none;
      }
      
      /* Lists reset */
      ul, ol {
        list-style: none;
      }
      
      /* Links reset */
      a {
        text-decoration: none;
        color: inherit;
      }
      
      /* Tables reset */
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      
      /* Scrollbars */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
      }
      
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: rgba(155, 155, 155, 0.5);
        border-radius: 20px;
      }
      
      /* Target and disable Utopia specific styling */
      [class*="utopia"], [id*="utopia"], [class*="Utopia"], [id*="Utopia"] {
        all: unset !important;
        display: block;
      }
    `;
    
    // Attempt to disable any external stylesheets (globals.css)
    const disableExternalStyles = document.createElement('style');
    disableExternalStyles.setAttribute('data-disable-external', 'true');
    disableExternalStyles.textContent = `
      /* Attempt to disable external styles */
      @import url('') !important;
      @import "" !important;
    `;
    
    // Insert at the beginning of head to ensure highest priority
    document.head.insertBefore(style, document.head.firstChild);
    document.head.insertBefore(disableExternalStyles, document.head.firstChild);
    
    // Return cleanup function
    return () => {
      document.head.removeChild(style);
      document.head.removeChild(disableExternalStyles);
    };
  }, []);

  return (
    <Router>
      <div className="container">
        <AppContent />
      </div>
    </Router>
  );
};

/**
 * App routing configuration - simplified to only show PortfolioPage
 */
const AppContent = () => {
  return (
    <Switch>
      <Route path="/">
        {() => <PortfolioPage style={{}} />}
      </Route>
    </Switch>
  );
};

export default App;
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
      /* Basic CSS Reset */
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
      }
      
      /* Base document settings */
      html, body {
        height: 100%;
        font-size: 16px;
        line-height: 1.2;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Base styles */
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        width: 100%;
        min-width: 320px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
      }
      
      /* Form elements reset */
      button, input, select, textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.2;
        color: inherit;
        background: none;
        border: none;
        outline: none;
      }
      
      /* Links reset */
      a {
        text-decoration: none;
        color: inherit;
      }
    `;
    
    // Insert at the beginning of head to ensure highest priority
    document.head.insertBefore(style, document.head.firstChild);
    
    // Return cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        boxSizing: 'border-box',
      }}>
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
        {() => <PortfolioPage />}
      </Route>
    </Switch>
  );
};

export default App;
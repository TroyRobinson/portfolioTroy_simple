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
      /* Reset all elements */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      /* Document level settings */
      html {
        overflow-y: scroll;
        scrollbar-gutter: stable;
        font-size: 16px; /* Explicit base font size */
      }
      
      /* Base styles */
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        min-height: 100vh;
        padding: 0 16px; /* Add default padding */
      }
      
      /* Typography reset */
      h1, h2, h3, h4, h5, h6, p {
        line-height: 1.2;
        max-width: 100%;
        overflow-wrap: break-word;
      }
      
      /* Headings */
      h1 { font-size: 48px; font-weight: bold; }
      h2 { font-size: 32px; font-weight: 600; }
      h3 { font-size: 24px; font-weight: 600; }
      
      /* Paragraphs */
      p { font-size: 16px; }
      
      /* Disable container queries effects */
      .apptitle, [class*="title"] {
        font-size: inherit !important;
      }

      /* Layout classes */
      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
      }
      
      /* Form elements */
      button, input, select, textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.2;
        color: inherit;
      }
      
      /* Lists */
      ul, ol {
        list-style: none;
      }
      
      /* Links */
      a {
        text-decoration: none;
        color: inherit;
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
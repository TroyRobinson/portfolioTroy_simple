import React, { useEffect } from 'react';
import { Router, Route, Switch } from './Router.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';

/**
 * Main application component with global styles
 */
export const App = () => {
  // Apply global styles
  useEffect(() => {
    const style = document.createElement('style');
    
    style.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      html {
        overflow-y: scroll;
        scrollbar-gutter: stable;
      }
      
      body {
        font-family: sans-serif;
        background-color: #f9f9f9;
        color: #333;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Reset text elements */
      h1, h2, h3, h4, h5, h6, p {
        line-height: 1.2;
      }
      
      /* Reset form elements */
      button, input, select, textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.2;
        color: inherit;
      }
      
      /* Remove list styles */
      ul, ol {
        list-style: none;
      }
      
      /* Remove link styling */
      a {
        text-decoration: none;
        color: inherit;
      }
      
      /* For Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
      }
      
      /* For Chrome/Safari/Edge */
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
    
    document.head.appendChild(style);
    
    // Return cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <AppContent />
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
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
      html {
        overflow-y: scroll;
        scrollbar-gutter: stable;
      }
      
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
        background-color: #f9f9f9;
        color: #333;
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
# Simplified Portfolio Project

This is a minimal version of the portfolio project, keeping only the essential components for testing purposes.

## What's Included

- **Vite Setup**: Fast development server and build process
- **Utopia Integration**: Compatible with Utopia visual editor
- **Wouter Router**: Lightweight routing
- **InstantDB**: For case study data management in PortfolioPage

## Core Files

- `src/index.jsx`: Entry point
- `src/app.jsx`: Main application with routing
- `src/playground.js`: Utopia playground
- `src/pages/PortfolioPage.jsx`: The main (and only) page with InstantDB integration
- `utopia/storyboard.js`: For Utopia visual editing
- `public/`: Public assets

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This project is set up for Vercel deployment with the included `vercel.json` configuration. 
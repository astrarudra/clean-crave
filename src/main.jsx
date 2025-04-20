import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, responsiveFontSizes } from '@mui/material';
import App from './App';
import theme from './theme/theme';
import './index.css'; // Keep for potential global overrides later

// Make fonts responsive
const responsiveTheme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline /> {/* Normalize CSS and apply background color */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
); 
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import './App.css';
import routes from './routes';
import {ThemeProvider} from '@material-ui/core';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

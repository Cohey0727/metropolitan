import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import './App.css';
import routes from './routes';
import {ThemeProvider} from '@material-ui/core';
import theme from './theme';
import Providers from './providers';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Providers>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </Providers>
    </ThemeProvider>
  );
}

export default App;

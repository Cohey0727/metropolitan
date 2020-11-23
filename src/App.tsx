import React from 'react';
import {RecoilRoot} from 'recoil';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import './App.css';
import routes from './routes';
import {ThemeProvider} from '@material-ui/core';
import theme from './theme';
import Providers from './providers';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Providers>
          <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
        </Providers>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;

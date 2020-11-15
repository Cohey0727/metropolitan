import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import './App.css';
import routes from './routes';

function App() {
  return (
    <>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </>
  );
}

export default App;

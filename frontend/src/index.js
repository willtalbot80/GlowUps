// index.js — demo/design-update PR entry point
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

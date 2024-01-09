import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'; // Fixed import statement
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);

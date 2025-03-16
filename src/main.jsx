import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure CSS is imported before App
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

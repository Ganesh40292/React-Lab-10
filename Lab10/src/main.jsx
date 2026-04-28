import React from 'react';
import ReactDOM from 'react-dom/client';
import DataFetcher from './App';
import './App.css'; // make sure your CSS is imported

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataFetcher />
  </React.StrictMode>
);
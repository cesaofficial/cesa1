import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 1. Import BrowserRouter from the react-router-dom library
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/*
      2. Wrap your App component with BrowserRouter and add the basename.
         This tells React Router that your app lives inside the /team/ subdirectory.
    */}
    <BrowserRouter basename="/team">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
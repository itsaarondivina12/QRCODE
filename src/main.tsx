import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.tsx';
import Header from './modules/header.tsx'; // Ensure this path is correct
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your app in BrowserRouter for routing */}
      <Header />
      <App />
    </BrowserRouter>
  </StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming App is your main component
import { CartProvider } from './components/CartContext'; // Adjust the import path as necessary

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
        <App />
    </CartProvider>
);

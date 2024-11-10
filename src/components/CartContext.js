import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Sync the cart with localStorage whenever it changes
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // Add to cart logic
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist cart to localStorage
    };

    // Remove from cart logic
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId); // Remove the product by ID
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist updated cart to localStorage
    };

    // Update quantity of an item
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;  // Prevent negative quantity

        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist updated cart to localStorage
    };

    // Get total number of items in the cart (just the count of distinct products)
    const getTotalItems = () => {
        return cart.length;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};

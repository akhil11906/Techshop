import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

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
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalItems = () => {
        return cart.length;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

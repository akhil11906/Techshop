import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const originalPrice = cart.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const discount = cart.reduce((total, item) => total + ((item.originalPrice - item.finalPrice) * item.quantity), 0);
    const deliveryCharge = cart.length > 0 ? 50 : 0; // Only add delivery charge if there are items in the cart
    const totalPrice = originalPrice - discount + deliveryCharge;

    return (
        <div className="cart-container">
            <div className="cart-items-container">
                {cart.length > 0 ? (
                    cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.images[0]} alt={item.title} className="item-image" />
                            <div className="item-details">
                                <p className="item-title">{item.title}</p>
                                <div className="item-price">
                                    ${item.finalPrice} <span className="strike-price">${item.originalPrice}</span>
                                </div>
                                <div className="quantity-controls">
                                    <button className="quantity-button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span className="item-quantity">{item.quantity}</span>
                                    <button className="quantity-button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))
                ) : (
                    <p className="empty-cart-message">Your cart is empty.</p>
                )}
            </div>

            <div className="order-summary-container">
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <p>Subtotal ({cart.length} items): ${originalPrice.toFixed(2)}</p>
                    <p>Discount: -${discount.toFixed(2)}</p>
                    <p>Delivery: ${deliveryCharge > 0 ? deliveryCharge.toFixed(2) : "Free"}</p>
                    <hr />
                    <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
                    <button className="continue-button">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
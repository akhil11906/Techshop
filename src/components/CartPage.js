import React from 'react';
import '../Styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const originalPrice = cart.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const discount = cart.reduce((total, item) => total + ((item.originalPrice - item.finalPrice) * item.quantity), 0);
    const deliveryCharge = cart.length > 0 ? 50 : 0;
    const totalPrice = originalPrice - discount + deliveryCharge;

    const handleStartShopping = () => {
        navigate('/all-products');
    };

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
                                    <button
                                        className="quantity-button"
                                        onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="item-quantity">{item.quantity}</span>
                                    <button
                                        className="quantity-button"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                className="remove-button"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="empty-cart-message-container">
                        <FaShoppingCart size={100} color="red" className="cart-icon" />
                        <p className="empty-cart-message">Your cart is empty.</p>
                        <button className="start-shopping-button" onClick={handleStartShopping}>
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>

            {cart.length > 0 && (
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
            )}
        </div>
    );
};

export default Cart;

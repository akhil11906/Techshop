// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <h4 className="product-title">{product.brand} - {product.title}</h4>
            <p className="product-info">{product.info}</p>
            <div className="price-section">
                <span className="final-price">₹{product.finalPrice}</span>
                {product.originalPrice > product.finalPrice && (
                    <span className="original-price">₹{product.originalPrice}</span>
                )}
            </div>
            <p className="ratings">Rating: {product.rateCount}⭐ ({product.ratings} reviews)</p>
            <button className="view-details-button" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;

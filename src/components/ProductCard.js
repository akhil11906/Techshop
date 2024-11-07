import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            {/* Add a Link to navigate to the product detail page */}
            <Link to={`/product/${product.id}`} className="product-link">
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
            </Link>

            {/* "Add to Cart" Button */}
            <button className="view-details-button" onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;

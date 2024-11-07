import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../Data/ProductsData';
import { useCart } from '../components/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    
    // Find the product based on the ID from the URL
    const product = productsData.find((product) => product.id === parseInt(id));

    // Initialize the mainImage state regardless of whether the product is found or not
    const [mainImage, setMainImage] = useState(product ? product.images[0] : null);

    // If product doesn't exist, return a message or handle the error appropriately
    if (!product) {
        return <div>Product not found!</div>;
    }

    // Calculate discount percentage
    const discountPercentage = Math.round(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100);

    return (
        <div className="product-detail">
            <Link to="/all-products" className="back-link">Back to All Products</Link>

            <div className="product-detail-content">
                <div className="left-side">
                    {/* Thumbnail images */}
                    <div className="thumbnail-images">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="thumbnail-image"
                                    onClick={() => setMainImage(image)}
                                />
                            ))
                        ) : (
                            <p>No images available</p>  // Fallback if images are undefined or empty
                        )}
                    </div>
                </div>

                <div className="center-side">
                    {/* Main large image */}
                    {mainImage ? (
                        <img src={mainImage} alt="Product" className="main-image" />
                    ) : (
                        <p>No image available</p>  // Fallback if mainImage is undefined
                    )}
                </div>

                <div className="right-side">
                    {/* Title */}
                    <h1>{product.title}</h1>

                    {/* Tagline */}
                    <p className="subheading">{product.tagline}</p>

                    {/* Rating and Number of Ratings */}
                    <p className="rating">⭐ {product.ratings} | {product.reviews} Ratings</p>

                    {/* Price and Original Price */}
                    <div className="price-sectio">
                        <p className="price">
                            ₹{product.finalPrice} <span className="original-price">₹{product.originalPrice}</span>
                        </p>

                        {/* You Save */}
                        <p className="discount">You save: ₹{product.originalPrice - product.finalPrice} ({discountPercentage}%)</p>

                        {/* Inclusive of all taxes */}
                        <p className="tax-info">(Inclusive of all taxes)</p>
                    </div>

                    {/* Offers and Discounts */}
                    <div className="offers">
                        <h4>Offers and Discounts</h4>
                        <p>No Cost EMI on Credit Card</p>
                        <p>Pay Later & Avail Cashback</p>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="add-to-cart" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

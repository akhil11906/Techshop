import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../Data/ProductsData';
import reviewsData from '../Data/ReviewData';
import { useCart } from '../components/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    // Find the product based on the ID from the URL
    const product = productsData.find((product) => product.id === parseInt(id));

    // Initialize the mainImage state
    const [mainImage, setMainImage] = useState(product ? product.images[0] : null);

    // Track the active tab (Specifications, Overview, or Reviews)
    const [activeTab, setActiveTab] = useState('Specifications');

    // If product doesn't exist, return a message
    if (!product) {
        return <div>Product not found!</div>;
    }

    // Calculate discount percentage
    const discountPercentage = Math.round(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100);

    // Specifications Content
    const specifications = (
        <div className="akhil-specifications">
            <ul>
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Model:</strong> {product.model}</li>
                <li><strong>Generic Name:</strong> {product.genericName}</li>
                <li><strong>Headphone Type:</strong> {product.headphoneType}</li>
                <li><strong>Connectivity:</strong> {product.connectivity}</li>
                <li><strong>Microphone:</strong> {product.microphone}</li>
            </ul>
        </div>
    );

    // Overview Content (Dynamic with Product Name)
    const overview = (
        <div className="akhil-overview">
            <p>The {product.title} in-ear truly wireless earbuds provide fabulous sound quality.</p>
            <ul>
                <li>Sound tuned to perfection</li>
                <li>Comfortable to wear</li>
                <li>Long hours playback time</li>
            </ul>
            <p>Buy the {product.title}, which offers you a fabulous music experience by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility.</p>
        </div>
    );

    // Reviews Content (Map over reviewsData)
    const reviews = (
        <div className="akhil-reviews">
            {reviewsData.map((review) => (
                <div key={review.id} className="review">
                    <h4>{review.name}</h4>
                    <p className="review-date">{review.date}</p>
                    <div className="review-rating">
                        {'⭐'.repeat(review.rateCount)} {/* Display stars based on rating */}
                    </div>
                    <p className="review-text">{review.review}</p>
                </div>
            ))}
        </div>
    );

    // Related Products Content (Limit to 4)
    const relatedProducts = productsData
        .filter((item) => item.category === product.category && item.id !== product.id) // Example: filter by category
        .slice(0, 4); // Limit to first 4 products

    const relatedProductsSection = (
        <div className="akhil-related-products">
            <h3>Related Products</h3>
            <div className="akhil-related-products-list">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="related-product">
                            <Link to={`/product/${relatedProduct.id}`}>
                                <img src={relatedProduct.images[0]} alt={relatedProduct.title} className="related-product-image" />
                            </Link>
                            <h4>{relatedProduct.title}</h4>
                            <p>₹{relatedProduct.finalPrice} <span className="original-price">₹{relatedProduct.originalPrice}</span></p>
                            <p>{Math.round(((relatedProduct.originalPrice - relatedProduct.finalPrice) / relatedProduct.originalPrice) * 100)}% Off</p>
                            <button className="add-to-cart-btn" onClick={() => addToCart(relatedProduct)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No related products found.</p>
                )}
            </div>
        </div>
    );

    // Handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="akhil-detail">
            <div className="akhil-detail-content">
                <div className="akhil-left-side">
                    {/* Thumbnail images */}
                    <div className="akhil-thumbnail-images">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="akhil-thumbnail-image"
                                    onClick={() => setMainImage(image)}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>

                <div className="akhil-center-side">
                    {/* Main large image */}
                    {mainImage ? (
                        <img src={mainImage} alt="Product" className="akhil-main-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>

                <div className="akhil-right-side">
                    {/* Title */}
                    <h1>{product.title}</h1>

                    {/* Tagline */}
                    <p className="akhil-subheading">{product.tagline}</p>

                    {/* Rating and Number of Ratings */}
                    <p className="akhil-rating">⭐ {product.ratings} | {product.reviews} Ratings</p>

                    {/* Price and Original Price */}
                    <div className="akhil-price-section">
                        <p className="akhil-price">
                            ₹{product.finalPrice} <span className="akhil-original-price">₹{product.originalPrice}</span>
                        </p>

                        {/* You Save */}
                        <p className="akhil-discount">You save: ₹{product.originalPrice - product.finalPrice} ({discountPercentage}%)</p>

                        {/* Inclusive of all taxes */}
                        <p className="akhil-tax-info">(Inclusive of all taxes)</p>
                    </div>

                    {/* Offers and Discounts */}
                    <div className="akhil-offers">
                        <h4>Offers and Discounts</h4>
                        <p>No Cost EMI on Credit Card</p>
                        <p>Pay Later & Avail Cashback</p>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="akhil-add-to-cart" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            </div>

            {/* Section for Specifications, Overview, and Reviews buttons */}
            <div className="akhil-tabs">
                <button
                    className={`akhil-tab-button ${activeTab === 'Specifications' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Specifications')}
                >
                    Specifications
                </button>
                <button
                    className={`akhil-tab-button ${activeTab === 'Overview' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Overview')}
                >
                    Overview
                </button>
                <button
                    className={`akhil-tab-button ${activeTab === 'Reviews' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Reviews')}
                >
                    Reviews
                </button>
            </div>

            {/* Conditionally render the content based on the active tab */}
            <div className="akhil-tab-content">
                {activeTab === 'Specifications' && specifications}
                {activeTab === 'Overview' && overview}
                {activeTab === 'Reviews' && reviews}
            </div>

            {/* Related Products Section */}
            {relatedProductsSection}
        </div>
    );
};

export default ProductDetail;

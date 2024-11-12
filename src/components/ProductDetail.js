import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons
import { FaUserAlt } from 'react-icons/fa';
import productsData from '../Data/ProductsData';
import reviewsData from '../Data/ReviewData';
import { useCart } from '../components/CartContext';
import '../Styles/ProductDetail.css';

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

    // Function to render stars based on the rating, capped at 5 stars
    const renderStars = (rating) => {
        const maxStars = 5;
        const normalizedRating = Math.min(rating, maxStars); // Cap rating to 5
        const fullStars = Math.floor(normalizedRating);
        const hasHalfStar = normalizedRating % 1 !== 0;
        const stars = [];

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="star-icon" />);
        }

        // Add half star if necessary
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star-icon" />);
        }

        // Fill remaining stars with empty stars
        while (stars.length < maxStars) {
            stars.push(<FaRegStar key={stars.length} className="star-icon" />);
        }

        return stars;
    };

    // Specifications Content
    const specifications = (
        <div className="akhil-specifications">
            <ul>
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Model:</strong> {product.title}</li>
                <li><strong>Generic Name:</strong> {product.category}</li>
                <li><strong>Headphone Type:</strong> {product.connectivity}</li>
                <li><strong>Connectivity:</strong> {product.connectivity}</li>
                <li><strong>Microphone:</strong> {product.type}</li>
            </ul>
        </div>
    );

    // Overview Content
    const overview = (
        <div className="akhil-overview">
            <p>The <span style={{ color: 'red' }}>{product.title}</span> in-ear truly wireless earbuds provide fabulous sound quality.</p>
            <ul>
                <li>Sound tuned to perfection</li>
                <li>Comfortable to wear</li>
                <li>Long hours playback time</li>
            </ul>
            <p>Buy the <span style={{ color: 'red' }}>{product.title}</span> , which offers you a fabulous music experience by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility.</p>
        </div>
    );

    // Reviews Content
    const reviews = (
        <div className="akhil-reviews">
    {reviewsData.map((review) => (
        <div key={review.id} className="review">
            <div className="review-header">
                {/* Profile icon on the left */}
                <FaUserAlt className="review-user-icon" />
                
                {/* Name, Date, and Rating on the right */}
                <div className="review-info">
                    <h4>{review.name}</h4>
                    <div className="review-meta">
                        <p className="review-date">
                            {review.date} <span>|</span>
                        </p>
                        <div className="review-rating">
                            {renderStars(product.ratings)} {/* Display stars based on rating */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Review text */}
            <p className="review-text">{review.review}</p>
        </div>
    ))}
</div>

    );

    // Related Products Content
    const relatedProducts = productsData
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 4);

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
                            <div className="related-product-rating">
                            {renderStars(product.ratings)} {/* Display stars */}
                            </div>

                            {/* Product Title */}
                            <h4 className='title'>{relatedProduct.title}</h4>

                            {/* Product Subtitle (Tagline or Short Description) */}
                            <p className="related-product-subtitle">{relatedProduct.info}</p>

                            <hr />

                            {/* Price Section */}
                            <p className="related-product-price">
                                ₹{relatedProduct.finalPrice} <span className="original-price">₹{relatedProduct.originalPrice}</span>
                            </p>
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
                    {mainImage ? (
                        <img src={mainImage} alt="Product" className="akhil-main-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>

                <div className="akhil-right-side">
                    <h1>{product.title}</h1>
                    <p className="akhil-subheading">{product.info}</p>
                    <div className="akhil-rating">
                        {renderStars(product.rateCount)} {/* Display stars based on exact product rating */}
                        <span className="reviews-count"> | {product.ratings} Reviews</span> {/* Display review count */}
                    </div>
                    <hr/>
                    <div className="akhil-price-section">
                        <p className="akhil-price">
                            ₹{product.finalPrice} <span className="akhil-original-price">₹{product.originalPrice}</span>
                        </p>
                        <p className="akhil-discount">You save: ₹{product.originalPrice - product.finalPrice} ({discountPercentage}%)</p>
                        <p className="akhil-tax-info">(Inclusive of all taxes)</p>
                    </div>
                    <hr/>
                    <h4>Offers and Discounts</h4>

                    <div className="akhil-offers">
                        <p>No Cost EMI on Credit Card</p>
                        <p>Pay Later & Avail Cashback</p>
                    </div>
                    <hr/>
                    <button className="akhil-add-to-cart" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            </div>

            <div className="akhil-tabs">
                <button className={`akhil-tab-button ${activeTab === 'Specifications' ? 'active' : ''}`} onClick={() => handleTabClick('Specifications')}>Specifications</button>
                <button className={`akhil-tab-button ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => handleTabClick('Overview')}>Overview</button>
                <button className={`akhil-tab-button ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</button>
            </div>

            <div className="akhil-tab-content">
                {activeTab === 'Specifications' && specifications}
                {activeTab === 'Overview' && overview}
                {activeTab === 'Reviews' && reviews}
            </div>

            {relatedProductsSection}
        </div>
    );
};

export default ProductDetail;

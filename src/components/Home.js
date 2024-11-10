import React, { useState, useEffect } from 'react';
import ProductList from './ProductList'; 
import './Home.css';
import { useCart } from '../components/CartContext'; // Adjust import path as necessary
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { addToCart } = useCart(); // Use the Cart context
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); 
    // eslint-disable-next-line
    const [selectedCategory, setSelectedCategory] = useState('All'); // Ignore unused warning for now

    // Banner data
    const banners = [
        { 
            id: 1, 
            src: require('../Assets/jbl760nc-1.png'), 
            alt: 'JBL Live 660NC', 
            caption: "JBL Live 660NC",
            description: "Wireless Over-Ear NC Headphones",
            price: "₹9999",
            originalPrice: "₹14999",
            isProduct: true 
        },
        { 
            id: 7, 
            src: require('../Assets/sonyXb910n-1.png'), 
            alt: 'Sony WH-XB910N', 
            caption: "Sony WH-XB910N",
            description: "Extra Bass Noise Cancelling Headphones",
            price: "₹14999",
            originalPrice: "₹19999",
            isProduct: true 
        },
        { 
            id: 3, 
            src: require('../Assets/boat110-1.png'), 
            alt: 'Boat Airdopes 131', 
            caption: "Boat Airdopes 131",
            description: "Feather Weight for Comfort All-Day",
            price: "₹1999",
            originalPrice: "₹2990",
            isProduct: true 
        }
    ];
    const handleShopNowClick = (id) => {
        navigate(`/product/${id}`);
    };
    // Product data
    const products = [
        { id: 2, src: require('../Assets/boat518-1.png'), name: "boAt Rockerz 518", price: "₹1299", originalPrice: "₹3990" },
        { id: 5, src: require('../Assets/boat410-2.png'), name: "boAt Rockerz 410", price: "₹1399", originalPrice: "₹2999" },
        { id: 19, src: require('../Assets/sonyXb400-1.png'), name: "Sony WI-XB400", price: "₹2990", originalPrice: "₹4990" },
        { id: 9, src: require('../Assets/jbl760nc-1.png'), name: "JBL Live 760NC", price: "₹13999", originalPrice: "₹19999" },
        { id: 17, src: require('../Assets/boat110-2.png'), name: "boAt Rockerz 381", price: "₹2999", originalPrice: "₹4990" }
    ];

    // Handle banner sliding
    const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    // eslint-disable-next-line
    const handlePrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);

    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, handleNext]); // Add handleNext to dependencies

    // Display the next products based on the current index
    const displayedProducts = [
        products[(currentIndex + 0) % products.length],
        products[(currentIndex + 1) % products.length],
        products[(currentIndex + 2) % products.length],
        products[(currentIndex + 3) % products.length],
        products[(currentIndex + 4) % products.length],
    ];

    return (
        <div>
            <div className="banner-slider">
                <div className={`banner-slide ${banners[currentIndex].isDark ? 'dark-background' : ''}`}>
                    {banners[currentIndex].isProduct ? (
                        <div className="banner-content product-content">
                            <h2 className="banner-caption">{banners[currentIndex].caption}</h2>
                            <p className="banner-description">{banners[currentIndex].description}</p>
                            <div className="product-price">
                                <span className="discounted-price">{banners[currentIndex].price}</span>
                                <span className="original-price">{banners[currentIndex].originalPrice}</span>
                            </div>
                            <button 
                            className="shop-now-btn" 
                            onClick={() => handleShopNowClick(banners[currentIndex].id)}>
                            Shop Now
                        </button>
                        </div>
                    ) : (
                        <div className="banner-content">
                            <h2 className="banner-caption">{banners[currentIndex].caption}</h2>
                            <p className="banner-description">{banners[currentIndex].description}</p>
                        </div>
                    )}
                    <img src={banners[currentIndex].src} alt={banners[currentIndex].alt} className="banner-image" />
                </div>
            </div>
                    <h3 className='featured'>Featured Products</h3>
            <div className="image-slider">
                <div className="image-row">
                    {displayedProducts.map((product, index) => {
                        let sizeClass = (index === 0 || index === 4) ? 'size-60' : (index === 1 || index === 3) ? 'size-80' : 'size-100';
                        return (
                            <div 
                                className={`image-item ${sizeClass}`} 
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)} // Navigate to product details
                            >
                                <div className="product-name">{product.name}</div>
                                <img src={product.src} alt={product.name} className="image" />
                                <div className="product-price">
                                    <span className="discounted-price">{product.price}</span>
                                    <span className="original-price">{product.originalPrice}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="top-products-section">
                <h2 className="top-products-title">Top Products</h2>
                <ProductList selectedCategory={selectedCategory} />
            </div>
        </div>
    );
};

export default Home;

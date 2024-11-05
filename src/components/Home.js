import React, { useState, useEffect } from 'react';
import ProductList from './ProductList'; 
import './Home.css';
import { useCart } from '../components/CartContext'; // Adjust import path as necessary

const Home = () => {
    const { addToCart } = useCart(); // Use the Cart context
    const [currentIndex, setCurrentIndex] = useState(0);
    // eslint-disable-next-line
    const [selectedCategory, setSelectedCategory] = useState('All'); // Ignore unused warning for now

    // Banner data
    const banners = [
        { 
            id: 1, 
            src: require('../Assets/boat110-1.png'), 
            alt: 'Exclusive Deals', 
            caption: "Exclusive Deals on Audio Gear", 
            description: "Shop the best deals on high-quality audio equipment for every music lover."
        },
        { 
            id: 2, 
            src: require('../Assets/boat131-2.png'), 
            alt: 'Top-Rated Products', 
            caption: "Top-Rated Products for You", 
            description: "Explore our curated selection of top-rated products.", 
            isDark: true 
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

    // Product data
    const products = [
        { id: 1, src: require('../Assets/boat518-1.png'), name: "Boat Airdopes 110", price: "₹1999", originalPrice: "₹2990" },
        { id: 2, src: require('../Assets/boat410-2.png'), name: "Boat Airdopes 131", price: "₹1299", originalPrice: "₹2490" },
        { id: 3, src: require('../Assets/jbl660nc-2.png'), name: "JBL 660 NC", price: "₹2999", originalPrice: "₹3990" },
        { id: 4, src: require('../Assets/boat131-4.png'), name: "Boat Airdopes Pro", price: "₹2999", originalPrice: "₹3990" },
        { id: 5, src: require('../Assets/boat110-2.png'), name: "Boat Airdopes 100", price: "₹999", originalPrice: "₹1490" }
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
                            <button className="shop-now-btn">Shop Now</button>
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

            <div className="image-slider">
                <div className="image-row">
                    {displayedProducts.map((product, index) => {
                        let sizeClass = (index === 0 || index === 4) ? 'size-60' : (index === 1 || index === 3) ? 'size-80' : 'size-100';
                        return (
                            <div className={`image-item ${sizeClass}`} key={product.id}>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import productsData from '../Data/ProductsData';
import ProductCard from './ProductCard';
import './ProductList.css';
import { useCart } from '../components/CartContext'; // Import useCart

const ProductList = ({ selectedCategory }) => {
    const { addToCart } = useCart(); // Get addToCart from context
    const [category, setSelectedCategory] = useState(selectedCategory || 'All'); // Initialize selected category, default to 'All'

    // Filter products based on selected category
    const filteredProducts = category === 'All'
        ? productsData
        : productsData.filter(product => product.category === category);

    // Only display the first 11 products
    const productsToDisplay = filteredProducts.slice(0, 11);

    return (
        <div className="product-list">
            <div className="filter-buttons">
                <button onClick={() => setSelectedCategory('All')}>All</button>
                <button onClick={() => setSelectedCategory('Headphones')}>Headphones</button>
                <button onClick={() => setSelectedCategory('Earbuds')}>Earbuds</button>
                <button onClick={() => setSelectedCategory('Earphones')}>Earphones</button>
                <button onClick={() => setSelectedCategory('Neckbands')}>Neckbands</button>
            </div>

            <div className="product-grid">
                {productsToDisplay.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}

                {/* Link to the All Products page */}
                <Link to="/all-products" className="product-card browse-all-card">
                    <h4>Browse all products</h4>
                    <button className="view-details-button">View Products</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductList;

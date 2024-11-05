import React, { useState } from 'react';
import productsData from '../Data/ProductsData';
import ProductCard from './ProductCard';
import './ProductList.css';
import { useCart } from '../components/CartContext'; // Import useCart
const Home = () => {
    const { cartItems, totalCost } = useCart();}

const ProductList = ({ selectedCategory }) => {
    const { addToCart } = useCart(); // Get addToCart from context
    const [category, setSelectedCategory] = useState('All'); // Initialize selected category

    // Filtered products based on the selected category
    const filteredProducts = category === 'All'
        ? productsData
        : productsData.filter(product => product.category === category);

    return (
        <div>
            <div className="filter-buttons">
                <button onClick={() => setSelectedCategory('All')}>All</button>
                <button onClick={() => setSelectedCategory('Headphones')}>Headphones</button>
                <button onClick={() => setSelectedCategory('Earbuds')}>Earbuds</button>
                <button onClick={() => setSelectedCategory('Earphones')}>Earphones</button>
                <button onClick={() => setSelectedCategory('Neckbands')}>Neckbands</button>
            </div>

            <div className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} /> // Pass addToCart
                ))}
            </div>
        </div>
    );
};

export default ProductList;

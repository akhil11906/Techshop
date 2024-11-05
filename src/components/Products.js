// Products.js
import React, { useState } from 'react';
import productsData from './ProductsData'; // Make sure this path is correct
import ProductCard from './ProductCard'; // Assuming you have this component to display each product

const Products = () => {
    const [filter, setFilter] = useState('All'); // State to manage the filter

    // Function to filter products based on selected category
    const filterProducts = (category) => {
        setFilter(category);
    };

    // Filtered product data based on the selected category
    const filteredProducts = filter === 'All' ? productsData : productsData.filter(product => product.category === filter);

    return (
        <div className="products-container">
            <h2>Top Products</h2>
            <div className="filter-buttons">
                <button onClick={() => filterProducts('All')}>All</button>
                <button onClick={() => filterProducts('Headphones')}>Headphones</button>
                <button onClick={() => filterProducts('Earbuds')}>Earbuds</button>
                <button onClick={() => filterProducts('Earphones')}>Earphones</button>
                <button onClick={() => filterProducts('Neckbands')}>NeckBands</button>
            </div>
            <div className="products-list">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;

import React, { useState } from 'react';
import productsData from '../Data/ProductsData';
import ProductCard from '../components/ProductCard';
import { useCart } from '../components/CartContext';
import '../Styles/AllProducts.css';

const AllProducts = () => {
    const { addToCart } = useCart();
    const [sortBy, setSortBy] = useState('');
    const [selectedBrands, setSelectedBrands] = useState({
        JBL: false,
        Sony: false,
        boAt: false,
    });
    const [selectedCategories, setSelectedCategories] = useState({
        Headphones: false,
        Earbuds: false,
        Earphones: false,
        Neckbands: false,
    });
    const [priceLimit, setPriceLimit] = useState(29999);
    const minPrice = 900;
    const maxPrice = 29999;

    const sortProducts = (products) => {
        switch (sortBy) {
            case 'latest':
                return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'featured':
                return [...products].filter(product => product.tag);
            case 'top-rated':
                return [...products].sort((a, b) => b.ratings - a.ratings);
            case 'price-asc':
                return [...products].sort((a, b) => a.finalPrice - b.finalPrice);
            case 'price-desc':
                return [...products].sort((a, b) => b.finalPrice - a.finalPrice);
            default:
                return products;
        }
    };

    const filterProductsByBrandCategoryAndPrice = (products) => {
        const selectedBrandKeys = Object.keys(selectedBrands).filter(brand => selectedBrands[brand]);
        const selectedCategoryKeys = Object.keys(selectedCategories).filter(category => selectedCategories[category]);

        return products.filter(product => {
            const brandMatch = selectedBrandKeys.length > 0 ? selectedBrandKeys.includes(product.brand) : true;
            const categoryMatch = selectedCategoryKeys.length > 0 ? selectedCategoryKeys.includes(product.category) : true;
            const priceMatch = product.finalPrice <= priceLimit;
            return brandMatch && categoryMatch && priceMatch;
        });
    };

    const sortedProducts = sortProducts(productsData);
    const filteredProducts = filterProductsByBrandCategoryAndPrice(sortedProducts);

    const handleBrandChange = (brand) => {
        setSelectedBrands((prevState) => ({
            ...prevState,
            [brand]: !prevState[brand],
        }));
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const handlePriceChange = (e) => {
        setPriceLimit(Number(e.target.value));
    };

    return (
        <div style={containerStyle}>
            <div style={sidebarStyle} className="sidebar-scrollable">
                <h3>Sort By</h3>
                <div style={optionsStyle}>
                    <button className="sort-button" onClick={() => setSortBy('latest')}>Latest</button>
                    <button className="sort-button" onClick={() => setSortBy('featured')}>Featured</button>
                    <button className="sort-button" onClick={() => setSortBy('top-rated')}>Top Rated</button>
                    <button className="sort-button" onClick={() => setSortBy('price-asc')}>Price (Lowest First)</button>
                    <button className="sort-button" onClick={() => setSortBy('price-desc')}>Price (Highest First)</button>
                </div>

                <h3 style={headingStyle}>Filter By</h3>
                <hr style={{ margin: '20px 0' }} />
                
                <h3 style={headingStyle}>Brands</h3>
                <div style={optionsStyle}>
                    {Object.keys(selectedBrands).map(brand => (
                        <label key={brand} style={{ marginBottom: '10px', cursor: 'pointer' }}>
                            <input 
                                type="checkbox" 
                                checked={selectedBrands[brand]} 
                                onChange={() => handleBrandChange(brand)} 
                            />
                            {brand}
                        </label>
                    ))}
                </div>

                <h3 style={headingStyle}>Categories</h3>
                <div style={optionsStyle}>
                    {Object.keys(selectedCategories).map(category => (
                        <label key={category} style={{ marginBottom: '10px', cursor: 'pointer' }}>
                            <input 
                                type="checkbox" 
                                checked={selectedCategories[category]} 
                                onChange={() => handleCategoryChange(category)} 
                            />
                            {category}
                        </label>
                    ))}
                </div>

                <h3 style={headingStyle}>Price</h3>
                <div style={priceRangeStyle}>
                    <h4>Max Price: ${priceLimit}</h4>
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceLimit}
                        onChange={handlePriceChange}
                        style={{ width: '100%' }}
                    />
                </div>
                <h4>Products Available: {filteredProducts.length}</h4>
            </div>
            <div style={productGridStyle}>
                <h2 style={{ textAlign: 'center' }}>All Products</h2>
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
};

const sidebarStyle = {
    width: '200px',
    height: '300px',
    padding: '20px',
    backgroundColor: 'black',
    borderRight: '1px solid #ddd',
    overflowY: 'auto',
    position: 'relative',
    top: '70px'
};

const productGridStyle = {
    flex: 1,
    padding: '20px',
};

const headingStyle = {
  marginTop: '50px'
};

const optionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
};

const priceRangeStyle = {
    marginBottom: '20px',
};

export default AllProducts;

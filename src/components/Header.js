import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // Import useCart
import './Header.css'; // Import the CSS file

const Header = () => {
    const { getTotalItems } = useCart(); // Get total items from the cart context
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchOverlayRef = useRef(null);

    const toggleSearch = () => setShowSearch(!showSearch);

    const handleClickOutside = (event) => {
        if (searchOverlayRef.current && !searchOverlayRef.current.contains(event.target)) {
            setShowSearch(false);
        }
    };

    useEffect(() => {
        if (showSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearch]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setShowSearch(false);
    };

    const totalItems = getTotalItems(); // Get the total items from the cart

    return (
        <>
            {showSearch && (
                <div className="search-overlay">
                    <form onSubmit={handleSearchSubmit} className="overlay-form" ref={searchOverlayRef}>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="overlay-input"
                        />
                        <button type="submit" className="overlay-button">Search</button>
                    </form>
                </div>
            )}

            <header className="header">
                <div className="logo">
                    <Link to="/" style={{ color: '#E1DDD', textDecoration: 'none' }}> {/* Link to main page */}
                        <h1>TechShop</h1>
                    </Link>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li 
                            className="nav-item" 
                            onClick={toggleSearch} 
                            title="Search"
                        >
                            <FaSearch className="icon" />
                        </li>
                        <li 
                            className="nav-item" 
                            title="Cart"
                        >
                            <Link to="/cart" style={{ position: 'relative' }}>
                                <FaShoppingCart className="icon" />
                                {/* Only display count if greater than 0 */}
                                {totalItems > 0 && (
                                    <span className="cart-count">{totalItems}</span>
                                )}
                            </Link>
                        </li>
                        <li className="nav-item" title="Login / Signup">
                            <FaUser className="icon" />
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;

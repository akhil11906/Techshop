import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import productsData from '../Data/ProductsData'; // Ensure this path is correct

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);

    const { getTotalItems } = useCart();
    const searchRef = useRef();
    const searchInputRef = useRef();

    // Toggle search overlay visibility
    const toggleSearch = () => setShowSearch(prev => !prev);

    // Toggle user options (login/register)
    const toggleUserOptions = () => {
        setShowUserOptions(prev => !prev);
        setShowLogin(false);
        setShowRegister(false);
        setShowSearch(false);
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowRegister(false);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowLogin(false);
    };

    // Handle closing overlays when clicking outside
    const handleCloseOverlays = () => {
        setShowLogin(false);
        setShowRegister(false);
        setShowUserOptions(false);
        setShowSearch(false);
        setSearchResults([]);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseOverlays();
        }
    };

    // Update search suggestions based on input
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query) {
            const filteredResults = productsData.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults.slice(0, 5)); // Limit to top 5 suggestions
        } else {
            setSearchResults([]); // Clear suggestions if input is empty
        }
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            alert(`Searching for: ${searchQuery}`);
            // Navigate to search results page (optional)
        }
        setShowSearch(false);
        setSearchResults([]);
    };

    // Close search suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Search Overlay */}
            {showSearch && (
                <div style={overlayStyle} onClick={handleOverlayClick}>
                    <div ref={searchRef} style={searchOverlayContentStyle}>
                        <form 
                            onSubmit={handleSearchSubmit} 
                            style={overlayFormStyle}
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing overlay
                        >
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchQuery} 
                                onChange={handleSearchChange} 
                                style={overlayInputStyle}
                                ref={searchInputRef} 
                            />
                        </form>

                        {/* Search Suggestions */}
                        {searchResults.length > 0 && (
                            <div style={suggestionsDropdownStyle}>
                                {searchResults.map((product) => (
                                    <Link
                                        to={`/product/${product.id}`} // Link to the product details page
                                        key={product.id}
                                        style={suggestionItemStyle}
                                    >
                                        {product.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Login or Register Overlay */}
            {(showLogin || showRegister) && (
                <div style={overlayStyle} onClick={handleOverlayClick}>
                    <div 
                        style={overlayFormStyle} 
                        onClick={(e) => e.stopPropagation()} // Prevent click from closing overlay
                    >
                        <FaTimes style={closeIconStyle} onClick={handleCloseOverlays} />
                        <h2 style={{ color: '#E1DDD' }}>{showLogin ? 'Login' : 'Register'}</h2>
                        {showLogin ? (
                            <>
                                <input type="text" placeholder="Username" style={overlayInputStyle} autoComplete="off" />
                                <input type="password" placeholder="Password" style={overlayInputStyle} autoComplete="new-password" />
                                <button style={overlayButtonStyle}>Login</button>
                            </>
                        ) : (
                            <>
                                <input type="text" placeholder="Username" style={overlayInputStyle} autoComplete="off" />
                                <input type="email" placeholder="Email" style={overlayInputStyle} autoComplete="off" />
                                <input type="password" placeholder="Password" style={overlayInputStyle} autoComplete="new-password" />
                                <button style={overlayButtonStyle}>Register</button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Header */}
            <header style={headerStyle}>
                <div style={logoStyle}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <h1>TechShop</h1>
                    </Link>
                </div>
                <nav style={navStyle}>
                    <ul style={navListStyle}>
                        <li style={navItemStyle} onClick={toggleSearch} title="Search">
                            <FaSearch style={iconStyle} />
                        </li>
                        
                        <li style={navItemStyle} title="Cart">
                            <Link to="/cart" style={{ position: 'relative' }}>
                                <FaShoppingCart style={iconStyle} />
                                {getTotalItems() > 0 && (
                                    <span style={badgeStyle}>{getTotalItems()}</span>
                                )}
                            </Link>
                        </li>

                        {/* User Icon for Login/Signup */}
                        <li style={navItemStyle} title="Login / Signup">
                            <div style={userIconContainerStyle}>
                                <FaUser style={iconStyle} onClick={toggleUserOptions} />
                                {showUserOptions && (
                                    <div style={userOptionsContainerStyle}>
                                        <button onClick={toggleLogin} style={buttonBelowIconStyle}>Login</button>
                                        <button onClick={toggleRegister} style={buttonBelowIconStyle}>Register</button>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

// Define missing styles

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
};

const searchOverlayContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '5px',
    color: '#E1DDD',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
    margin: '10px auto',
};

const overlayFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '5px',
    color: '#E1DDD',
    width: '100%',
    position: 'relative',
};

const overlayInputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #555',
    borderRadius: '5px',
    color: '#E1DDD',
    backgroundColor: '#222',
    outline: 'none',
    marginBottom: '10px',
    width: '100%',
    color: 'white',
};

const overlayButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
};

const suggestionsDropdownStyle = {
    position: 'absolute',
    top: '90%',
    left: 0,
    width: '100%',
    border: '1px solid white',
    backgroundColor: '#333',
    color: '#E1DDD',
    maxHeight: '200px',
    overflowY: 'auto',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
};

const suggestionItemStyle = {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #555',
    display: 'block',
    textDecoration: 'none',
    color: 'white',
};

const badgeStyle = {
    position: 'absolute',
    top: '-18px',
    right: '-10px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '1px 5px',
    fontSize: '12px',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'black',
    boxShadow: '0 2px 5px rgba(255, 0, 0, 0.3)',
    color: '#E1DDD',
    position: 'relative',
};

const logoStyle = {
    flex: '1',
    color: '#E1DDD',
    fontSize: '24px',
};

const navStyle = {
    display: 'flex',
    alignItems: 'center',
};

const navListStyle = {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
};

const navItemStyle = {
    margin: '0 10px',
    cursor: 'pointer',
};

const iconStyle = {
    color: 'white',
    fontSize: '20px',
};

const userIconContainerStyle = {
    position: 'relative',
};

const userOptionsContainerStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#333',
    borderRadius: '5px',
    width: '150px',
    zIndex: 1000,
};

const buttonBelowIconStyle = {
    background: 'none',
    color: '#E1DDD',
    border: 'none',
    padding: '10px',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
};

const closeIconStyle = {
    top: '10px',
    right: '10px',
    fontSize: '20px',
    color: '#E1DDD',
    cursor: 'pointer',
};

export default Header;

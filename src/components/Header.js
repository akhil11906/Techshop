import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import productsData from '../Data/ProductsData'; // Ensure this path is correct
import './Header.css'

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
    const toggleSearch = () => {
        setShowSearch(prev => !prev);
        setShowUserOptions(false);
    }

    const toggleUserOptions = () => {
        setShowUserOptions(prev => !prev);
        setShowLogin(false);
        setShowRegister(false);
        setShowSearch(false);
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowRegister(false);
        setShowUserOptions(false);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowLogin(false);
        setShowUserOptions(false);
    };

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

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query) {
            const filteredResults = productsData.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults.slice(0, 5)); // Limit to top 5 suggestions
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            alert(`Searching for: ${searchQuery}`);
        }
        setShowSearch(false);
        setSearchResults([]);
    };

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
                            style={searchOverlayFormStyle}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={searchInputStyle}
                                ref={searchInputRef}
                            />
                        </form>

                        {/* Search Suggestions */}
                        {searchResults.length > 0 && (
                            <div style={suggestionsDropdownStyle}>
                                {searchResults.map((product) => (
                                    <Link
                                        to={`/product/${product.id}`}
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
                <div style={loginoverlayStyle} onClick={handleOverlayClick}>
                    <div
                        style={loginRegisterFormStyle}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaTimes style={closeIconStyle} onClick={handleCloseOverlays} />
                        <h2 style={{ color: '#E1DDD' }}>{showLogin ? 'Login' : 'Signup'}</h2>
                        {showLogin ? (
                            <>
                                <p>New to Tech-shop? <a href="#" onClick={toggleRegister}>Create an account</a></p>
                                <input type="text" placeholder="Username" style={loginRegisterInputStyle} autoComplete="off" />
                                <input type="password" placeholder="Password" style={loginRegisterInputStyle} autoComplete="new-password" />
                                <button style={loginRegisterButtonStyle}>Login</button>
                            </>
                        ) : (
                            <> 
                                <p>Already have an account? <a href="#" onClick={toggleLogin}>Login</a></p>
                                <input type="text" placeholder="Username" style={loginRegisterInputStyle} autoComplete="off" />
                                <input type="email" placeholder="Email" style={loginRegisterInputStyle} autoComplete="off" />
                                <input type="password" placeholder="Password" style={loginRegisterInputStyle} autoComplete="new-password" />
                                <input type='password' placeholder='Confirm Password' style={loginRegisterInputStyle} autoComplete='Confirm-password'/>
                                <button style={loginRegisterButtonStyle}>Signup</button>
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
                                        {/* Greeting Section */}
                                        <div style={userGreetingStyle}>
                                            <h3 className='hello'>Hello!</h3>
                                            <p>Access account manage orders</p>
                                        </div>

                                        {/* Access Account Section with Buttons Side by Side */}
                                        <div style={accountSectionStyle}>
                                            <div style={buttonContainerStyle}>
                                                <button onClick={toggleLogin} style={buttonStyle}>Login</button><span>/</span>
                                                <button onClick={toggleRegister} style={buttonStyle}>Register</button>
                                            </div>
                                        </div>

                                        {/* Horizontal Line Separator */}
                                        <hr style={hrStyle} />

                                        {/* Please Login Section */}
                                        <div style={loginPromptStyle}>
                                            <p>Please login</p>
                                        </div>
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

// Centering Overlay Style
const loginoverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
};

// Search-specific styles
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

const searchOverlayFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '5px',
    color: '#E1DDD',
    width: '100%',
    position: 'relative',
};

const searchInputStyle = {
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

// Login/Register-specific styles
const loginRegisterFormStyle = {
    ...searchOverlayFormStyle,
    width: '25%',
    backgroundColor: '#333',
};

const loginRegisterInputStyle = {
    ...searchInputStyle,
};

const loginRegisterButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
};

const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    color: '#E1DDD',
    cursor: 'pointer',
};

// Additional styles (icons, header, etc.)
const headerStyle = {
    padding: '10px',
    // backgroundColor: '#333',
    color: '#E1DDD',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const logoStyle = {
    fontSize: '24px',
};

const navStyle = {
    display: 'flex',
    alignItems: 'center',
};

const navListStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '20px',
};

const navItemStyle = {
    position: 'relative',
    cursor: 'pointer',
};

const iconStyle = {
    color: 'white',
    fontSize: '20px',
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

const userIconContainerStyle = {
    position: 'relative',
};

const userOptionsContainerStyle = {
    position: 'absolute',
    top: '30px',
    right: '0',
    // backgroundColor: '#333',
    border:'1px solid white',
    color: '#E1DDD',
    padding: '10px',
    borderRadius: '5px',
    width: '200px',
    zIndex: 1000,
};

const userGreetingStyle = {
    paddingBottom: '10px',
    // textAlign: 'center',
    fontSize:'14px'
};

const accountSectionStyle = {
    paddingBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
};

const buttonContainerStyle = {
    display: 'flex',
    // gap: '10px',
};

const buttonStyle = {
    padding: '5px 10px',
    // borderRadius: '5px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
};

const hrStyle = {
    margin: '10px 0',
};

const loginPromptStyle = {
    textAlign: 'center',
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

export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa'; // Importing FaTimes for close icon
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const overlayRef = useRef(null);
    const userOptionsRef = useRef(null); // Ref for user options

    const { getTotalItems } = useCart();

    const toggleSearch = () => setShowSearch(!showSearch);

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

    const handleCloseOverlays = () => {
        setShowLogin(false);
        setShowRegister(false);
        setShowUserOptions(false); // Ensure user options are closed as well
    };

    const handleClickOutside = (event) => {
        // Check if the click is outside both the overlay and user options
        if (
            overlayRef.current && !overlayRef.current.contains(event.target) &&
            userOptionsRef.current && !userOptionsRef.current.contains(event.target)
        ) {
            setShowSearch(false);
            setShowLogin(false);
            setShowRegister(false);
            setShowUserOptions(false);
        }
    };

    useEffect(() => {
        if (showSearch || showLogin || showRegister || showUserOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearch, showLogin, showRegister, showUserOptions]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setShowSearch(false);
    };

    return (
        <>
            {/* Search Overlay */}
            {showSearch && (
                <div style={overlayStyle}>
                    <form onSubmit={handleSearchSubmit} style={overlayFormStyle} ref={overlayRef}>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            style={overlayInputStyle}
                        />
                        <button type="submit" style={overlayButtonStyle}>Search</button>
                    </form>
                </div>
            )}

            {/* Login or Register Overlay */}
            {(showLogin || showRegister) && (
                <div style={overlayStyle}>
                    <div style={overlayFormStyle} ref={overlayRef}>
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
                                    <div style={userOptionsContainerStyle} ref={userOptionsRef}>
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


// Styles (same as before)
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const overlayFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '5px',
    color: '#E1DDD',
    width: '300px',
    position: 'relative', // Allows positioning of close icon
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
};

const overlayButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
};

// Badge Style
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

// Header Styles
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
    fontSize: '20px',
    fontWeight: 'bold',
};

const navStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
};

const navListStyle = {
    listStyleType: 'none',
    display: 'flex',
    padding: 0,
    margin: 0,
};

const navItemStyle = {
    marginLeft: '20px',
    cursor: 'pointer',
    color: '#E1DDD',
    transition: 'color 0.3s',
    position: 'relative',
};

// New styles for user icon and buttons
const userIconContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const userOptionsContainerStyle = {
    position: 'absolute',
    top: '30px',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 1000,
};

const buttonBelowIconStyle = {
    padding: '5px 10px',
    fontSize: '14px',
    border: 'none',
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '5px',
    width: '100%',
};

const iconStyle = {
    color: 'white',
    fontSize: '20px',
};

const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
};

export default Header;

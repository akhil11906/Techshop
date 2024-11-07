import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Adjust the path as needed
import Footer from './components/Footer'; // Adjust the path as needed
import Home from './components/Home'; // Your home page component
import Cart from './components/CartPage'; // Your cart page component
import Login from './components/Login'; // Login page component
import Register from './components/Register'; // Register page component
import './App.css';
import AllProducts from './components/AllProducts'; // Your all products component

const App = () => {
    return (
        <Router>
            <Header />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-products" element={<AllProducts />} /> {/* Use 'element' prop instead of 'component' */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;

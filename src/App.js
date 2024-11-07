import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/CartPage';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';  // Import the ProductDetail component

const App = () => {
    return (
        <Router>
            <Header />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-products" element={<AllProducts />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:id" element={<ProductDetail />} /> {/* Route for individual product */}
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;

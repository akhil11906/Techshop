import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Adjust the path as needed
import Footer from './components/Footer'; // Adjust the path as needed
import Home from './components/Home'; // Your home page component
import Cart from './components/CartPage'; // Your cart page component

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;

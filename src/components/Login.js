// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', { email, password })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    };

    return (
        <div className="login-container"> {/* Updated class name to match CSS */}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label> {/* Added htmlFor for accessibility */}
                <input
                    type="email"
                    id="email" // Added ID for the label to reference
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label> {/* Added htmlFor for accessibility */}
                <input
                    type="password"
                    id="password" // Added ID for the label to reference
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

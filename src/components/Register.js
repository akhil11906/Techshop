// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa'; // Importing an "X" icon from React Icons
import './Register.css'; // Import the CSS file

const Register = ({ onClose }) => { // Accepting onClose as a prop to close the modal
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate passwords
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Clear error message if passwords match
        setError('');

        // Proceed with the registration request
        axios.post('http://localhost:5000/register', { name, email, password })
            .then(response => {
                console.log(response.data);
                // Optionally, redirect or show a success message
            })
            .catch(error => {
                console.error('Error registering:', error);
                // Handle registration error (e.g., setError(error.response.data.message))
            });
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Register</h2>
                <FaTimes className="close-icon" onClick={onClose} /> {/* Close icon */}
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Register;

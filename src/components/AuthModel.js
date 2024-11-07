import React, { useState } from 'react';
import Login from './Login';
import Register from './Register.js';
import './Authmodel.css'

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null; 

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                
                <div className="auth-toggle">
                    <button 
                        onClick={() => setIsLogin(true)}
                        className={isLogin ? "active" : ""}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => setIsLogin(false)} 
                        className={!isLogin ? "active" : ""}
                    >
                        Signup
                    </button>
                </div>
                {isLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
};

export default AuthModal;
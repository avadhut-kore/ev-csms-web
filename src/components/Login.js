// src/Login.js
import React, { useState } from 'react';
import   './../asset/all-css/LoginForm.css';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Login = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
      onClose(); // Close the modal after submitting
    };
  
    if (!isOpen) return null;
  
    return (
        <div style={styles.modalOverlay}>
        <div style={styles.container}>
            <div style={styles.textContainer}>
                <div  style={{ padding:'38px' }}>
                <h2>Join the largest EV community. Fast and Free.</h2>
                <h3>Exclusive Member Benefits:</h3>
                <ul style={styles.benefitsList}>
                    <li>Add your voice. Leave reviews, tips, photos, and more</li>
                    <li>Add your vehicle. Automatically see only compatible chargers</li>
                    <li>Exclusive access to Trip Planner: smart routing for long journeys</li>
                    <li>Alerts when chargers open near you (app only)</li>
                    <li>Driver to driver messaging (app only)</li>
                </ul>
                </div>
            </div>
            <div style={styles.modal}>
                <h2 style={styles.header}>Login</h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <a href="/auth/google" style={styles.icon}>
                    <FaGoogle style={{ width: '50%',color: '#738677' }} />
                </a>
                <a href="/auth/facebook"  style={styles.icon }>
                    <FaFacebookF />
                </a>
                <a href="/auth/twitter" style={styles.icon}>
                    <FaXTwitter />
                </a>
                <a href="/auth/instagram" style={styles.icon}>
                    <FaInstagram />
                </a>
    </div>
    <p style={styles.loginText} >or use your email password</p>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                    <button type="button" onClick={onClose} style={styles.button}>Close</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Login;



// Inline styles
const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: 1000,
        zIndex: 9999
    },
    container: {
        display: 'flex',
        width: '800px',
        height: '500px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    textContainer: {
        flex: 1,
        // padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    color: "white",
    backgroundColor: "black"
    },
    benefitsList: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    modal: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        marginBottom: '20px',
        fontSize: '24px',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#738677',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    icon: {
        margin: '0 10px', // Space between icons
        width: '48px',    // Width of each icon
        height: '49px',   // Height of each icon
        cursor: 'pointer', // Pointer cursor on hover
        border: '1px solid #ccc', // Optional border
        borderRadius: '27%', // Optional rounded corners
        display: 'flex', // Ensures the icon is centered in the border
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', // Optional background color
        transition: 'background-color 0.3s', // Optional hover effect
        color: '#738677'
    },
    loginText:{
        textAlign:"center"
    }
};
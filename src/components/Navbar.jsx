// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import '../styles/Home.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <img src="img/logo.png" className="logo" alt="Logo" />
      <ul className="links-container">
        <li className="link-item">
          <Link to="/" className="link">Home</Link>
        </li>
        {user ? (
          <>
            <li className="link-item">
              <Link to="/blog-editor" className="link">Blog Editor</Link>
            </li>
            <li className="link-item">
              <button onClick={handleLogout} className="link">Logout</button>
            </li>
          </>
        ) : (
          <li className="link-item">
            <Link to="/login" className="link">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};


export default Navbar;

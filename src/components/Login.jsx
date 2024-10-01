import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; 
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      console.log("Login successful");
      navigate("/blog-editor"); 
    } catch (error) {
      alert("Invalid credentials or error occurred: " + error.message);
    }
  };

  return (
    <div className="ring">
      <i style={{ '--clr': '#00ff0a' }}></i>
      <i style={{ '--clr': '#ff0057' }}></i>
      <i style={{ '--clr': '#fffd44' }}></i>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputBx">
            <input
              type="email" 
              placeholder="Email"
              value={email}  
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="inputBx">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputBx">
            <input type="submit" value="Sign in" />
          </div>
          <div className="links">
            <a href="#">Forget Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
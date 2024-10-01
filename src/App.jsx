import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import BlogEditor from './components/BlogEditor'; 
import Blog from './components/Blog'; 
import PrivateRoute from './components/PrivateRoute'; 

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/blog-editor" 
          element={<PrivateRoute element={BlogEditor} />} 
        />
        <Route path="/blog/:blogId" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;

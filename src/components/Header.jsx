import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Home.css'; 

const Header = ({ latestBlogId }) => {  
    return (
        <header className="header">
            <div className="content">
                <h1 className="heading">
                    <span className="small">Welcome to the world of</span>
                    Blog
                    <span className="no-fill">Reading</span>
                </h1>
                {latestBlogId ? (
                    <Link to={`/blog/${latestBlogId}`} className="btn">Read the Latest Blog</Link>
                ) : (
                    <p>No blog available</p>
                )}
            </div>
        </header>
    );
};

export default Header;

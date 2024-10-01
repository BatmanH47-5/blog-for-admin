// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';  
import '../styles/Home.css'; 
import Header from './Header';  

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsSnapshot = await db.collection("blogs").get(); 
                const blogsData = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const currentBlogId = decodeURI(window.location.pathname.split("/").pop());

    return (
        <>
            <Header latestBlogId={blogs[0]?.id} />  
            <section className="blogs-section">
                {blogs.length === 0 ? (
                    <p>No blogs available</p>  
                ) : (
                    blogs.map(blog => 
                        blog.id !== currentBlogId && (
                            <div className="blog-card" key={blog.id}>
                                <img src={blog.bannerImage} className="blog-image" alt={blog.title} />
                                <h1 className="blog-title">{blog.title.length > 100 ? `${blog.title.substring(0, 100)}...` : blog.title}</h1>
                                <p className="blog-overview">{blog.article.length > 200 ? `${blog.article.substring(0, 200)}...` : blog.article}</p>
                                <Link to={`/${blog.id}`} className="btn dark">Read</Link>
                            </div>
                        )
                    )
                )}
            </section>
        </>
    );
};

export default Home;

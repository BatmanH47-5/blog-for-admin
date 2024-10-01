import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Blog.css';
import '../styles/Home.css';
import '../styles/BlogEditor.css';

const Blog = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { blogId } = useParams();

  useEffect(() => {
    fetch(`/api/blog/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setBlogData(data);
        } else {
          window.location.replace('/');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blog:', err);
        setLoading(false);
      });
  }, [blogId]);

  const addArticle = (data) => {
    return data.split("\n").filter(item => item.length).map((item, index) => {
      if (item[0] === '#') {
        let hCount = 0;
        let i = 0;
        while (item[i] === '#') {
          hCount++;
          i++;
        }
        const Tag = `h${hCount}`;
        return <Tag key={index}>{item.slice(hCount).trim()}</Tag>;
      } else if (item[0] === "!" && item[1] === "[") {
        const separator = item.indexOf('](');
        if (separator !== -1) {
          const alt = item.slice(2, separator);
          const src = item.slice(separator + 2, -1);
          return <img key={index} src={src} alt={alt} className="article-image" />;
        }
      } else {
        return <p key={index}>{item}</p>;
      }
      return null;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blogData) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="blog">
      <div className="banner" style={{ backgroundImage: `url(${blogData.bannerImage})` }}></div>
      <h1 className="title">{blogData.title}</h1>
      <p className="published"><span>published at - </span>{blogData.publishedAt}</p>
      <div className="article">{addArticle(blogData.article)}</div>
    </div>
  );
};

export default Blog;

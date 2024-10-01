import React, { useState } from 'react';
import '../styles/BlogEditor.css';
import '../styles/Home.css';

const BlogEditor = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [article, setArticle] = useState('');
  const [bannerPath, setBannerPath] = useState('');

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("image")) {
      uploadImage(file);
    } else {
      alert("Upload Image only");
    }
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        setBannerPath(`${window.location.origin}/${data}`);
      });
  };

  const handlePublish = () => {
    if (blogTitle && article) {
      fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: blogTitle,
          article,
          bannerImage: bannerPath,
        }),
      })
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            window.location.href = `/blog/${data.blogId}`;
          }
        })
        .catch((err) => {
          console.error('Error publishing the blog:', err);
        });
    }
  };

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${bannerPath})` }}>
        <input type="file" accept="image/*" id="banner-upload" hidden onChange={handleBannerChange} />
        <label htmlFor="banner-upload" className="banner-upload-btn">
          <img src="img/upload.png" alt="upload banner" />
        </label>
      </div>

      <div className="blog">
        <textarea
          className="title"
          placeholder="Blog title..."
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <textarea
          className="article"
          placeholder="Start writing here..."
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        />
      </div>

      <div className="blog-options">
        <button className="btn dark publish-btn" onClick={handlePublish}>Publish</button>
        <input type="file" accept="image/*" id="image-upload" hidden />
        <label htmlFor="image-upload" className="btn grey upload-btn">Upload Image</label>
      </div>
    </div>
  );
};

export default BlogEditor;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Slider.css";

const BlogPostCarousel = ({ blogPosts }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === blogPosts.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? blogPosts.length - 1 : current - 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 10000);
    return () => clearInterval(slideInterval);
  }, [current, blogPosts.length]);

  return (
    <div className="blog-carousel">
      <button className="left-arrow" onClick={prevSlide}>&#10094;</button>
      <button className="right-arrow" onClick={nextSlide}>&#10095;</button>
      {blogPosts.map((post, index) => (
      <div className={index === current ? 'slide active' : 'slide'} key={index}>
        {index === current && (
          <div>
            <div className="content">
              <h3 className="title">{post.title}</h3>
              <span className="author">{post.author.name}</span>
              <Link to={post.link} className="read-now">READ NOW</Link> {/* This will now be below the author */}
            </div>
            {post.image ? (
              <img src={post.image} alt={post.title} className="carousel-image" />
            ) : (
              <div>No image URL</div>
            )}
          </div>
        )}
      </div>
      ))}

    </div>
  );
};

export default BlogPostCarousel;

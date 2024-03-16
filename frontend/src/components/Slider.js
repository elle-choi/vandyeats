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
    console.log(blogPosts); // Debugging: Ensure this logs expected data structure
    const slideInterval = setInterval(nextSlide, 10000); // Adjust as needed

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
              {post.image ? ( // Adjusted to use 'post.image'
                <img src={post.image} alt={post.title} className="carousel-image" />
              ) : (
                <div>No image URL</div> // Helpful for debugging
              )}
              <div className="content">
                <span className="author">{post.author.name}</span>
                <h3 className="title">{post.title}</h3>
                <Link to={post.link} className="read-now">READ NOW</Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogPostCarousel;

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
    const slideInterval = setInterval(nextSlide, 10000); // Slides every 3 seconds

    return () => clearInterval(slideInterval); // Clear interval when the component unmounts
  }, [current, blogPosts.length, nextSlide]); // Add nextSlide to the dependency array

  return (
    <div className="blog-carousel">
      <button className="left-arrow" onClick={prevSlide}>&#10094;</button>
      <button className="right-arrow" onClick={nextSlide}>&#10095;</button>
      {blogPosts.map((post, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (
              <div>
                <img src={post.imageUrl} alt={post.title} />
                <div className="content">
                  <span className="author">{post.author}</span>
                  <h3 className="title">{post.title}</h3>
                  <Link to={post.link} className="read-now">READ NOW</Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BlogPostCarousel;

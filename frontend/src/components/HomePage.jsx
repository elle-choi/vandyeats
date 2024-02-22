import React from 'react';
import Navbar from './NavBar.js'; // Assuming you have a Navbar component
import BlogPostCarousel from './Slider.js';
import TrendingRestaurants from './TrendingRestaurants';
import { blogPostsData } from './RestaurantData';
import './HomePage.css'; // Your CSS file for HomePage

const HomePage = () => {


  return (
    <div className="homepage">
      <Navbar />
      <BlogPostCarousel blogPosts={blogPostsData} />
      <TrendingRestaurants />
      {/* ... other homepage content ... */}
    </div>
  );
};

export default HomePage;

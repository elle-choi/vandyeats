// HomePage.js
import React, { useEffect, useState } from 'react';
import Navbar from './NavBar.js'; // Assuming you have a Navbar component
import BlogPostCarousel from './Slider.js';
import TrendingRestaurants from './TrendingRestaurants';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have this Firebase setup
import './HomePage.css'; // Your CSS file for HomePage

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        link: `/blog/${doc.id}`, // Assuming you have a route to individual blog posts
      }));
      setBlogPosts(posts);
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="homepage">
      <Navbar Navbar={Navbar} />
      <BlogPostCarousel blogPosts={blogPosts} />
      <TrendingRestaurants restaurants={restaurants} />
      {/* Other homepage content */}
    </div>
  );
};

export default HomePage;

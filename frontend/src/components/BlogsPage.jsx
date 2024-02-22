import React from "react";
import Navbar from "./NavBar.js";
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const createPost = async () => {
    try {
      // Your createPost logic here
      console.log('Success');
      navigate("/createpost");
    } catch (error) {
      console.error('Error:', error);
    }
  };
    return (
      <div>
        <Navbar />
        <div className="content">
          <h1>Welcome to the Blogs Page</h1>
          <button onClick={createPost} className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">
        Create Post and Go to /createposts
      </button>
        </div>
      </div>
    );
  };
  
  export default Home;

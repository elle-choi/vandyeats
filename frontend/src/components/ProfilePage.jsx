import React from "react";
import Navbar from "./NavBar.js";
import "./HomePage.css";

const Home = () => {
    return (
      <div>
        <Navbar />
        <div className="content">
          <h1>Welcome to the Profile Page</h1>
        </div>
      </div>
    );
  };
  
  export default Home;

import React from "react";
import { Link } from "react-router-dom";
import logoLeft from "../assets/Vanderbilt_University_logo.png";
import logoRight from "../assets/logo.png";
import "./NavBar.css"

const Navbar = () => {
    return (
      <div className="navbar">
        <div className="left-section">
        <Link to="/home">
          <img src={logoLeft} alt="Left Logo" className="logo-left" />
        </Link>
          <div className="links">
            <Link to="/restaurant">Restaurant</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
        <div className="right-section">
          <img src={logoRight} alt="Right Logo" className="logo-right" />
        </div>
      </div>
    );
  };
  
  export default Navbar;

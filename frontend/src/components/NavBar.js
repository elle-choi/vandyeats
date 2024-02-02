import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoLeft from "../assets/Vanderbilt_University_logo.png";
import logoRight from "../assets/logo.png";
import "./NavBar.css"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className={`navbar ${menuOpen ? "open" : ""}`}>
      <div className="left-section">
        <Link to="/home">
          <img src={logoLeft} alt="Left Logo" className="logo-left" />
        </Link>
        <div className={`links ${menuOpen ? "show" : ""}`}>
          <Link to="/restaurant">Restaurant</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
      <div className="right-section">
        <img src={logoRight} alt="Right Logo" className="logo-right" />
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
    </div>
  );
};

export default Navbar;

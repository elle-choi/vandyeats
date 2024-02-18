import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoLeft from "./Vanderbilt_University_logo.png";
import logoRight from "./logo.png";
import "./NavBar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Example log out function
    const handleLogout = () => {
        console.log("User logged out");
    };

    return (
      <div className={`navbar ${menuOpen ? "open" : ""}`}>
          <div className="left-section">
              <Link to="/home" className="logo-link">
                  <img src={logoLeft} alt="Left Logo" className="logo-left" />
              </Link>
              
              <div className={`links ${menuOpen ? "show" : ""}`}>
                  <Link to="/restaurant">Restaurant</Link>
                  <Link to="/blogs">Blogs</Link>
                  <Link to="/profile">Profile</Link>
              </div>
          </div>
          <div className="middle-section flex-1 flex flex-row-reverse">
            <div className="mr-4">
              <Link to="/login">
                <span className="rounded-sm bg-green-600 ">Logout</span>
                {/* // Change rounded-sm and bg-green-600 to change Logout Button // */}
              </Link>
            </div>
          </div>
          <div className="right-section">
              {/* Move the logout button here, to the left of the logoRight */}
              <img src={logoRight} alt="Right Logo" className="logo-right" />
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
              &#9776;
          </div>
      </div>
  );
};

export default Navbar;

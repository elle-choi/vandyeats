import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './RestaurantPage.css';
import NavBar from './NavBar';
// Importing images from assets
import bannerImage from '../assets/campus-dining-background.png';
import banhMiRoll from '../assets/bahn-mi-roll.png';
import baristaParlor from '../assets/barista-parlor.png';
import biscuitLove from '../assets/biscuit-love.png';
import centralBbq from '../assets/central-bbq.png';
import grainBerry from '../assets/grain-berry.png';
import sitar from '../assets/sitar.png';
import cheeserie from '../assets/grilled-cheeserie.png';
import hopdoddy from '../assets/hopdoddy.png';
import jenis from '../assets/jenis.png';
import meet from '../assets/meet-noodles.png';
import eighty from '../assets/sushi-88.png';
import mama from '../assets/taco-mama.png';
import urban from '../assets/urbanjuicer.png';
import jerrys from '../assets/ben-jerrys.png';
import chuy from '../assets/chuy.png';
import donatos from '../assets/donatos.png';
import helens from '../assets/helens.png';
import poki from '../assets/poki.png';




const RestaurantPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement your search logic here
  };

  return (
    <div className="restaurant-page">
      <NavBar />
      <div className="container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button"></button>
        </form>
      </div>
      <div className="banner">
        <img src={bannerImage} alt="Campus Dining Division of Administration" />
      </div>
      <div className="content">
  <h1 className="title">Taste of Nashville</h1>
  <hr className="title-line" /> {/* This is the line added after the title */}
  <p>VU Meal Plans provide you with a Meal Money Account that can be used to purchase food at all on-campus restaurants and Markets, as well as at participating off-campus restaurants through the Taste of Nashville program.</p>
  <p className="balance-info">You can check your balance or add to your Meal Money Account anytime by visiting the Commodore Card Office online or in 184 Sarratt.</p>
  <div className="restaurants-grid">
    {/* Restaurant items */}
    <div className="restaurant">
            {/* Replace <a> with Link */}
            <Link to="/BahnMi">
              <img src={banhMiRoll} alt="Banh Mi & Roll" />
              <p>Banh Mi & Roll +</p>
            </Link>
          </div>

          <div className="restaurant">
            <img src={baristaParlor} alt="Barista Parlor" />
            <p>Barista Parlor</p>
          </div>
          <div className="restaurant">
            <img src={biscuitLove} alt="Biscuit Love" />
            <p>Biscuit Love</p>
          </div>
          <div className="restaurant">
            <img src={centralBbq} alt="Central BBQ" />
            <p>Central BBQ</p>
          </div>
          <div className="restaurant">
            <img src={grainBerry} alt="Grain & Berry" />
            <p>Grain & Berry</p>
          </div>
          <div className="restaurant">
            <img src={sitar} alt="Sitar" />
            <p>Sitar</p>
          </div>
        
          
          {/* Add other restaurants here */}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;

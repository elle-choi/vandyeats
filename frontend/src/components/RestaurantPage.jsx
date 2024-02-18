import React from 'react';
import Navbar from './NavBar'; // Your existing NavBar component
import campusDiningBackground from '../assets/campus-dining-background.jpeg';
import bahnMiRollImage from '../assets/bahn-mi-roll.png'; // Import individual restaurant images
import baristaParlorImage from '../assets/barista-parlor.png';
import biscuitLoveImage from '../assets/biscuit-love.png';
import centralBbqImage from '../assets/central-bbq.png';
import grainBerryImage from '../assets/grain-berry.png';
import sitarImage from '../assets/sitar.png';
import './RestaurantPage.css'; // Make sure to have the correct path to your CSS file

// Define images for each restaurant
const restaurants = [
  { name: 'Bahn Mi & Roll+', imageUrl: bahnMiRollImage },
  { name: 'Barista Parlor', imageUrl: baristaParlorImage },
  { name: 'Biscuit Love', imageUrl: biscuitLoveImage },
  { name: 'Central BBQ', imageUrl: centralBbqImage },
  { name: 'Grain & Berry', imageUrl: grainBerryImage },
  { name: 'Sitar', imageUrl: sitarImage },
  // ...add more restaurants as needed
];

const RestaurantPage = () => {
  return (
    <div className="restaurant-page">
      <Navbar />
      <div className="search-container">
        <input type="text" placeholder="Search ..." className="search-input" />
        <button className="search-button">🔍</button>
      </div>
      {/* Page Header with Background Image */}
      <div className="page-header" style={{ backgroundImage: `url(${campusDiningBackground})` }}>
        <h1>Campus Dining</h1>
      </div>
      <div className="taste-nashville-section">
        <h2>Taste of Nashville</h2>
        <p>
          VU Meal Plans provide you with a Meal Money Account that can be used to purchase food at all on-campus restaurants and Markets, as well as at participating off-campus restaurants through the Taste of Nashville program.
        </p>
        <p>
          You can check your balance or add to your Meal Money Account anytime by visiting the Commodore Card Office online or in 184 Sarratt.
        </p>
        <div className="restaurant-logos">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-logo-card">
              <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-image" />
              <span>{restaurant.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default RestaurantPage;

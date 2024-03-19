import React from 'react';
import sitarLogo from '../assets/sitar.png';
import grainberryLogo from '../assets/grain-berry.png';
import centralbbqLogo from '../assets/central-bbq.png';
import biscuitloveLogo from '../assets/biscuit-love.png';
import "./TrendingRestaurants.css";

const TrendingRestaurants = () => {
  const restaurants = [
    { name: 'Biscuit Love', logo: biscuitloveLogo },
    { name: 'Sitar Indian Food', logo: sitarLogo },
    { name: 'Grains and Berries', logo: grainberryLogo },
    { name: 'Central BBQ', logo: centralbbqLogo }
  ];

  return (
    <div className="trending-restaurants">
      <h2 className="trending-restaurants-title">Trending Restaurants</h2>
      <div className="restaurants-list">
        {restaurants.map((restaurant, index) => (
          <div className="restaurant-item" key={index}>
            <img src={restaurant.logo} alt={restaurant.name} />
            <span>{restaurant.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRestaurants;

// TrendingRestaurants.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TrendingRestaurants.css';

const TrendingRestaurants = ({ restaurants }) => {
  return (
    <div className="trending-restaurants">
      <h2 className="trending-restaurants-title">Trending Restaurants</h2>
      <div className="restaurants-list">
        {restaurants.map((restaurant, index) => (
          <div className="restaurant-item" key={index}>
            <Link to={`/restaurant/restaurantinfo/${encodeURIComponent(restaurant.name)}`}>
              <img src={restaurant.logo} alt={restaurant.name} />
              <span>{restaurant.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRestaurants;

// TrendingRestaurants.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TrendingRestaurants.css';

const restaurantInfoLinks = {
  "Banh Mi & Roll": 0,
  "Barista Parlor": 1,
  "Biscuit Love": 2,
  "Central BBQ": 3,
  "Grain & Berry": 4,
  "The Grilled Cheeserie": 5,
  "Hopdoddy Burger Bar": 6,
  "Jeni's Splendid Ice Creams": 7,
  "Meet Noodles": 8,
  "Sushi 88": 9,
  "Taco Mama": 10,
  "The Urban Juicer": 11,
  "Ben & Jerry's": 12,
  "Chuy's Tex Mex": 13,
  "Donatos Pizza": 14,
  "Helen's Hot Chicken": 15,
  "The Poki": 16,
  "Sarabha's Creamery": 17,
  "The Slider House": 18,
  "Urban Cookhouse": 19,
  "8th and Roast": 20,
  "Bombay Palace": 21,
  "Chili's": 22,
  "Crab Fever": 23,
  "Hyderabad House": 24,
  "Wendy's": 25,
  "Inchin's Bamboo Garden": 26,
  "Papa John's": 27,
  "Sitar": 28,
  "Sun & Fork": 29,
  "Yaki House": 30,
  "Elliston Place Soda Shop": 31,
  "Frutta Bowl": 32,
  "I Love Sushi": 33,
  "Roma Pizza & Pasta": 34,
  "Jet's Pizza": 35,
  "Michaelangelo's Pizza": 36,
  "Oscar's Taco Shop": 37,
  "Poke Bros": 38,
  "Satay Thai Grill": 39,
  "Sweet Dots Bubble Tea": 40,
  "Holy Smokes": 41,
  "Red Bicycle": 42,
  "Woodlands": 43,
};


const TrendingRestaurants = ({ restaurants }) => {
  return (
    <div className="trending-restaurants">
      <h2 className="trending-restaurants-title">Trending Restaurants</h2>
      <div className="restaurants-list">
        {restaurants.map((restaurant, index) => (
          <div className="restaurant-item" key={index}>
            <Link to={`/restaurant/restaurantinfo?re_info=${restaurantInfoLinks[restaurant.name]}`}>
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

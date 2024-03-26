import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar.js'; // Ensure consistent import style
import './RestaurantPage.css'; // Import CSS for styling
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
import boots from '../assets/twoboots.png';
import sarabhas from '../assets/sarabhas.png';
import slider from '../assets/slider.png';
import cookhouse from '../assets/urban.png';
import roast from '../assets/roast.png';
import bombay from '../assets/bombay.png';
import chilis from '../assets/chilis.png';
import crab from '../assets/crab-fever.png';
import hyderabad from '../assets/hyderabad.png';
import wendys from '../assets/Wendys.png';
import inchins from '../assets/inchins.png';
import johns from '../assets/johns.png';
import fork from '../assets/fork.png';
import yaki from '../assets/yaki.png';
import soda from '../assets/soda.png';
import frutta from '../assets/fruttabowls.png';
import sushi from '../assets/iLoveSushi.png';
import roma from '../assets/roma.png';
import jets from '../assets/jets.png';
import michaelangelos from '../assets/michaelangelos.png';
import oscars from '../assets/oscars.png';
import pokebros from '../assets/pokebros.png';
import satay from '../assets/satay.png';
import sweetdots from '../assets/sweetdots.png';
import woodlands from '../assets/woodlands.png';





const RestaurantPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery); // Implement your search logic here
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <div className='bg-[#fff] flex flex-grow w-full mt-16'>
        <div className="res-container mx-auto">
          <form onSubmit={handleSearchSubmit} className="res-search-form">
            <input
              type="text"
              placeholder="Search ..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="res-search-input"
            />
            <button type="submit" className="res-search-button">Search</button>
          </form>
          <div className="res-banner">
            <img src={bannerImage} alt="Campus Dining Division of Administration" />
          </div>
          <div className="res-content">
            <h1 className="res-title">Taste of Nashville</h1>
            <hr className="res-title-line" />
            <p>VU Meal Plans provide you with a Meal Money Account that can be used to purchase food at all on-campus restaurants and Markets, as well as at participating off-campus restaurants through the Taste of Nashville program.</p>
            <p className="res-balance-info">You can check your balance or add to your Meal Money Account anytime by visiting the Commodore Card Office online or in 184 Sarratt.</p>
            <div className="restaurants-grid">
              {/* Restaurant items */}
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={banhMiRoll} alt="Banh Mi & Roll" />
                  <p>Banh Mi & Roll +</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=1"}>
                  <img src={baristaParlor} alt="Barista Parlor" />
                  <p>Barista Parlor</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={biscuitLove} alt="Biscuit Love" />
                  <p>Biscuit Love</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={centralBbq} alt="Central BBQ" />
                  <p>Central BBQ</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={grainBerry} alt="Grain & Berry" />
                  <p>Grain & Berry</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={cheeserie} alt="The Grilled Cheeserie" />
                  <p>The Grilled Cheeserie</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={hopdoddy} alt="Hopdoddy Burger Bar" />
                  <p>Hopdoddy Burger Bar</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={jenis} alt="Jeni's Spendid Ice Cream" />
                  <p>Jeni's Spendid Ice Cream</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={meet} alt="Meet Noodles" />
                  <p>Meet Noodles</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={eighty} alt="Sushi 88" />
                  <p>Sushi 88</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={mama} alt="Taco Mama" />
                  <p>Taco Mama</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={urban} alt="The Urban Juicer" />
                  <p>The Urban Juicer</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={jerrys} alt="Ben & Jerry's" />
                  <p>Ben & Jerry's</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={chuy} alt="Chuy's Tex Mex" />
                  <p>Chuy's Tex Mex</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={donatos} alt="Donatos Pizza" />
                  <p>Donatos Pizza</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={helens} alt="Helen's Hot Chicken" />
                  <p>Helen's Hot Chicken </p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={cookhouse} alt="Urban Cookhouse" />
                  <p>Urban Cookhouse</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={roast} alt="8th and Roast" />
                  <p>8th and Roast</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={bombay} alt="Bombay Palace" />
                  <p>Bombay Palace</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={chilis} alt="Chili's" />
                  <p>Chili's</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={crab} alt="Crab Fever" />
                  <p>Crab Fever</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={hyderabad} alt="Hyderabad House" />
                  <p>Hyderabad House</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={wendys} alt="Wendy's" />
                  <p>wendys</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={inchins} alt="Inchin's Bamboo Garden" />
                  <p>Inchin's Bamboo Garden</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={johns} alt="Papa John's" />
                  <p>Papa John's</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={sitar} alt="Sitar" />
                  <p>Sitar</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={fork} alt="Sun & Fork" />
                  <p>Sun & Fork</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={yaki} alt="Yaki House" />
                  <p>Yaki House</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={soda} alt="Elliston Place Soda Shop" />
                  <p>Elliston Place Soda Shop</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={frutta} alt="Frutta Bowl" />
                  <p>Frutta Bowl</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={sushi} alt="I Love Sushi" />
                  <p>I Love Sushi</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={roma} alt="Roma Pizza & Pasta" />
                  <p>Roma Pizza & Pasta</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={jets} alt="Jet's Pizza" />
                  <p>Jet's Pizza</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={michaelangelos} alt="Michaelangelo's Pizza" />
                  <p>Michaelangelo's Pizza</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={oscars} alt="Oscar's Taco Shop" />
                  <p>Oscar's Taco Shop</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={pokebros} alt="Poke Bros" />
                  <p>Poke Bros</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={satay} alt="Satay Thai Grill" />
                  <p>Satay Thai Grill</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={sweetdots} alt="Sweet Dots Bubble Tea" />
                  <p>Sweet Dots Bubble Tea</p>
                </Link>
              </div>
              <div className="restaurant">
                <Link to={"restaurantinfo?re_info=0"}>
                  <img src={woodlands} alt="Woodlands" />
                  <p>Woodlands</p>
                </Link>
              </div>


              {/* Repeat for other restaurants */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;

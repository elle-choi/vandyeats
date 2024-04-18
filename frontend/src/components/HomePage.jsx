import React, { useEffect, useState } from 'react';
import Navbar from './NavBar.js';
import BlogPostCarousel from './Slider.js';
import TrendingRestaurants from './TrendingRestaurants';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this is correctly imported

import './HomePage.css';
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


const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);

  useEffect(() => {
    fetchBlogPosts();
    fetchAndProcessRestaurants();
  }, []);

  const fetchBlogPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      link: `/blog/${doc.id}`,
    }));
    setBlogPosts(posts);
  };

  const fetchAndProcessRestaurants = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let restaurantPostsCount = {};

    querySnapshot.forEach((doc) => {
      const { restaurant } = doc.data();
      if (!restaurantPostsCount[restaurant]) {
        restaurantPostsCount[restaurant] = 0;
      }
      restaurantPostsCount[restaurant] += 1;
    });

    console.log("Restaurant Posts Count:", restaurantPostsCount);

    const sortedRestaurants = Object.entries(restaurantPostsCount)
      .map(([name, count]) => ({
        name,
        postCount: count,
        logo: getRestaurantLogo(name), // Use function to get logo
      }))
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 4);

    console.log("Sorted Top Restaurants:", sortedRestaurants);

    setTopRestaurants(sortedRestaurants);
  };



  const getRestaurantLogo = (restaurantName) => {
    const logoMap = {
    "Banh Mi & Roll": banhMiRoll,
      "Barista Parlor": baristaParlor,
      "Biscuit Love": biscuitLove,
      "Central BBQ": centralBbq,
      "Grain & Berry": grainBerry,
      "Sitar": sitar,
      "The Grilled Cheeserie": cheeserie,
      "Hopdoddy Burger Bar": hopdoddy,
      "Jeni’s Splendid Ice Creams": jenis,
      "Meet Noodles": meet,
      "Sushi 88": eighty,
      "Taco Mama": mama,
      "The Urban Juicer": urban,
      "Ben & Jerry’s": jerrys,
      "Chuy’s Tex Mex": chuy,
      "Donatos Pizza": donatos,
      "Helen’s Hot Chicken": helens,
      "Poki": poki,
      "Two Boots": boots,
      "Sarabha’s": sarabhas,
      "The Slider House": slider,
      "Urban Cookhouse": cookhouse,
      "8th and Roast": roast,
      "Bombay Palace": bombay,
      "Chili’s": chilis,
      "Crab Fever": crab,
      "Hyderabad House": hyderabad,
      "Wendy’s": wendys,
      "Inchin’s Bamboo Garden": inchins,
      "Papa John’s": johns,
      "Sun & Fork": fork,
      "Yaki House": yaki,
      "Elliston Place Soda Shop": soda,
      "Frutta Bowls": frutta,
      "I Love Sushi": sushi,
      "Roma Pizza & Pasta": roma,
      "Jet’s Pizza": jets,
      "Michaelangelo’s Pizza": michaelangelos,
      "Oscar’s Taco Shop": oscars,
      "Poke Bros.": pokebros,
      "Satay Thai Grill": satay,
      "Sweet Dots Bubble Tea": sweetdots,
      "Woodlands": woodlands,
  };
  return logoMap[restaurantName] || "oscars";
};

  return (
    <div className="homepage">
      <Navbar />
      <BlogPostCarousel blogPosts={blogPosts} />
      <div className="separator-bar"></div> 
      <TrendingRestaurants restaurants={topRestaurants} />
    </div>
  );
};

export default HomePage;

 

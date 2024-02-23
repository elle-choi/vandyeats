/*Later, use this to import data from firebase to the array? Or maybe we can direclty 
link the HomePage to the array to get the link*/
//This file includes all the data from blogs and restaurants. Should we manually update them or fetch them from google or something?
// src/data.js

import { Link } from "react-router-dom";
import example1 from '../assets/IloveSushi-ex2.png';
import example2 from '../assets/Satay-ex1.png';

// Sample data for blog posts
export const blogPostsData = [
  {
    imageUrl: example1,
    title: 'The best Sushi in Town!!!!',
    author: 'Jane Doe',
    link: '/blogs'  // Update this with the actual path
  },
  {
    imageUrl: example2,
    title: 'What is your favorite meal at Satay?',
    author: 'John Doe',
    link: '/blogs'  // Update this with the actual path
  },
];

// Sample data for restaurants
export const restaurantsData = [
  // Your restaurants data here
];


import React, { useState } from "react";
import Navbar from "../NavBar.js";
import { FaStar } from 'react-icons/fa';
import {addDoc, collection} from 'firebase/firestore'
import { db, auth, storage } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //reference to collection in firebase called posts
  const postsCollectionRef = collection(db, "posts");

  const storageRef = ref(storage, 'images');

  let navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(selectedImage);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => handleStarClick(i)}>
          <FaStar
            className={`cursor-pointer text-${rating >= i ? 'yellow' : 'gray'}-500 ${
              rating > 0 ? 'fill-current' : 'fill-transparent'
            }`}
          />
        </span>
      );
    }
    return stars;
  };

  const restaurantOptions = [
    'Banh Mi & Roll', 'Barista Parlor', 'Biscuit Love', 'Central BBQ', 'Grain & Berry',
    'The Grilled Cheeserie', 'Hopdoddy Burger Bar', 'Jeni’s Splendid Ice Creams', 'Meet Noodles', 'Sushi 88',
    'Taco Mama', 'The Urban Juicer', 'Ben & Jerry’s', 'Chuy’s Tex Mex', 'Donatos Pizza', 'Helen’s Hot Chicken',
    'The Poki', 'Sarabha’s Creamery', 'The Slider House', 'Urban Cookhouse', '8th and Roast',
    'Bombay Palace', 'Chili’s', 'Crab Fever', 'Hyderabad House', 'Wendy’s',
    'Inchin’s Bamboo Garden', 'Papa John’s Pizza', 'Sitar', 'Sun & Fork',
    'Yaki House', 'Elliston Place Soda Shop', 'Frutta Bowls', 'I Love Sushi', 'Roma Pizza & Pasta',
    'Jet’s Pizza', 'Michaelangelo’s Pizza', 'Oscar’s Taco Shop', 'Poke Bros.',
    'Satay Thai Grill', 'Sweet Dots Bubble Tea',
    'Holy Smokes', 'Red Bicycle',
    'Woodlands'
  ];

  const colorTheme = require('../../assets/tailwind.config.js');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, 'images/' + image.name);
      await uploadBytes(imageRef, image);
  
      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);
  
      // Add post data to Firestore with the image URL and timestamp
      await addDoc(postsCollectionRef, {
        title,
        rating,
        restaurant,
        review,
        image: imageUrl,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        timestamp: serverTimestamp()
      });
  
      console.log('Success'); // Log success if there is no error
      navigate("/blogs");
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Reset form fields and state after submission
      setTitle('');
      setRating(0);
      setRestaurant('');
      setReview('');
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="container mx-auto mt-4 flex justify-center items-center flex-col">
      <Navbar />
      <h1 className="text-2xl font-bold mb-2 text-black">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-2">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="rating" className="block text-sm font-semibold text-gray-600">
            Rating: {rating} stars
          </label>
          <div className="flex space-x-1">
            {renderStars()}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="restaurant" className="block text-sm font-semibold text-gray-600">
            Restaurant
          </label>
          <select
            id="restaurant"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            required
          >
            <option value="">Select a restaurant</option>
            {restaurantOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        {/* <div className="mb-2">
          <label htmlFor="review" className="block text-sm font-semibold text-gray-600">
            Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            rows="4"
            required
          ></textarea>
        </div> */}
        <div className="mb-2">
  <label htmlFor="review" className="block text-sm font-semibold text-gray-600">
    Review
  </label>
  <ReactQuill
    id="review"
    value={review}
    onChange={setReview}
    className="text-black"
    modules={{
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ]
    }}
    formats={[
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]}
    placeholder="Write your review here..."
  />
</div>
        <div className="mb-2">
          <label htmlFor="image" className="block text-sm font-semibold text-gray-600">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Selected" className="max-w-full h-auto" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#38761D] text-white px-3 py-2 rounded-md hover:bg-[#2b5916]]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
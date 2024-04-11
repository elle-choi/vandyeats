import React, { useState } from "react";
import Navbar from "../NavBar.js";
import { FaStar } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [restaurant, setRestaurant] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //reference to collection in firebase called posts
  const postsCollectionRef = collection(db, "posts");

  const storageRef = ref(storage, "images");

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
            className={`cursor-pointer text-${
              rating >= i ? "yellow" : "gray"
            }-500 ${rating > 0 ? "fill-current" : "fill-transparent"}`}
          />
        </span>
      );
    }
    return stars;
  };

  const restaurantOptions = [
    "Banh Mi & Roll",
    "Barista Parlor",
    "Biscuit Love",
    "Central BBQ",
    "Grain & Berry",
    "The Grilled Cheeserie",
    "Hopdoddy Burger Bar",
    "Jeni’s Splendid Ice Creams",
    "Meet Noodles",
    "Sushi 88",
    "Taco Mama",
    "The Urban Juicer",
    "Ben & Jerry’s",
    "Chuy’s Tex Mex",
    "Donatos Pizza",
    "Helen’s Hot Chicken",
    "The Poki",
    "Sarabha’s Creamery",
    "The Slider House",
    "Urban Cookhouse",
    "8th and Roast",
    "Bombay Palace",
    "Chili’s",
    "Crab Fever",
    "Hyderabad House",
    "Wendy’s",
    "Inchin’s Bamboo Garden",
    "Papa John’s Pizza",
    "Sitar",
    "Sun & Fork",
    "Yaki House",
    "Elliston Place Soda Shop",
    "Frutta Bowls",
    "I Love Sushi",
    "Roma Pizza & Pasta",
    "Jet’s Pizza",
    "Michaelangelo’s Pizza",
    "Oscar’s Taco Shop",
    "Poke Bros.",
    "Satay Thai Grill",
    "Sweet Dots Bubble Tea",
    "Holy Smokes",
    "Red Bicycle",
    "Woodlands",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, "images/" + image.name);
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
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        timestamp: serverTimestamp(),
      });

      console.log("Success");
      navigate("/blogs");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Reset form fields and state after submission
      setTitle("");
      setRating(0);
      setRestaurant("");
      setReview("");
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="title">Create Blog Post</div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="selections">
            <div className="image-container">
              <label htmlFor="image">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                id="image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div>
                  <img src={imagePreview} alt="Selected" />
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-input"
                required
              />
              <label htmlFor="rating">Rating: {rating} stars</label>
              <div className="star-rating">{renderStars()}</div>
              <label htmlFor="restaurant">Restaurant</label>
              <select
                id="restaurant"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                className="select-input"
                required
              >
                <option value="">Select a restaurant</option>
                {restaurantOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="review-input">
              <label htmlFor="review">Review</label>
              <ReactQuill
  id="review"
  value={review}
  onChange={setReview}
  className={`quill-editor quill-editor-wrapper`} 
  modules={{
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  }}
  formats={[
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ]}
  placeholder="Write your review here..."
/>

            </div>
            </div>
            
          </div>

          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

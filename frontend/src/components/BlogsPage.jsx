import React, {useEffect, useState} from "react";
import Navbar from "./NavBar.js";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import {getDocs, collection} from 'firebase/firestore'
import { db, auth, storage } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  //immedietly retrieve info from database upon page rendering
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getPosts();
  })

  const createPost = async () => {
    try {
      // Your createPost logic here
      console.log("Success");
      navigate("/createpost");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Welcome to the Blogs Page</h1>
        <button
          onClick={createPost}
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        >
          Create Post
        </button>
        <div>
          {
            postList.map((post) => {
              return <div> {post.title}</div>
            })
          }
        </div>

      </div>
    </div>
  );
};

export default Home;

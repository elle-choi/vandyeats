import React, { useEffect, useState } from "react";
import Navbar from "./NavBar.js";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../firebase";

const BlogPage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []); // empty dependency array to run the effect only once when the component mounts

  const createPost = async () => {
    try {
      console.log("Success");
      navigate("/createpost");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff9ef]">
      <Navbar />
      <div className="content max-h-screen overflow-y-scroll">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-green-500">Explore</h1>
          <button
            onClick={createPost}
            className="bg-[#38761D] text-white px-1 py-1 w-23 rounded-md hover:bg-[#2b5916]]"
          >
            Create Post
          </button>
        </div>
        <div className="mt-4">
          {postList.map((post) => (
            <div key={post.id} className="border p-4 rounded-md bg-white mb-4 flex">
              <div className="flex-1">
                <p className="text-gray-600">{post.author.name}</p>
                <h2 className="text-xl text-gray-600 font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.review}</p>
                <div className="mt-4">
                  <p>Rating: {post.rating} stars</p>
                  {/* Add 1 star display here */}
                </div>
              </div>
              <div className="ml-4">
                <img src={post.image} alt={`Blog ${post.title}`} className="w-32 h-32 object-cover rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

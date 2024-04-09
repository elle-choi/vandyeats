import React, { useEffect, useState } from "react";
import Navbar from "../NavBar.js"
import { useNavigate } from "react-router-dom";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../../firebase.js";
import { db } from "../../firebase.js";
import { FaStar, FaRegStar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import FullBlogPost from "./FullBlogPost";

const BlogPage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [userProfilePics, setUserProfilePics] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const postsWithTimestamp = [];
        const postsWithoutTimestamp = [];

        // Separate posts with and without timestamp
        data.docs.forEach((doc) => {
          const postData = doc.data();
          const authorId = postData.author.id;

          if (postData.timestamp) {
            postsWithTimestamp.push({ ...postData, id: doc.id });
          } else {
            postsWithoutTimestamp.push({ ...postData, id: doc.id });
          }
        });

        // Sort posts with timestamp by timestamp in descending order
        postsWithTimestamp.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );

        // Concatenate posts with timestamp followed by posts without timestamp
        setPostList([...postsWithTimestamp, ...postsWithoutTimestamp]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []); // empty dependency array to run the effect only once when the component mounts

  useEffect(() => {
    const fetchUserProfilePics = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const userProfilePicsData = {};

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          userProfilePicsData[doc.id] = userData.profilePic;
        });

        setUserProfilePics(userProfilePicsData);
      } catch (error) {
        console.error("Error fetching user profile pictures:", error);
      }
    };

    fetchUserProfilePics();
  }, []);

  const createPost = async () => {
    try {
      console.log("Success");
      navigate("/createpost");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = async (postId) => {
    try {
      // Get the current user ID
      const userId = auth.currentUser.uid;

      // Reference to the saved_blogs collection for the current user
      const savedBlogsCollectionRef = collection(
        db,
        `users/${userId}/saved_blogs`
      );

      // Create a new document in the saved_blogs collection with the postId as the document ID
      await setDoc(doc(savedBlogsCollectionRef, postId), {
        postId: postId,
        savedAt: new Date(),
      });

      console.log("Blog post saved successfully:", postId);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const getTimeAgo = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      // Add null check before accessing toDate method
      const date = timestamp.toDate();
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return "Unknown"; // or any default value you prefer
    }
  };

  //function to temporarily remove images from post review to only show text in the preview
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const imgElements = doc.getElementsByTagName("img");

    // Replace img elements with placeholders and remove [Image: ] from text
    for (let i = imgElements.length - 1; i >= 0; i--) {
      const img = imgElements[i];
      const placeholder = document.createTextNode("");
      img.parentNode.replaceChild(placeholder, img);
    }

    return doc.body.textContent.replace(/\[Image: \]/g, "") || "";
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
            <div
              key={post.id}
              className="border p-4 rounded-md bg-white mb-4 flex"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="flex-1">
                <img
                  src={userProfilePics[post.author.id]}
                  alt={`Profile of ${post.author.name}`}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <p className="text-gray-600">{post.author.name}</p>
                <h2 className="text-xl text-gray-600 font-bold mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700">
                  {stripHtmlTags(post.review)
                    .split(" ")
                    .slice(0, 150)
                    .join(" ")}
                  {stripHtmlTags(post.review).length > 50 ? "..." : ""}
                </p>
                <div>
                  <p className="text-gray-700">Rating: {post.rating} stars</p>
                  <p className="text-gray-700">
                    Posted {getTimeAgo(post.timestamp)}
                  </p>
                  <button onClick={() => handleSave(post.id)}>
                    <FaRegStar />
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <img
                  src={post.image}
                  alt={`Blog ${post.title}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

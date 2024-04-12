import React, { useEffect, useState } from "react";
import Navbar from "../NavBar.js";
import { useNavigate } from "react-router-dom";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc
} from "firebase/firestore";
import { auth } from "../../firebase.js";
import { db } from "../../firebase.js";
import { FaHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import FullBlogPost from "./FullBlogPost";
import "./BlogsPage.css";

const BlogPage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [userProfilePics, setUserProfilePics] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);

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

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const userId = auth.currentUser.uid;
        const savedBlogsCollectionRef = collection(db, `users/${userId}/saved_blogs`);
        const snapshot = await getDocs(savedBlogsCollectionRef);
        const savedPostIds = snapshot.docs.map(doc => doc.data().postId);
        setSavedPosts(savedPostIds);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts();
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
      const userId = auth.currentUser.uid;
      const savedBlogsCollectionRef = collection(db, `users/${userId}/saved_blogs`);
      
      // Check if the post is already saved
      if (savedPosts.includes(postId)) {
        // Remove the post from saved posts
        const updatedSavedPosts = savedPosts.filter(id => id !== postId);
        setSavedPosts(updatedSavedPosts);
        
        // Delete the document from the saved blogs collection
        await deleteDoc(doc(savedBlogsCollectionRef, postId));
      } else {
        // Add the post to saved posts
        const updatedSavedPosts = [...savedPosts, postId];
        setSavedPosts(updatedSavedPosts);
        
        // Create a new document in the saved_blogs collection
        await setDoc(doc(savedBlogsCollectionRef, postId), {
          postId: postId,
          savedAt: new Date(),
        });
      }
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
    <div className="container">
      <Navbar />
      <div>
        <div class="top">
          <div class="left">
            <span class="explore">Explore</span>
          </div>
          <div class="right">
            <button class="create-post" onClick={createPost}>
              Create Post
            </button>
          </div>
        </div>
        <div>
          {postList.map((post) => (
            <div
              key={post.id}
              className="post"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div class="left-content">
                <div class="authorinfo_time">
                  <img
                    src={userProfilePics[post.author.id]}
                    alt={`Profile of ${post.author.name}`}
                    class="profile-pic"
                  />
                  <div class="post-info">
                    <p class="author">{post.author.name}</p>
                    <p class="timestamp">{getTimeAgo(post.timestamp)}</p>
                  </div>
                </div>

                <h2 className="title">{post.title}</h2>
                <p className="review">
  {stripHtmlTags(post.review).length > 150 ? 
    `${stripHtmlTags(post.review).substring(0, 150)}...` :
    stripHtmlTags(post.review)
  }
</p>
                
                <button
      className="heart-button"
      onClick={(e) => {
        e.stopPropagation(); // Stop event propagation
        handleSave(post.id);
      }}
    >
      <FaHeart color={savedPosts.includes(post.id) ? "red" : "#858585"} />
    </button>
              </div>
              <div class= "right-content">
                <img
                  src={post.image}
                  alt={`Blog ${post.title}`}
                  className="post-image"
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

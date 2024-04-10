import React, { useEffect, useState, Component } from "react";
import Navbar from "../NavBar.js";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { formatDistanceToNow } from "date-fns";
import "./FullBlogPost.css";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";

const FullBlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [authorProfilePic, setAuthorProfilePic] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", postId));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() });

          // Fetch author's profile pic
          const authorId = postDoc.data().author.id;
          const userDoc = await getDoc(doc(db, "users", authorId));
          if (userDoc.exists()) {
            setAuthorProfilePic(userDoc.data().profilePic);
          }
        } else {
          console.error("Post not found.");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const getTimeAgo = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      // Add null check before accessing toDate method
      const date = timestamp.toDate();
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return "Unknown"; // or any default value you prefer
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div>
        <div>
        <Link to="/blogs" className="back-link">
          <Icon path={mdiArrowLeft} size={1} color="black" />
        </Link>
        </div>
        
        <h2 className="post-title">{post.title}</h2>

        <div className="header">
        <img
          src={authorProfilePic}
          alt={`Profile of ${post.author.name}`}
          className="profile-pic"
        />

        <div className="author">
        <p className="author-name">{post.author.name}</p>
        <p className="posted-date">Posted {getTimeAgo(post.timestamp)}</p>
        </div>
        
        </div>
        
        <div className="gray-line"></div>
        <div
          className="review"
          dangerouslySetInnerHTML={{ __html: post.review }}
        />
      </div>
    </div>
  );
};

export default FullBlogPost;

// FullBlogPost.js
import React, { useEffect, useState } from "react";
import Navbar from "../NavBar.js";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { formatDistanceToNow } from "date-fns";

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
    <div className="min-h-screen bg-[#fff9ef]">
      <Navbar />
      <div className="content max-h-screen overflow-y-scroll">
        <div className="border p-4 rounded-md bg-white mb-4 flex">
          <div className="flex-1">
          <Link to="/blogs" className="text-blue-500">&#8592; Back to Blogs</Link>
            <img
              src={authorProfilePic}
              alt={`Profile of ${post.author.name}`}
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="text-gray-600">{post.author.name}</p>
            <h2 className="text-xl text-gray-600 font-bold mb-2">{post.title}</h2>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.review }} />
            <div>
              <p className="text-gray-700">Rating: {post.rating} stars</p>
              <p className="text-gray-700">
                    Posted {getTimeAgo(post.timestamp)}
                  </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlogPost;

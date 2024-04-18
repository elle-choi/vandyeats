import React, { useEffect, useState } from 'react';
import Navbar from "./NavBar.js";
import { auth, db } from "../firebase.js"; // Assuming auth is for authentication and db is the Firestore database instance
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const SavedBlogs = () => {
    const [savedPosts, setSavedPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedPosts = async () => {
            const user = auth.currentUser;
            if (!user) return;
            
            const savedBlogsRef = collection(db, "users", user.uid, "saved_blogs");
            const savedBlogsSnapshot = await getDocs(savedBlogsRef);

            const postsData = await Promise.all(
                savedBlogsSnapshot.docs.map(async (savedBlogDoc) => {
                    const postId = savedBlogDoc.data().postId;
                    const postRef = doc(db, "posts", postId);
                    const postSnapshot = await getDoc(postRef);
                    
                    if (postSnapshot.exists()) {
                        const authorId = postSnapshot.data().author.id;
                        const authorRef = doc(db, "users", authorId);
                        const authorSnapshot = await getDoc(authorRef);
                        
                        const postData = {
                            ...postSnapshot.data(),
                            id: postSnapshot.id,
                            authorProfilePic: authorSnapshot.exists() ? authorSnapshot.data().profilePic : null
                        };
                        return postData;
                    }
                    return null;
                })
            );

            setSavedPosts(postsData.filter(Boolean));
        };

        fetchSavedPosts();
    }, []);

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
        <div className="w-screen h-screen flex flex-col">
            <Navbar />
            <div className='bg-[rgb(254,249,240)] flex flex-grow w-full mt-16'>
                <div className='w-9/12 flex flex-col flex-grow'>
                    <div className="h-full flex justify-center items-start pt-10">
                        <div className='h-full w-full flex flex-col justify-start items-center'>
                            <h1 className="text-[#212121] mb-10 font-bold text-xl">Saved Blogs</h1>
                            <div className='w-full bg-[rgb(254,249,240)]'>
                                <div className='justify-center border-gray-600 rounded-md mx-5 py-2'>
                                    {savedPosts.map((post) => (
                                        <div key={post.id} className="p-4 mb-4 flex border-2 rounded-lg border-gray-400" onClick={() => navigate(`/blog/${post.id}?source=saved-blogs`)}>
                                            <div className="flex-col w-10/12">
                                                <div className='flex items-center'>
                                                    <img
                                                        src={post.authorProfilePic || 'default-profile-pic-url'}
                                                        alt="Author profile"
                                                        className="h-12 w-12 rounded-full mr-3 object-cover"
                                                    />
                                                    <p className="text-green-600">{post.author.name}</p>
                                                </div>
                                                <h2 className="text-xl text-gray-600 font-bold mb-2">{post.title}</h2>
                                                <p className="review">
  {stripHtmlTags(post.review).length > 150 ? 
    `${stripHtmlTags(post.review).substring(0, 150)}...` :
    stripHtmlTags(post.review)
  }
</p>
                                                <div className='flex font-bold'>
                                                    <p>Rating:&nbsp;</p>
                                                    <p>{post.rating}</p>
                                                </div>
                                            </div>
                                            {post.image && (
                                                <div className="ml-4 2/12">
                                                    <img src={post.image} alt={`Blog ${post.title}`} className="w-32 h-32 object-cover rounded-md" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedBlogs;
import React, { useEffect, useState } from 'react';
import Navbar from "./NavBar.js";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase.js"; // Adjust this path to your firebase config file


// Adjusted Home component to SavedBlogs to focus on displaying saved blog posts
const SavedBlogs = () => {
    const [postList, setPostList] = useState([]); // State to store the fetched blog posts
    const [userProfilePics, setUserProfilePics] = useState({});
    const postsCollectionRef = collection(db, "posts"); 

    useEffect(() => {
        const fetchPosts = async () => {
           try {
                const data = await getDocs(postsCollectionRef);
                
                const usersCollectionRef = collection(db, "users");
                const usersSnapshot = await getDocs(usersCollectionRef);
                const userProfilePicsData = {};
        
                usersSnapshot.forEach((doc) => {
                    const userData = doc.data();
                    userProfilePicsData[doc.id] = userData.profilePic;
                });
        
                setUserProfilePics(userProfilePicsData);
                

                const posts = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                
                //const avg_data = posts.length > 0 ? posts.redude((acc,post) => acc + ( post.rating || 0 ),0) : 0;

                // Fetch user images for each post
                const postsWithUserImages = await Promise.all(posts.map(async post => {
                    // Assuming you have a way to get the user image URL from the user ID
                    const userRef = doc(db, "users", post.author.id);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userImageUrl = userSnap.data().imageUrl; // Assuming imageUrl holds the image URL
                        return { ...post, author: { ...post.author, imageUrl: userImageUrl }};
                    } else {
                        return post; // Return the post as is if no user data found
                    }
                }));


                setPostList(postsWithUserImages);    
            } catch (error) {
              console.error("Error fetching user profile pictures:", error);
                
                
            } 
        };

        fetchPosts();
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
                                    {postList.map((post) => (
                                        <div key={post.id} className="p-4 mb-4 flex border-2 rounded-lg border-gray-400">
                                            <div className="flex-col w-10/12">
                                                <div className='flex items-center'>
                                                    {/* Consider replacing this with a profile image if available */}
                                                    <img
                                        src={userProfilePics[post.author.id]}
                                        alt={`Profile of ${post.author.name}`}
                                        class="rounded-full mr-3 w-14 h-14"
                                    />
                                                    <p className="text-green-600">{post.author.name}</p>
                                                </div>
                                                <h2 className="text-xl text-gray-600 font-bold mb-2">{post.title}</h2>
                                                <p className="text-gray-700 overflow-hidden overflow-ellipsis max-w-[1000px]">
                        {stripHtmlTags(post.review).length > 150 ? 
    `${stripHtmlTags(post.review).substring(0, 150)}...` :
    stripHtmlTags(post.review)
  }
                </p>
                <div class='flex font-bold '>
                                    <p>Rating :&nbsp;</p>
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

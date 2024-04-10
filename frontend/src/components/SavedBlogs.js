import React, { useEffect, useState } from 'react';
import Navbar from "./NavBar.js";
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase.js"; // Adjust this path to your firebase config file

// Adjusted Home component to SavedBlogs to focus on displaying saved blog posts
const SavedBlogs = () => {
    const [postList, setPostList] = useState([]); // State to store the fetched blog posts

    useEffect(() => {
        const fetchPosts = async () => {
            const postsCollectionRef = collection(db, "posts"); // Replace "posts" with your specific collection name
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchPosts();
    }, []);

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
                                                    <div className='bg-slate-400 h-12 w-12 rounded-full mr-3'></div>
                                                    <p className="text-green-600">{post.author.name}</p>
                                                </div>
                                                <h2 className="text-xl text-gray-600 font-bold mb-2">{post.title}</h2>
                                                <p className="text-gray-700">{post.review}</p>
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

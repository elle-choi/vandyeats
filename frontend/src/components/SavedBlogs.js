import React, { useEffect, useState } from 'react';
import Navbar from "./NavBar.js";
import { auth, db } from "../firebase.js"; // Assuming auth is for authentication and db is the Firestore database instance
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

const SavedBlogs = () => {
    const [savedPosts, setSavedPosts] = useState([]);

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
                                        <div key={post.id} className="p-4 mb-4 flex border-2 rounded-lg border-gray-400">
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
                                                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.review }}></p>
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

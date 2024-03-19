import React, { useEffect, useState } from 'react';
import { useLocation,Link,useNavigate } from 'react-router-dom'; // Import Link
import Navbar from './NavBar';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

const RestaurantInfo = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const place_id = queryParams.get('re_info'); // ID of restaurant

    const names = ['Banh Mi & Roll', 'Barista Parlor', 'Biscuit Love', 'Central BBQ', 'Grain & Berry',
    'The Grilled Cheeserie', 'Hopdoddy Burger Bar', 'Jeni’s Splendid Ice Creams', 'Meet Noodles', 'Sushi 88',
    'Taco Mama', 'The Urban Juicer', 'Ben & Jerry’s', 'Chuy’s Tex Mex', 'Donatos Pizza', 'Helen’s Hot Chicken',
    'The Poki', 'Sarabha’s Creamery', 'The Slider House', 'Urban Cookhouse', '8th and Roast',
    'Bombay Palace', 'Chili’s', 'Crab Fever', 'Hyderabad House', 'Wendy’s',
    'Inchin’s Bamboo Garden', 'Papa John’s Pizza', 'Sitar', 'Sun & Fork',
    'Yaki House', 'Elliston Place Soda Shop', 'Frutta Bowls', 'I Love Sushi', 'Roma Pizza & Pasta',
    'Jet’s Pizza', 'Michaelangelo’s Pizza', 'Oscar’s Taco Shop', 'Poke Bros.',
    'Satay Thai Grill', 'Sweet Dots Bubble Tea',
    'Holy Smokes', 'Red Bicycle',
    'Woodlands'];
    const main_imgs = [require('../assets/banhmi&roll_b.webp'),require('../assets/barista-parlor_b.webp'),require('../assets/biscuit-love_b.webp'),
    require('../assets/central-bbq_b.webp'), require('../assets/grain-berry_b.webp'), require('../assets/sitar_b.webp')]
    const place_info = [['Vietnamese','11AM - 8PM','$$'],['Coffee Shop','7AM - 4PM','$'],['American','7AM - 3PM','$$'],
    ['American','11AM - 9PM','$$'], ['Smoothie Shop', '7AM - 9PM','$$'], ['Indian', '10:45AM - 2PM','$$$']]
    /*Restaurant Info Separation*/ 
    const basic_text = [" | "," | ",""]
    const [review_cnt,setReview_cnt] = useState([]);
    const [avg,setAvg] = useState([]);
    

    
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await getDocs(postsCollectionRef);
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
                setReview_cnt(postsWithUserImages.length);
                const total =  postsWithUserImages.reduce((acc,post) => acc + ( post.rating || 0 ),0);
                setAvg(postsWithUserImages.length>0?total/postsWithUserImages.length:0);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getPosts();
    }, []);


    return (
        <div class="w-screen h-screen flex flex-col"> 
        <Navbar />

        <div class='bg-[rgb(254,249,240)] flex flex-grow h-full pt-16'>
            <div class='w-full h-full flex-col text-black items-center'>
                {/** Navigation UI */}
                <div class='w-full h-2/12 flex mt-5  pl-5'>
                    <Link to='../' class='hover:text-orange-300'>Home</Link>
                    <a>/</a>
                    <Link to='../restaurant' class='hover:text-orange-300'>Restaurant</Link>
                    <a>/</a>
                    <a class='hover:text-orange-300'>{names[place_id]}</a>    
                </div>

                <div class='flex w-full justify-center my-3'>
                    <img src={main_imgs[place_id]} class='h-60 w-full rounded-xl mx-5 object-cover'/>
                </div>
                <div class='ml-5 flex'>
                    <div>
                        <p class='text-2xl font-bold'>{names[place_id]}</p>
                        <div class='flex items-center'>
                        <svg class='w-5 h-5 mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 117.42"><path d="M66.71 3.55L81.1 37.26l36.58 3.28v-.01c1.55.13 2.91.89 3.85 2.01a5.663 5.663 0 011.32 4.13v.01a5.673 5.673 0 01-1.69 3.57c-.12.13-.25.25-.39.36L93.25 74.64l8.19 35.83c.35 1.53.05 3.06-.73 4.29a5.652 5.652 0 01-3.54 2.52l-.14.03c-.71.14-1.43.15-2.12.02v.01c-.75-.13-1.47-.42-2.11-.84l-.05-.03-31.3-18.71-31.55 18.86a5.664 5.664 0 01-7.79-1.96c-.38-.64-.62-1.33-.73-2.02-.1-.63-.09-1.27.02-1.89.02-.13.04-.27.08-.4l8.16-35.7c-9.24-8.07-18.74-16.1-27.83-24.3l-.08-.08a5.64 5.64 0 01-1.72-3.7c-.1-1.45.36-2.93 1.4-4.12l.12-.13.08-.08a5.668 5.668 0 013.77-1.72h.06l36.34-3.26 14.44-33.8c.61-1.44 1.76-2.5 3.11-3.05 1.35-.54 2.9-.57 4.34.04.69.29 1.3.71 1.8 1.22.53.53.94 1.15 1.22 1.82l.02.06zm10.19 37.2L61.85 5.51a.42.42 0 00-.09-.14.42.42 0 00-.14-.09.427.427 0 00-.35 0c-.1.04-.19.12-.24.24L45.98 40.75c-.37.86-1.18 1.49-2.18 1.58l-37.9 3.4c-.08.01-.16.02-.24.02-.06 0-.13.02-.18.05-.03.01-.05.03-.07.05l-.1.12c-.05.08-.07.17-.06.26.01.09.04.18.09.25.06.05.13.11.19.17l28.63 25c.77.61 1.17 1.62.94 2.65l-8.51 37.22-.03.14c-.01.06-.02.12-.01.17a.454.454 0 00.33.36c.12.03.24.02.34-.04l32.85-19.64c.8-.5 1.85-.54 2.72-.02L95.43 112c.08.04.16.09.24.14.05.03.1.05.16.06v.01c.04.01.09.01.14 0l.04-.01c.12-.03.22-.1.28-.2.06-.09.08-.21.05-.33L87.8 74.28a2.6 2.6 0 01.83-2.55l28.86-25.2c.04-.03.07-.08.1-.13.02-.04.03-.1.04-.17a.497.497 0 00-.09-.33.48.48 0 00-.3-.15v-.01c-.01 0-.03 0-.03-.01l-37.97-3.41c-1-.01-1.93-.6-2.34-1.57z" fill="#000000"/></svg>
                            <p>{avg} +{review_cnt} Blogs |</p>
                            {place_info[place_id].map((item, index) => (
                                /* restaurant info */
                                <p key={index}>{item}{basic_text[index]}&nbsp;</p>
                                ))}
                        </div>
                       
                    </div>
                    
                </div>
                <p class='text-2xl font-bold mx-5 mt-5 mb-2'>Popular Blogs</p>
                <div class='w-full bg-[rgb(254,249,240)]'>
                    <div class='  justify-center border-gray-600 rounded-md mx-5 py-2' >
                        {postList.map((post) => (
    
                            <div key={post.id} className=" p-4   mb-4 flex border-2 rounded-lg border-gray-400">
                            <div className="flex-col w-10/12">
                                <div class='flex items-center'>
                                    {/* INSERT PROFILE IMAGE CODE HERE */}
                                    <div class='bg-slate-400 h-12 w-12 rounded-full mr-3' ></ div>
                                    <p className="text-green-600">{post.author.name}</p>
                                </div>
                                
                                <h2 className="text-xl text-gray-600 font-bold mb-2">{post.title}</h2>
                                <p className="text-gray-700">{post.review}</p>
                                <div class='flex font-bold '>
                                    <p>Rating :&nbsp;</p>
                                    <p>{post.rating}</p>
                                </div>
                               
                                <div className="mt-4">
                                </div>
                            </div>
                            <div className="ml-4 2/12">
                                <img src={post.image} alt={`Blog ${post.title}`} className="w-32 h-32 object-cover rounded-md" />
                            </div>
                            </div>
                        ))}
                    </div>

                </div>

                      
            </div>
        </div>
    </div>
    )
}
export default RestaurantInfo;
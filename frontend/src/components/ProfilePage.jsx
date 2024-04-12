import React, { useEffect, useState } from 'react';
import Navbar from "./NavBar.js";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase.js";
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);  
  const [userProfilePics, setUserProfilePics] = useState({});


  useEffect(() => {
    const fetchUserDataAndPosts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
  
        if (!userSnap.exists()) {
          console.log("No such user data!");
          navigate('/login');
          return;
        }
  
        setUserData(userSnap.data());
  
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where("author.id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Fetch profile pictures for each post's author
        const profilePicsData = {};
        for (const post of posts) {
          if (!profilePicsData[post.author.id]) {
            const userDocRef = doc(db, "users", post.author.id);
            const userDocSnap = await getDoc(userDocRef);
            profilePicsData[post.author.id] = userDocSnap.exists() ? userDocSnap.data().profilePic || 'default-profile.png' : 'default-profile.png';
          }
        }
  
        setUserProfilePics(profilePicsData);
        
        // Assign profile pictures to the posts
        const postsWithPics = posts.map(post => ({
          ...post,
          author: {
            ...post.author,
            imageUrl: profilePicsData[post.author.id]
          }
        }));
  
        setUserPosts(postsWithPics);
      } catch (error) {
        console.error("Error fetching user profile pictures:", error);
        navigate('/login');
      }
    };
  
    fetchUserDataAndPosts();
  }, [navigate]);
  

  // Function to handle navigation to the homepage
  const handleNavigateHome = () => {
    navigate('/home'); // Navigate to the homepage
  };

  const getUserProfilePic = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data().image; // Assuming 'image' is the field for the profile picture
    } else {
      console.log("No such user!");
      return 'default-profile.png'; // Your path to a default profile picture
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
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      {/* full screen */}
      <div className='bg-[rgb(254,249,240)] flex flex-grow w-full mt-16'>
        {/* left menu bar */}
        <div className='w-3/12 border-r border-gray-400 my-6'>
          {/* Home */}
          <div className="flex w-full items-center cursor-pointer" onClick={handleNavigateHome}>
            <a className='w-5 h-5 flex ml-2'>
              <svg className='w-3 h-3' fill="#000000" viewBox="0 0 330 330" xmlSpace="preserve">
                <path d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z" strokeWidth="5" />
              </svg>
            </a>
            <h1 className='text-[#212121] font-bold ml-4'>Home</h1>
          </div>

          <div className='flex flex-col flex-grow mb-4 '>
            <div className='ml-10 flex items-center my-3'>
              {/* pencil image */}
              <div className='w-16 h-16 flex justify-center items-center'>
                <svg className='w-12 h-12' fill="#212121" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
                  <path d="M9.6 40.4l2.5-9.9L27 15.6l7.4 7.4-14.9 14.9-9.9 2.5zm4.3-8.9l-1.5 6.1 6.1-1.5L31.6 23 27 18.4 13.9 31.5z" />
                  <path d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5l-1.9.5z" />
                  <path d="M29.298 19.287l1.414 1.414-13.01 13.02-1.414-1.412z" />
                  <path d="M11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2L11 39z" />
                  <path d="M35 22.4L27.6 15l3-3 .5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5-3.1 2.9zM30.4 15l4.6 4.6.9-.9c-.5-2.3-2.3-4.1-4.6-4.6l-.9.9z" />
                </svg>
              </div>
              <Link to="/edit-profile" className='text-[#212121] font-bold'>Edit Profile</Link>
            </div>

            <div class='ml-10 flex items-center my-3'>
              {/* bookmark image */}
              <div class='w-16 h-16 flex justify-center items-center'>
                <svg class='w-8 h-8' fill="#212121" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792">
                  <path d="M1420 128q23 0 44 9 33 13 52.5 41t19.5 62v1289q0 34-19.5 62t-52.5 41q-19 8-44 8-48 0-83-32l-441-424-441 424q-36 33-83 33-23 0-44-9-33-13-52.5-41t-19.5-62V240q0-34 19.5-62t52.5-41q21-9 44-9h1048z" />
                </svg>
              </div>
              <Link to="/saved-blogs" className='text-[#212121] font-bold'>Saved Blogs</Link>
            </div>
            <div class='ml-10 flex items-center my-3'>
              <div class='w-16 h-16 flex justify-center items-center'>
                <svg class='w-12 h-12' fill="#212121" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
                  <path d="M34 23h-2v-4c0-3.9-3.1-7-7-7s-7 3.1-7 7v4h-2v-4c0-5 4-9 9-9s9 4 9 9v4z" /><path d="M33 40H17c-1.7 0-3-1.3-3-3V25c0-1.7 1.3-3 3-3h16c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3zM17 24c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V25c0-.6-.4-1-1-1H17z" /><circle cx="25" cy="28" r="2" /><path d="M25.5 28h-1l-1 6h3z" />
                </svg>
              </div>
              <Link to="/security" className='text-[#212121] font-bold'>Security</Link>
            </div>
            <div class='ml-10 flex items-center my-3'>
              {/* settings image */}
              <div class='w-16 h-16 flex justify-center items-center'>
                <svg class='w-12 h-12' fill="#212121" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                  <defs><clipPath><path d="m22.2 686.12h1447.73v-667.19h-1447.73v667.19" /></clipPath><clipPath><path fill="#212121" d="m7 1023.36h1v1h-1z" /></clipPath><clipPath><path d="m0 706.47h1490.93v-706.47h-1490.93v706.47" /></clipPath><clipPath><path fill="#aade87" fill-opacity=".472" d="m-6 1028.36h32v32h-32z" /></clipPath><clipPath><path fill="#00f" fill-opacity=".514" d="m-7 1024.36h34v34h-34z" /></clipPath><clipPath><path fill="#212121" d="m7 1023.36h1v1h-1z" /></clipPath></defs><path d="M11 3A8 8 0 0 0 3 11 8 8 0 0 0 11 19 8 8 0 0 0 19 11 8 8 0 0 0 11 3M10.994 6.5C11.758 6.5 12.379 6.719 12.857 7.158 13.336 7.589 13.576 8.142 13.576 8.816 13.576 9.109 13.495 9.406 13.336 9.707 13.176 10.01 13.03 10.223 12.908 10.354 12.791 10.475 12.623 10.635 12.404 10.83L12.342 10.891C11.83 11.338 11.572 11.785 11.572 12.232V12.719H10.389V12.146C10.389 11.781 10.469 11.467 10.629 11.207 10.788 10.939 11.07 10.625 11.473 10.268 11.699 10.06 11.859 9.914 11.951 9.816 12.05 9.711 12.148 9.569 12.24 9.391 12.341 9.204 12.393 9.01 12.393 8.816 12.393 8.442 12.266 8.142 12.01 7.914 11.77 7.686 11.431 7.572 10.994 7.572 10.272 7.572 9.776 7.964 9.508 8.744L8.424 8.305C8.6 7.841 8.904 7.426 9.332 7.06 9.769 6.687 10.322 6.5 10.994 6.5M10.98 13.842C11.224 13.842 11.426 13.923 11.586 14.09 11.754 14.249 11.838 14.442 11.838 14.67 11.838 14.898 11.754 15.09 11.586 15.256 11.426 15.418 11.224 15.5 10.98 15.5 10.737 15.5 10.531 15.418 10.363 15.256 10.204 15.09 10.125 14.898 10.125 14.67 10.125 14.442 10.204 14.249 10.363 14.09 10.531 13.923 10.737 13.842 10.98 13.842" transform="translate(-.002.008)" fill="#4d4d4d" fill-rule="evenodd" />
                </svg>
              </div>
              <Link to="/help" className='text-[#212121] font-bold'>Help</Link>
            </div>
          </div>

        </div>
        <div class='w-9/12 relative flex flex-col flex-grow'>
          
          {/* profile image */}
          <div class="h-56 w-9/12 absolute flex items-end">
            <img className="object-cover ml-10 mb-2 h-20 w-20 rounded-full" src={userData.profilePic || 'https://via.placeholder.com/150'} alt="Profile" />
          </div>
          <div className="w-full h-56">
            
            {/* Background image and user details */}
            <div className="h-3/4 w-full flex justify-between items-baseline px-6 pt-6">
              <img
                src={userData.backgroundPic || "../assets/default-background.jpg"} // Replace with your default image path
                alt="Background"
                className="w-full h-full object-cover"
              />            </div>
            <div className="h-1/4 w-full flex justify-end">
              <div className="h-auto w-4/6 flex flex-col">
                {/* User name fetching from userData */}
                <div className="text-[#212121] font-bold text-xl pl-32">{userData.name || 'Name not available'}</div>
                <div className="text-gray-500 text-xs pl-36">Class of {userData.classOf || 'Not Specified'}</div>
              </div>
              <div className="h-auto w-2/6 flex justify-center items-center">
              </div>
            </div>
          </div>

          {/* User Info Space */}
          <div className='w-full flex flex-grow'>
            <div className='w-2/6 h-full flex justify-center items-center'>
              <div className='h-4/6 flex flex-col w-5/6 border-2 justify-center border-gray-600 rounded-md shadow-xl translate-y-2'>
                {/* Profile Image */}

                <div className="flex w-full my-2">
                  <svg className='w-5 h-5 mx-4 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="person"><g data-name="Layer 2"><path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 10a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z" data-name="person"></path></g></svg>
                  <h5 className='text-[#212121] text-sm'>{userData.gender || 'Gender not specified'}</h5>
                </div>
                {/* Birthday */}
                <div className="flex w-full my-2">
                  <svg class='w-5 h-5 mx-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="cake"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12.68 5.88c.7-.24 1.22-.9 1.3-1.64.05-.47-.05-.91-.28-1.27L12.42.75c-.19-.33-.67-.33-.87 0l-1.28 2.22c-.17.3-.27.65-.27 1.03 0 1.32 1.3 2.35 2.68 1.88zm3.85 10.04l-1-1-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3.61c-.75.51-1.71.75-2.74.52-.66-.14-1.25-.51-1.73-.99zM18 9h-5V8c0-.55-.45-1-1-1s-1 .45-1 1v1H6c-1.66 0-3 1.34-3 3v1.46c0 .85.5 1.67 1.31 1.94.73.24 1.52.06 2.03-.46l2.14-2.13 2.13 2.13c.76.76 2.01.76 2.77 0l2.14-2.13 2.13 2.13c.43.43 1.03.63 1.65.55.99-.13 1.69-1.06 1.69-2.06v-1.42C21 10.34 19.66 9 18 9z"></path></svg>
                  <h5 className='text-[#212121] text-sm'>{userData.birthday || 'Birthday not specified'}</h5>
                </div>
                {/* Location */}
                <div className="flex w-full my-2">
                  <svg class='w-5 h-5 mx-4' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 60 60" viewBox="0 0 60 60" id="location-pin"><path d="M30,6c-10.2624016,0-18.6144142,8.3520117-18.6144142,18.6144142c0,10.0127945,17.1840229,28.3103905,17.9136333,29.0783806
                            C29.4816208,53.8848038,29.7407818,54,30,54s0.5183792-0.1151962,0.7007809-0.3072052
                            c0.7296104-0.7679901,17.9136333-19.0655861,17.9136333-29.0783806C48.6144142,14.3520117,40.2624016,6,30,6z M30,32.5359383
                            c-4.3729687,0-7.9307804-3.5535946-7.9307804-7.9214077c0-4.3729687,3.5578117-7.9307804,7.9307804-7.9307804
                            c4.373436,0,7.9312515,3.5578117,7.9312515,7.9307804C37.9312515,28.9823437,34.373436,32.5359383,30,32.5359383z"></path></svg>                  <h5 className='text-[#212121] text-sm'>{userData.location || 'Location not specified'}</h5>
                </div>
                {/* Email */}
                <div className="flex w-full my-2">
                  <svg class='w-5 h-5 mx-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="mail"><path fill="#231f20" d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"></path><path fill="#231f20" d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"></path></svg>                  <h6 className='text-[#212121] text-[10px]'>{userData.email || 'Email not available'}</h6>
                </div>
              </div>
            </div>
            {/* my blog list space */}
            <div className="w-full h-full flex-col text-black items-center">
              <p className="text-2xl font-bold mx-5 mt-5 mb-2">My Blogs</p>
              <div className='w-full bg-[rgb(254,249,240)]'>
                <div className='justify-center border-gray-600 rounded-md mx-5 py-2'>
                  {userPosts.map((post) => (
                    <div key={post.id} className="p-4 mb-4 flex border-2 rounded-lg border-gray-400">
                      <div className="flex-col w-10/12">
                        <div className='flex items-center'>
                        <img
                                        src={userProfilePics[post.author.id]}
                                        alt={`Profile of ${post.author.name}`}
                                        class="rounded-full mr-3 w-14 h-14"
                                    />
                          <p className="text-green-600">{post.author.name}</p>
                        </div>

                        <h2 className="text-xl text-gray-600 font-bold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[600px]">{post.title}</h2>
                        <p className="text-gray-700 overflow-hidden overflow-ellipsis max-w-[600px]">
                        {stripHtmlTags(post.review).length > 150 ? 
    `${stripHtmlTags(post.review).substring(0, 150)}...` :
    stripHtmlTags(post.review)
  }
                </p>
                        <div className='flex font-bold '>
                          <p>Rating:&nbsp;</p>
                          <p>{post.rating}</p>
                        </div>
                      </div>
                      <div className="ml-4 w-2/12">
                        <img src={post.image} alt={`Blog ${post.title}`} className="w-32 h-32 object-cover rounded-md" />
                      </div>
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

export default Home;
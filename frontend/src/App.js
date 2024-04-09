import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/SignIn.jsx"
// import ForgotPassword from "./components/ForgotPassword";
import LoginLink from "./components/SignIn.jsx";
import HomePage from "./components/HomePage.jsx" 
import BlogsPage from "./components/Blogs/BlogsPage.jsx" 
import CreatePost from "./components/Blogs/CreatePost.jsx" 
import RestaurantPage from "./components/RestaurantPage.jsx" 
import ProfilePage from "./components/ProfilePage.jsx" 
import RestaurantInfo from "./components/RestaurantInfo.jsx";
import EditProfile from "./components/EditProfile.js"; 
import SavedBlogs from "./components/SavedBlogs.js"; 
import Security from "./components/security.js"; 
import Help from "./components/HelpPage.js"; 
import FullBlogPost from "./components/Blogs/FullBlogPost.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/restaurant/restaurantinfo" element={<RestaurantInfo/>} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/signout" element={<LoginPage />} />
        <Route path="/saved-blogs" element={<SavedBlogs />} />
        <Route path="/security" element={<Security />} />
        <Route path="/help" element={<Help />} />
        <Route path="/blog/:postId" element={<FullBlogPost />} />
        </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/SignIn.jsx"
// import ForgotPassword from "./components/ForgotPassword";
import SignupLink from "./components/auth/SignUp.jsx";
import HomePage from "./components/HomePage.jsx" 
import BlogsPage from "./components/BlogsPage.jsx" 
import RestaurantPage from "./components/RestaurantPage.jsx" 
import ProfilePage from "./components/ProfilePage.jsx" 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
        <Route path="/signup" element={<SignupLink />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
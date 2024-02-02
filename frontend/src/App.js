import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/SignIn.jsx"
// import ForgotPassword from "./components/ForgotPassword";
import SignupLink from "./components/auth/SignUp.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
        <Route path="/signup" element={<SignupLink />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;

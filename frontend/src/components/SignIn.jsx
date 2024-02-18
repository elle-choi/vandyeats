import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = (e) => {
    e.preventDefault(); // Prevent the default form submit action
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // Check if the email ends with "vanderbilt.edu"
        if (user.email && user.email.endsWith("@vanderbilt.edu")) {
          console.log(user);
          navigate("/home"); // Navigate to the home page on successful sign in
        } else {
          // Sign out the user if the email domain is not "vanderbilt.edu"
          auth.signOut();
          setErrorMessage("Access denied. Only Vanderbilt University emails are allowed.");
        }
      })
      .catch((error) => {
        console.error("Sign-in error", error);
        setErrorMessage(`Sign-in failed: ${error.message}`);
      });
      //.catch((error) => {
        //console.log(error);
        //setErrorMessage("An error occurred during sign in. Please try again.");
      //});
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={signInWithGoogle}>
        <h2>Log In with Google</h2>
        <button type="submit">Sign In with Google</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignIn;

import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Apply black background to the entire page
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    return () => {
      document.body.style.backgroundColor = ""; // Revert when component unmounts
    };
  }, []);

  const signInWithGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user.email && user.email.endsWith("@vanderbilt.edu")) {
          navigate("/home");
        } else {
          auth.signOut();
          setErrorMessage("Access denied. Only Vanderbilt University emails are allowed.");
        }
      })
      .catch((error) => {
        console.error("Sign-in error", error);
        setErrorMessage(`Sign-in failed: ${error.message}`);
      });
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={signInWithGoogle}>
        <button type="submit">Sign In with Google</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignIn;

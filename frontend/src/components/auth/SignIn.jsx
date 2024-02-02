import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const signIn = (e) => {
    //so page does not get reloaded when form is submitted
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home");
        setErrorMessage("Success!");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Invalid email or password. Please try again.");
      });
  };
  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={signIn}>
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/forgot-password" className="forgot-password">
        Forgot Password?
      </Link>
      <button type="submit">Submit</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/signup" className="signup-link">
        Dont have an account? <strong>Sign Up</strong>
      </Link>
      </form>
    </div>
  );
};

export default SignIn;

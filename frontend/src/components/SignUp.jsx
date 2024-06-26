import React, {useState} from 'react';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = (e) => {

    //so page does not get reloaded when form is submitted
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
        navigate("/home");
    }).catch((error) => {
        console.log(error)
    })
  }
  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create an Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={ (e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={ (e) => setPassword(e.target.value)}
        ></input>
        <button type='submit'>Sign Up</button>
        <Link to="/" className="signup-link">
        Already have an account? <strong>Sign In</strong>
      </Link>
      </form>
    </div>
  );
};

export default SignUp;
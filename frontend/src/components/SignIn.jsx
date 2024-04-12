import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase"; // Ensure storage is correctly imported
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./SignIn.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [backgroundPic, setBackgroundPic] = useState(null);
  const [previewProfile, setPreviewProfile] = useState("");
  const [previewBackground, setPreviewBackground] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "black";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewProfile(reader.result);
      };
      reader.readAsDataURL(profilePic);
    } else {
      setPreviewProfile(null);
    }
  }, [profilePic]);

  useEffect(() => {
    if (backgroundPic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBackground(reader.result);
      };
      reader.readAsDataURL(backgroundPic);
    } else {
      setPreviewBackground(null);
    }
  }, [backgroundPic]);

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email && user.email.endsWith("@vanderbilt.edu")) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          setShowModal(true);
        } else {
          navigate("/home");
        }
      } else {
        auth.signOut();
        setErrorMessage("Access denied. Only Vanderbilt University emails are allowed.");
      }
    } catch (error) {
      console.error("Sign-in error", error);
      setErrorMessage(`Sign-in failed: ${error.message}`);
    }
  };

  const handleProfilePicChange = (event) => {
    if (event.target.files[0]) {
      setProfilePic(event.target.files[0]);
    } else {
      setProfilePic(null);
    }
  };

  const handleBackgroundPicChange = (event) => {
    if (event.target.files[0]) {
      setBackgroundPic(event.target.files[0]);
    } else {
      setBackgroundPic(null);
    }
  };

  const handleAdditionalInfoSubmit = async (event) => {
    event.preventDefault();
    const { gender, birthday, location, classOf } = event.target.elements;
    const user = auth.currentUser;

    let profilePicUrl = '';
    let backgroundPicUrl = '';
    if (profilePic) {
      const profilePicRef = ref(storage, `profilePics/${user.uid}/${profilePic.name}`);
      await uploadBytes(profilePicRef, profilePic);
      profilePicUrl = await getDownloadURL(profilePicRef);
    }

    if (backgroundPic) {
      const backgroundPicRef = ref(storage, `backgroundPics/${user.uid}/${backgroundPic.name}`);
      await uploadBytes(backgroundPicRef, backgroundPic);
      backgroundPicUrl = await getDownloadURL(backgroundPicRef);
    }

    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      gender: gender.value,
      birthday: birthday.value,
      location: location.value,
      classOf: classOf.value,
      profilePic: profilePicUrl,
      backgroundPic: backgroundPicUrl,
    });

    setShowModal(false);
    navigate("/home");
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={signInWithGoogle}>
        <button type="submit">Sign In with Google</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleAdditionalInfoSubmit}>
            <label htmlFor="profilePic">Profile Picture:</label>
            <input type="file" id="profilePic" name="profilePic" onChange={handleProfilePicChange} />
            {previewProfile && (
              <img src={previewProfile} alt="Profile Preview" style={{ height: "100px", width: "100px", objectFit: "cover" }} />
            )}
            <label htmlFor="backgroundPic">Background Picture:</label>
            <input type="file" id="backgroundPic" name="backgroundPic" onChange={handleBackgroundPicChange} />
            {previewBackground && (
              <img src={previewBackground} alt="Background Preview" style={{ height: "100px", width: "100px", objectFit: "cover" }} />
            )}
            {/* Additional fields and submission button */}
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;

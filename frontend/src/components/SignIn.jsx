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
             <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" required className="modal-input">
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>

            <label htmlFor="birthday">Birthday:</label>
            <input type="date" id="birthday" name="birthday" required className="modal-input" />

            <label htmlFor="location">Location:</label>
            <select id="location" name="location" required className="modal-input">
            <option value="">Select Location</option>
              <option value="Crawford House">Crawford House</option>
              <option value="East House">East House</option>
              <option value="Gillete House">Gillete House</option>
              <option value="Hank Ingram House">Hank Ingram House</option>
              <option value="Memorial House">Memorial House</option>
              <option value="Murray House">Murray House</option>
              <option value="North House">North House</option>
              <option value="Stambaugh House">Stambaugh House</option>
              <option value="Sutherland House">Sutherland House</option>
              <option value="West House">West House</option>
              <option value="Blakemore House">Blakemore House</option>
              <option value="Chaffin Place">Chaffin Place</option>
              <option value="Cole Hall">Cole Hall</option>
              <option value="Lewis House">Lewis House</option>
              <option value="Lupton House">Lupton House</option>
              <option value="McTyeire Hall">McTyeire Hall</option>
              <option value="Morgan House">Morgan House</option>
              <option value="Scales House">Scales House</option>
              <option value="Stapleton House">Stapleton House</option>
              <option value="Tolman Hall">Tolman Hall</option>
              <option value="Vaughn House">Vaughn House</option>
              <option value="Village at Vanderbilt South Tower">Village at Vanderbilt South Tower</option>
              <option value="Village at Vanderbilt Townhouses">Village at Vanderbilt Townhouses</option>
              <option value="E. Bronson Ingram College">E. Bronson Ingram College</option>
              <option value="Moore College">Moore College</option>
              <option value="Zeppos College">Zeppos College</option>
              <option value="Rothschild College">Rothschild College</option>
              <option value="Warren College">Warren College</option>
              <option value="Mayfield Place">Mayfield Place</option>
              <option value="McGill Hall">McGill Hall</option>
              <option value="Off Campus">Off Campus</option>
            </select>

            <label htmlFor="classOf">Class Of:</label>
            <select id="classOf" name="classOf" required className="modal-input">
              <option value="">Select Class</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              {/* Add more class options as needed */}
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;



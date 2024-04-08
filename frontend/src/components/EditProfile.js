import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './EditProfile.css';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [backgroundPic, setBackgroundPic] = useState(null);
  const [previewProfilePic, setPreviewProfilePic] = useState('');
  const [previewBackgroundPic, setPreviewBackgroundPic] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewProfilePic(reader.result);
      reader.readAsDataURL(profilePic);
    } else {
      setPreviewProfilePic(null);
    }
  }, [profilePic]);

  useEffect(() => {
    if (backgroundPic) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewBackgroundPic(reader.result);
      reader.readAsDataURL(backgroundPic);
    } else {
      setPreviewBackgroundPic(null);
    }
  }, [backgroundPic]);

  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const handleBackgroundPicChange = (event) => {
    setBackgroundPic(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, gender, birthday, location, classOf } = event.target.elements;
  
      console.log('Starting profile update...');
  
      let profilePicUrl = user?.profilePic || '';
      let backgroundPicUrl = user?.backgroundPic || '';
  
      if (profilePic) {
        console.log('Uploading profile picture...');
        const profilePicRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        const uploadResult = await uploadBytes(profilePicRef, profilePic);
        profilePicUrl = await getDownloadURL(uploadResult.ref);
        console.log('Profile picture uploaded:', profilePicUrl);
      }
  
      if (backgroundPic) {
        console.log('Uploading background picture...');
        const backgroundPicRef = ref(storage, `backgroundPics/${auth.currentUser.uid}`);
        const uploadResult = await uploadBytes(backgroundPicRef, backgroundPic);
        backgroundPicUrl = await getDownloadURL(uploadResult.ref);
        console.log('Background picture uploaded:', backgroundPicUrl);
      }
  
      console.log('Updating Firestore document...');
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name: name.value,
        gender: gender.value,
        birthday: birthday.value,
        location: location.value,
        classOf: classOf.value,
        profilePic: profilePicUrl,
        backgroundPic: backgroundPicUrl,
      });
  
      console.log('Fetching updated data...');
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
      alert("Profile updated successfully!");
      navigate('/profile'); 
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("There was an error updating the profile.");
    }
  };
  

  return (
    <div className="profile-container">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          {previewProfilePic && (
            <img src={previewProfilePic} alt="Profile Preview" className="profile-preview" />
          )}
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" defaultValue={user?.name} className="modal-input" />


          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" defaultValue={user?.gender} className="modal-input">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          <label htmlFor="birthday">Birthday:</label>
          <input type="date" id="birthday" name="birthday" defaultValue={user?.birthday} className="modal-input" />

          <label htmlFor="location">Location:</label>
          <select id="location" name="location" defaultValue={user?.location} className="modal-input">
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
          <select id="classOf" name="classOf" defaultValue={user?.classOf} className="modal-input">
          <option value="">Select Class</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>          </select>
          <label htmlFor="profilePic">Profile Picture:</label>

          {previewProfilePic && (
            <img src={previewProfilePic} alt="Profile Preview" className="profile-preview" />
          )}
          <label htmlFor="profilePic">Profile Picture:</label>
          <input type="file" id="profilePic" name="profilePic" onChange={handleProfilePicChange} />

          {previewBackgroundPic && (
            <img src={previewBackgroundPic} alt="Background Preview" className="background-preview" />
          )}
          <label htmlFor="backgroundPic">Background Picture:</label>
          <input type="file" id="backgroundPic" name="backgroundPic" onChange={handleBackgroundPicChange} />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
import React, { useState } from 'react';
import Navbar from './NavBar'; // Adjust the import path as necessary
import { getAuth, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Security = () => {
  const [reason, setReason] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete your account?");
    if (isConfirmed) {
      // Here you could use the reason for further processing or logging
      console.log("Account deletion confirmed, reason: ", reason);

      try {
        // Logic to delete account goes here
        await deleteUser(user);
        console.log("User account deleted successfully.");
        navigate('/login'); // Redirect user to login page after account deletion
      } catch (error) {
        console.error("Error deleting user account: ", error.message);
        // Handle errors here, such as prompting the user to reauthenticate if necessary
        alert("Failed to delete account. Please reauthenticate or try again later.");
      }

      // Clear the reason state after attempting deletion
      setReason('');
    } else {
      console.log("Account deletion cancelled");
      // Optionally reset the reason if cancellation is preferred
      setReason('');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      {/* Centering content */}
      <div className="flex-grow flex justify-center items-center bg-[rgb(254,249,240)]">
        <div className="w-full max-w-md px-6 py-8">
          <h1 className="text-xl font-bold mb-4 text-center text-black">Security Settings</h1>
          <p className="text-center text-black mb-8">Manage your security settings from this page.</p>
          
          <div className="mt-4">
            <p className="mb-2 text-center text-black">Why do you want to delete your account?</p>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Your reason..."
            />
          </div>

          {/* Delete Account Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;

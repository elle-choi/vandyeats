import React, { useState } from 'react';
import Navbar from './NavBar'; // Adjust the import path as necessary

const Security = () => {
  const [reason, setReason] = useState('');

  // Function to handle account deletion
  const handleDeleteAccount = () => {
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete your account?");
    if (isConfirmed) {
      // Here you could use the reason for further processing or logging
      console.log("Account deletion confirmed, reason: ", reason);
      // Logic to delete account goes here
      // Remember to clear the reason state after performing deletion tasks
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
      <div className="bg-[rgb(254,249,240)] flex flex-grow w-full mt-16 justify-center">
        <div className="w-full max-w-2xl mx-auto px-8 pt-6 pb-8 mb-4">
          <h1 className="text-xl font-bold mb-4 text-black">Security Settings</h1>
          <p className="text-black">Manage your security settings from this page.</p>
          
          <div className="mt-4">
            <p className="mb-2 text-black">Why do you want to delete your account?</p>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Your reason..."
            />
          </div>

          {/* Delete Account Button */}
          <div className="mt-4">
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

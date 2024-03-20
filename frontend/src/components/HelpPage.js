import React from 'react';
import Navbar from './NavBar'; // Make sure the path matches where your Navbar component is located

const HelpPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-[rgb(254,249,240)] w-full max-w-4xl mx-auto p-8 rounded-lg">
          <h1 className="text-xl font-bold text-black mb-4">Help and Support</h1>
          <div className="text-black">
            <p>If you have any questions or need assistance, please refer to the following FAQs or contact our support team.</p>
            {/* Add your FAQs or other help content here */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
              <ul className="list-disc pl-6">
                <li>How do I change my password?</li>
                <li>How can I delete my account?</li>
                <li>What should I do if I forget my password?</li>
                {/* Add more questions as needed */}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Contact Support</h2>
              <p>If you need further assistance, please reach out to our support team.</p>
              <p>Email: <a href="vandyeats@gmail.com" className="text-blue-500">vandyeats@gmail.com</a></p>
              {/* Add more contact details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;

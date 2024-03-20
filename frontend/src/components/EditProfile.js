import React, { useState } from 'react';
import Navbar from "./NavBar.js";
import "./HomePage.css";
import { Link } from "react-router-dom";

const labels = ["Name", "Class of", "Gender", "Birthday", "Residence", "Email"];

const TextInputBox = ({ label, value, onChange }) => (
    <div className="flex w-full my-2">
        <span className='text-[#212121] text-sm w-32'>{label}:</span>
        <input 
            type="text" 
            value={value} 
            onChange={e => onChange(e.target.value)}
            className="ml-4 p-2 border-2 border-gray-300 rounded text-black"
        />
    </div>
);

const Home = () => {
    const [texts, setTexts] = useState(Array(6).fill(''));

    const updateText = (index, newText) => {
        const updatedTexts = [...texts];
        updatedTexts[index] = newText;
        setTexts(updatedTexts);
    };

    return (
        <div className="w-screen h-screen flex flex-col"> 
            <Navbar />
            <div className='bg-[rgb(254,249,240)] flex flex-grow w-full mt-16'>
                <div className='w-9/12 flex flex-col flex-grow'>
                    <div className="h-full flex justify-center items-start pt-10">
                        <div className='h-full w-full flex flex-col justify-start items-center'>
                            <h1 className="text-[#212121] mb-10 font-bold text-xl">Edit Profile</h1>
                            <div className='w-5/6'>
                                {texts.map((text, index) => (
                                    <TextInputBox 
                                        key={index}
                                        label={labels[index]}
                                        value={text}
                                        onChange={(newText) => updateText(index, newText)}
                                    />
                                ))}
                            </div>
                            <Link to="/profile" className="mt-4 p-2 bg-[#212121] text-white font-bold rounded block text-center">
                                Submit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { GiTargetPrize } from 'react-icons/gi';
import { FaUserLarge } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.authuser);
  const dispatch = useDispatch();
  const activeUser = data.user;

  const northIndianFirstNames = [
    'Rahul', 'Ankit', 'Rohit', 'Vikram', 'Sandeep', 'Pooja', 'Anjali', 'Neha', 'Priya', 'Ritu'
  ];

  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % northIndianFirstNames.length);
    }, 1000); // Change name every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [northIndianFirstNames.length]);

  return (
    <>
      <nav className='flex p-5 shadow-sm bg-blue-950 sticky top-0 z-20'>
        <div className='gap-2 flex flex-1 justify-center items-center text-white text-xl'>
          <GiTargetPrize className='text-yellow-400 text-3xl' />
          <h1>iPhone Giveaway</h1>
        </div>
        {activeUser && (
          <div className='flex flex-1 justify-end items-center' onClick={() => navigate('/profile')}>
            <FaUserLarge className='border rounded-full h-10 w-10 text-gray-400 border-gray-400' />
          </div>
        )}
      </nav>
      
      <div className="overflow-hidden relative w-full bg-blue-950 text-white">
        <div className="marquee flex gap-8 justify-center items-center text-lg font-bold whitespace-nowrap">
          <span className="transform-gpu rotate-x-6 skew-y-3">
            <span className='text-orange-700 text-lg'> {northIndianFirstNames[currentNameIndex]} </span> already won the iPhone!
          </span>
          <img src="iphonefront.jpg" alt="iPhone" className="w-10 h-10 transform-gpu rotate-x-6 skew-y-3" />
          <span className="transform-gpu rotate-x-6 skew-y-3">
            Join Now to Win!
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {
  const data = useSelector((state) => state.authuser);
  const info = data.infoid; // Use `info` instead of `infoid` directly
  const [utrValues, setUtrValues] = useState([]);

  useEffect(() => {
    if (info) {
      const getUtrById = async () => {
        try {
          const result = await axios.post(`/api/getUtrValuesbyid/${info}`);
          if (result.data) {
            setUtrValues(result.data.utrValues); // Store UTR values for ID
          }
        } catch (error) {
        }
      };
      getUtrById();
    }
  }, [info]);

  // Filter UTR values that are less than 10 digits
  const filteredUtrValues = utrValues.filter(utr => utr.length < 10);

  return (
    <div className='flex flex-col mt-10 items-center'>
      <FaUser className='z-20 text-[100px] text-white border-2 p-3 rounded-full mb-[-20px] bg-blue-950' />
      <div className='p-8 bg-blue-950 text-white w-full flex flex-col items-center'>
        <p className='text-lg'>Total Slot Booked</p>
        {/* Display filtered UTR values (less than 10 digits) */}
        <div className="mt-4">
          {filteredUtrValues.length > 0 ? (
            <ul className='flex flex-wrap gap-5 justify-center items-center'>
              {filteredUtrValues.map((utr, index) => (
                <li key={index} className="text-white bg-green-800 p-3 rounded-full w-14 h-14">
                  {utr}
                </li>
              ))}
            </ul>
          ) : (
            <p className='mb-80'>No slot booked.</p>
          )}
        </div>
      </div>
      <Link to="/logout" className='mb-80 px-20 py-3 text-lg text-white shadow-lg rounded-xl mt-8 bg-cyan-800'>Logout</Link>
    </div>
  );
};

export default Profile;

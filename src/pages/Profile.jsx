import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa6";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BaseUrl } from './Urls';

const Profile = () => {
  const data = useSelector((state) => state.authuser);
  const userid = data.id; // Use `info` instead of `infoid` directly
  const [storecurrentbox,setCurrentBox] = useState([])

  useEffect(() => {
    if (userid) {
      const getvalueById = async () => {
        try {
          const result = await axios.post(`${BaseUrl}/api/fetchuserbyid/${userid}`);
          if (result.data.status) {
            let storeinarray = []
            result.data.fetcheddata.userinfoids.map(item=>{
              storeinarray.push(item.boxno)
            }) 
            setCurrentBox(storeinarray)
          }
        } catch (error) {
          console.log(error)
        }
      };
      getvalueById();
    }
  }, [userid]);


  return (
    <div className='flex flex-col mt-10 items-center'>
      <FaUser className='z-20 text-[100px] text-white border-2 p-3 rounded-full mb-[-20px] bg-blue-950' />
      <div className='p-8 bg-blue-950 text-white w-full flex flex-col items-center'>
        <p className='text-lg'>Total Slot Booked</p>
        {/* Display filtered UTR values (less than 10 digits) */}
        <div className="mt-4">
            <ul className='flex flex-wrap gap-5 justify-center items-center'>
              {
                storecurrentbox.map((item,index)=>(
                  <li key={index} className="text-white bg-green-800 p-3 rounded-full w-14 h-14">
                    {item}
                  </li>
                ))
              }
            </ul>
        </div>
      </div>
      <Link to="/logout" className='mb-80 px-20 py-3 text-lg text-white shadow-lg rounded-xl mt-8 bg-cyan-800'>Logout</Link>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsStars } from "react-icons/bs";
import { WiStars } from "react-icons/wi";
import { validUSer,userid,infoid } from '../redux/features/AuthSlices';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()

  const count = useSelector((state) => state.authuser)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/signup', { phone, password });
      if (response.data.status) {
        dispatch(infoid(response.data.data.userinfoid))
        dispatch(userid(response.data.data._id))
        dispatch(validUSer(true))
        setSuccess('Signup successful!');
        setPhone('')
        setPassword('')
        navigate('/dashboard')
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col py-10 min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600">
      <div className='mx-14 text-center flex ml-8'>
        <div className='flex flex-1 justify-center'>
            <img src="iphonefront.jpg" alt="iphone front" height={50} width={50} className='rounded-lg'/>
        </div>
        <div className='font-bold flex flex-col flex-1 justify-center items-center'>
            <div className='flex text-yellow-300 text-lg'>
            <BsStars/>
            <WiStars/>
            <WiStars/>
            {/* <BsStars/> */}
            <WiStars/>
            <WiStars/>
            <BsStars/>
            </div>
            <p className='text-xl text-yellow-400'>Participate now</p>
            <p className='text-lg text-yellow-500'>fill the form</p>
            <p className='text-yellow-600'>get your iphone</p>
            <div className='flex text-yellow-300 text-lg'>
            <BsStars/>
            <WiStars/>
            <WiStars/>
            {/* <BsStars/> */}
            <WiStars/>
            <WiStars/>
            <BsStars/>
            </div>
        </div>
      </div>
      <ul className='font-semibold mx-7 p-5 rounded-lg gap-2 text-yellow-300 text-lg bg-transparent'>
            <li className=' mt-2 text-md'>10 winners will selected out of 1000</li>
            <li className=' mt-2 text-md'>participate at your own risk</li>
      </ul>
      <div className="bg-gray-200 p-8 mx-7 my-10 rounded-lg shadow-lg transform transition-all duration-500 hover:rotate-y-0 hover:rotate-x-0 rotate-y-10 rotate-x-5">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:bg-blue-600 hover:-translate-y-1"
          >
            Sign Up
          </button>
          <div className='text-sm text-blue-600 underline mt-4'>
            <Link to="/signin">Already have account / login</Link>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React, { useEffect, useState, useRef } from 'react';
import { ImCross } from "react-icons/im";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGift, FaStar } from 'react-icons/fa6';
import { BsBalloonHeart } from 'react-icons/bs';
import { setAlert, setAlertStatus } from '../redux/features/AuthSlices'; 

const UserBoxes4 = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    instaId: '',
    phone: '',
    email: '',
  });
  const [utrValues, setUtrValues] = useState([]);
  const [utrValuesById, setUtrValuesById] = useState([]);
  const [boxId, setBoxId] = useState(null);
  const [formOpenStatus, setFormOpenStatus] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  const data = useSelector((state) => state.authuser);
  const dispatch = useDispatch();
  const id = data.id;
  const info = data.infoid;
  const payment = data.paymentStatus;

  useEffect(() => {
    const getUtr = async () => {
      try {
        const result = await axios.post('/api/getAllUtrValues');
        if (result.data.utrValues) {
          setUtrValues(result.data.utrValues.map(item => item.utr));
        }
      } catch (error) {
      }
    };
    getUtr();
  }, []);

  useEffect(() => {
    if (info) {
      const getUtrById = async () => {
        try {
          const result = await axios.post(`/api/getUtrValuesbyid/${info}`);
          if (result.data) {
            setUtrValuesById(result.data.utrValues);
          }
        } catch (error) {
        }
      };
      getUtrById();
    }
  }, [info]);

  const toggleFormStatus = (e) => {
    if (e) {
      setBoxId(e.target.name);
    }
    setFormOpenStatus(prevStatus => !prevStatus); // Toggle visibility
    setErrors({});
    window.scrollTo(0, 0); // Scroll to top
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
  
    // Fullname validation: at least 3 characters
    if (!formData.fullname) {
      newErrors.fullname = 'Fullname is empty';
    }
  
    // InstaId validation: only allow alphanumeric, underscores, and dots
    if (!formData.instaId) {
      newErrors.instaId = 'Instagram ID is required';
    } 
  
    // If there are errors, set them and don't proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // If no errors, proceed with the submission
    setErrors({});
    setFormOpenStatus(false);
  
    const data = {
      currentPath: location.pathname,
      fullname: formData.fullname,
      instaId: formData.instaId,
      phone: formData.phone,
      email: formData.email,
      boxId: boxId
    };
  
    const serializedData = JSON.stringify(data);
    const encodedData = encodeURIComponent(serializedData);
  
    navigate(`/payment?from=${encodedData}`);
  };
  
  const isCheckboxDisabled = (name) => {
    return utrValues.includes(name) && name.length <= 10;
  };

  const hasRedBorder = (name) => {
    return utrValuesById.includes(name);
  };

  return (
    <div className='bg-dark-blue flex items-center flex-col min-h-screen overflow-auto'>
      <p className='text-green-900 px-5 text-xl font-bold py-3 w-full bg-yellow-400'>GIVEAWAY 4</p>
      {/* Your previous code for giveaway winner popup */}
      <div className='w-96 p-5 flex flex-col text-yellow-400'>
        <li className='p-2'>Book any white slot</li>
        <li className='p-2'>Fill the form</li>
        <li className='p-2'>Make payment</li>
        <div className='flex '>
          <p className='px-4 py-2 font-bold text-white flex bg-blue-900 justify-center items-center rounded-lg mt-5' onClick={() => navigate('/dashboard')}>Open All Giveaways</p>
        </div>
      </div>

      {/* <div className="fixed inset-0 flex items-center justify-center z-50 mx-5">
        <div className="relative bg-gradient-to-r from-purple-800 via-pink-800 to-red-800 p-10 rounded-lg shadow-lg max-w-md w-full text-center">
          <ImCross 
            className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
            onClick={() => {}} 
          />
          <div className="text-5xl mb-4">
            <FaStar className="inline-block text-yellow-300" />
            <FaGift className="inline-block text-green-300 mx-4" />
            <BsBalloonHeart className="inline-block text-blue-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
          <p className="text-xl text-white">🎉 ....., you're the giveaway winner! 🎉</p>
          <div className="mt-5 flex justify-center gap-3">
            <FaStar className="text-yellow-300 text-4xl" />
            <BsBalloonHeart className="text-blue-300 text-4xl" />
            <FaGift className="text-green-300 text-4xl" />
          </div>
        </div>
      </div> */}

{/* slot booked congo start */}
<p className=' text-white text-lg'>slots 302 - 401</p>
<div className={`mt-10 fixed inset-0 ${data.alertStatus?'flex':'hidden'} items-center justify-center z-50 mx-5`}>
        <div className="relative bg-gradient-to-r from-green-500 via-green-800 to-green-800 p-10 rounded-lg shadow-lg max-w-md w-full text-center">
          <ImCross 
            className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
            onClick={()=>dispatch(setAlertStatus(false))} 
          />
          <div className="text-5xl mb-10">
            <FaStar className="inline-block text-yellow-300" />
            <FaGift className="inline-block text-green-300 mx-4" />
            <BsBalloonHeart className="inline-block text-blue-300" />
          </div>
          <h2 className="text-3xl font-bold text-yellow-300 mb-4">Congratulations!</h2>
          <p className="text-xl text-center text-yellow-500 font-bold mb-3 bg-green-950 p-3 rounded-lg">once your payment will verified successfully <br /> than slot will be booked</p>
          <p className='text-red-900 font-bold text-lg'>wrong payment details will disqualify you</p>
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">Best wishes to you</h2>
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">Now payment is verifying...</h2>
          <div className="mt-5 flex justify-center gap-3">
            <FaStar className="text-yellow-300 text-4xl" />
            <BsBalloonHeart className="text-blue-300 text-4xl" />
            <FaGift className="text-green-300 text-4xl" />
          </div>
          <p className="text-xl text-center text-cyan-200 font-bold mt-5">You can book more slots also</p>
          <p className="text-xl text-center text-cyan-200 font-bold mt-5">the more you book , the more your chances increases to win</p>
          <i className='text-lg text-yellow-400 block mt-5 font-bold'>1 winner will be selected out of 100 users</i>
          <button onClick={()=>dispatch(setAlertStatus(false))} className='bg-orange-900 text-white shadow-lg shadow-white px-8 py-2 mt-10 text-2xl rounded-lg active:shadow-2xl'>Exit</button>
        </div>
      </div>
{/* slot booked congo end */}

      <div className='flex flex-col justify-center items-center'>
        {/* Form */}
        <div
          ref={formRef}
          className={` bg-gradient-to-r from-green-950 via-green-950 to-green-950 z-20 w-96 p-10 shadow-lg rounded-lg transition-transform duration-300 ease-in-out ${formOpenStatus ? 'translate-y-0' : 'translate-y-full hidden'}`}
        >
          <ImCross onClick={() => setFormOpenStatus(false)} className='text-white float-right mt-[-20px] text-2xl border-4 bg-black border-black cursor-pointer' />
          <form onSubmit={handleSubmit}>
            <p className='text-center text-2xl text-white mb-4'>Giveaway Form</p>

            {['fullname', 'instaId', 'phone', 'email'].map((field, index) => (
              <div className="mb-4" key={index}>
                <label className={`block text-lg font-medium text-white`}>
                  {field === 'instaId' ? 'Instagram user id' : field.charAt(0).toUpperCase() + field.slice(1)} {field === 'fullname' || field === 'instaId' ? <span className="text-red-500">*</span> : null}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                />
                {errors[field] && <p className="text-red-600 text-lg mt-1">{errors[field]}</p>}
              </div>
            ))}

            <ul className='text-white'>
              <p className='text-red-500'>Note:-</p>
              <li>1. Only 1 user will win the giveaway</li>
              <li>2. Participation fee will not be refunded</li>
              <li>3. User can participate any number of times</li>
              <li>4. User will participate at their own risk</li>
            </ul>

            <button type="submit" className="mt-10 w-full bg-indigo-600 text-white py-2 px-4 border rounded-md shadow-sm hover:bg-indigo-700">Submit</button>
          </form>
        </div>

        {/* Checkbox Inputs */}
        <form className='z-10 w-80'>
          {[...Array(20)].map((_, rowIndex) => (
            <ul key={rowIndex} className='flex p-5 gap-5'>
              {[...Array(5)].map((_, colIndex) => {
                const checkboxName = `${301 + rowIndex * 5 + colIndex + 1}`;
                return (
                  <input
                    key={301 + rowIndex * 5 + colIndex}
                    type='checkbox'
                    className={`appearance-none disabled:bg-green-500 w-10 h-10 bg-white flex-1 ${hasRedBorder(checkboxName) ? 'border-red-300 border-2 rounded-full' : ''}`}
                    name={checkboxName}
                    onClick={toggleFormStatus}
                    disabled={isCheckboxDisabled(checkboxName)}
                  />
                );
              })}
            </ul>
          ))}
        </form>
      </div>
    </div>
  );
};

export default UserBoxes4;

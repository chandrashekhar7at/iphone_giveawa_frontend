import React, { useEffect, useState } from 'react';
import { ImCross } from "react-icons/im";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { BaseUrl } from './Urls';
import { setfullname, setemail, setinstaId, setphone, setBoxNo } from '../redux/features/UserInfoSlice';
import { TbNorthStar } from "react-icons/tb";
import { FaStar, FaGift } from 'react-icons/fa'; // Icons for stars, gifts, flowers


const UserBoxes = () => {
  const [fullname, setFullname] = useState('');
  const [instaId, setInstaId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [boxnumber, setBoxNumber] = useState('');
  const [formOpenStatus, setFormOpenStatus] = useState(false);
  const [allusersdata, setAllUsersdata] = useState([]);
  const [allusersdataids,setAllUsersdataids] = useState([])
  const [storecurrentboxes,setStoreCurrentBoxes] = useState([])
  const [errorr,setError] = useState('')
  const [storewinnerstatus,setStoreWinnerStatus] = useState([])

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageid = queryParams.get('id');
  const boxstart = parseInt(queryParams.get('start'), 10) || 0; // Ensure it's a number


  const dispatch = useDispatch();
  const infodata = useSelector(state => state.userInfo);
  const userdata = useSelector(state=> state.authuser)
  const userID =userdata.id

  useEffect(() => {
    window.scrollTo(0,0)
    const fetchBookedBox = async () => {
      try {
        const result = await axios.post(`${BaseUrl}/api/fetchAllusers`);
        
        if (result.data.status) {
          // Extract all boxno values from the response and remove duplicates
          // console.log(result.data.Alldata)
          let storearraydata = []
          result.data.Alldata
          .map(item=>{
            if(item._id == userID.toString()){
              item.userinfoids.map((innitems,i)=>{
                storearraydata.push(innitems.boxno)
              })
            }
          })
          const boxnos = result.data.Alldata
            .flatMap(items => items.userinfoids.map(inneritems => inneritems.boxno))
            .filter((value, index, self) => self.indexOf(value) === index);
          const userid = result.data.Alldata
            .flatMap(items => items.userinfoids.map(inneritems => inneritems.detailsinfoid))
            .filter((value, index, self) => self.indexOf(value) === index);
          
          setAllUsersdata(boxnos);
          setAllUsersdataids(userid)
          setStoreCurrentBoxes(storearraydata)
        } else {
        }
      } catch (error) {
      }
    };
  
    fetchBookedBox();
  }, []);

  useEffect(()=>{
    const fetchwinnerdetail = async()=>{
      try {
        const result = await axios.post(`${BaseUrl}/api/fetchuserdetails`)
        if(result.data.status){
          setStoreWinnerStatus(result.data.fetchdata)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchwinnerdetail()
  },[])


  const handleCheckBoxClick = (index) => {
    window.scrollTo(0, 0);
    setBoxNumber(index);
    setFormOpenStatus(!formOpenStatus);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!fullname || !instaId){
      setError('fullname and instagram user id are required')
      return;
    }
    setError('')
    dispatch(setfullname(fullname));
    dispatch(setemail(email));
    dispatch(setinstaId(instaId));
    dispatch(setphone(phone));
    dispatch(setBoxNo(boxnumber));
    
    setFormOpenStatus(!formOpenStatus);
    window.location.href = 'https://superprofile.bio/vp/66e6a803166e4000134b4fa5';
  };


  return (
    <div className='bg-dark-blue flex items-center flex-col min-h-screen overflow-auto'>
      <p className='text-green-900 px-5 text-xl font-bold py-3 w-full bg-yellow-400'>GIVEAWAY {(boxstart+100)/100}</p>
      <div className='w-96 p-5 flex flex-col text-yellow-400'>
        <li className='p-2'>Book any white slot</li>
        <li className='p-2'>Fill the form</li>
        <li className='p-2'>Make payment</li>
        <div className='flex'>
          <p className='px-4 py-2 font-bold text-white flex bg-blue-900 justify-center items-center rounded-lg mt-5' onClick={() => navigate('/dashboard')}>Open All Giveaways</p>
        </div>
      </div>

      <div className={`${formOpenStatus ? 'flex' : 'hidden'} justify-center items-center w-full`}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 bg-gradient-to-r w-[350px] from-green-950 via-green-950 to-green-950 p-6 rounded-lg shadow-lg">
          <div className='flex'>
            <h2 className='flex-1 text-center text-2xl font-semibold text-white mb-6'>Giveaway Form</h2>
            <ImCross onClick={() => { setFormOpenStatus(!formOpenStatus) }} className='text-white text-2xl flex-2' />
          </div>
            <p className='text-red-700 font-bold text-lg'>{errorr?errorr:''}</p>
          
          <div className='flex flex-col'>
            <label htmlFor="fullname" className="mb-2 font-medium text-white">Full Name <TbNorthStar className='inline-block text-red-600'/></label>
            <input 
              type="text" 
              id="fullname" 
              name="fullname"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              placeholder="Enter your full name" 
              className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="instaid" className="mb-2 font-medium text-white">Instagram ID <TbNorthStar className='inline-block text-red-600'/></label>
            <input 
              type="text" 
              id="instaid" 
              name="instaid" 
              onChange={(e) => setInstaId(e.target.value)}
              value={instaId}
              placeholder="Enter your Instagram ID" 
              className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="email" className="mb-2 font-medium text-white">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email" 
              className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="phone" className="mb-2 font-medium text-white">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Enter your phone number" 
              className="border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            />
          </div>

          <ul className='text-white'>
            <p className='text-red-500'>Note:-</p>
            <li>1. Only 1 user will win the giveaway</li>
            <li>2. Participation fee will not be refunded</li>
            <li>3. User can participate any number of times</li>
            <li>4. User will participate at their own risk</li>
          </ul>

          <input 
            type="submit" 
            value="Submit" 
            className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          />
        </form>
      </div>
      
      <div className='flex flex-col justify-center items-center'>
        {/* win message */}
        {
          storewinnerstatus.map((item,index)=>{
              if(item.winner && parseInt(item.boxno) >boxstart && parseInt(item.boxno)<=boxstart+100){

              return <div key={index} className="relative flex flex-col items-center p-6 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-lg shadow-lg">
                    <div className="absolute -top-10 left-10 animate-bounce">
                      <FaStar className="text-yellow-300 text-5xl" />
                    </div>
                    <div className="absolute top-0 right-10 animate-pulse">
                      <FaGift className="text-pink-300 text-5xl" />
                    </div>
                    <div className=" bottom-10 left-10 animate-spin-slow">
                      <FaGift className="text-red-300 text-5xl" />
                    </div>
                    <div className="absolute -top-10 float-right animate-bounce">
                      <FaStar className="text-yellow-300 text-5xl" />
                    </div>
                    <div className="absolute -top-10 float-right left-80 animate-bounce">
                      <FaStar className="text-yellow-300 text-5xl" />
                    </div>

                    <div className="flex flex-col text-center gap-3">
                      <h2 className="text-3xl font-bold text-green-700">Congratulations! {item.fullname}</h2>
                      <h2 className="text-3xl font-bold text-orange-800">you won Giveaway</h2>
                      <h2 className="text-3xl font-bold"> slot no. {item.boxno}!</h2>
                      <p className="mt-4 text-xl">Enjoy your prize and stay tuned for more surprises!</p>
                    </div>
                  </div>
              }
          })
        }
        {/* boxes */}
        <form className='mx-8 flex flex-wrap gap-2 items-center justify-center'>
          {Array.from({ length: 100 }, (_, index) => (
            <div key={index + 1+boxstart} className='flex flex-col items-center'>
              <span className="text-sm text-gray-300">{index + 1+boxstart}</span> {/* Display the index */}
              <input
                onClick={() => handleCheckBoxClick(index + 1+boxstart)}
                type="checkbox"
                className={`${storecurrentboxes.includes((index+1+boxstart).toString())?'rounded-full':'rounded-none'} appearance-none w-11 h-11 m-2 ${allusersdata.includes((index + 1+boxstart).toString()) ? 'bg-green-800' : 'bg-white'}`} // Conditional background color
                disabled={allusersdata.includes((index+1+boxstart).toString())} // Disable checkboxes whose label number matches `allusersdata`
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default UserBoxes;

import React, { useEffect } from 'react'
import { setAlertStatus } from '../redux/features/AuthSlices'
import { useDispatch,useSelector } from 'react-redux'
import { FaGift, FaStar } from 'react-icons/fa6'
import { BsBalloonHeart } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { setRandomNum } from '../redux/features/UserInfoSlice'

const PaymentSuccess = () => {
    const dispatch = useDispatch()
    const data = useSelector(state=>state.authuser)
    const userInfodata = useSelector(state=>state.userInfo)
    const navigate = useNavigate()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const randomId = queryParams.get('randomId');

    useEffect(()=>{
        if(userInfodata.randomno == randomId){
            dispatch(setRandomNum(0))
        }else{
            dispatch(setRandomNum(0))
            navigate('/dashboard')
        }
    },[])
  return (
    <div className='bg-gradient-to-r from-green-500 via-green-800 to-green-800'>
        {/* slot booked congo start */}
      <div className={`inset-0 flex items-center justify-center z-50`}>
        <div className="p-10 rounded-lg shadow-lg w-full text-center">
          <div className="text-5xl mb-10">
            <FaStar className="inline-block text-yellow-300" />
            <FaGift className="inline-block text-green-300 mx-4" />
            <BsBalloonHeart className="inline-block text-blue-300" />
          </div>
          <h2 className="text-3xl font-bold text-yellow-300 mb-4">Congratulations!</h2>
          <p className="text-xl text-center text-yellow-500 font-bold mb-3 bg-green-950 p-3 rounded-lg">payment verified successfully <br /> your slot is booked</p>
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">Best wishes to you</h2>
          <div className="mt-5 flex justify-center gap-3">
            <FaStar className="text-yellow-300 text-4xl" />
            <BsBalloonHeart className="text-blue-300 text-4xl" />
            <FaGift className="text-green-300 text-4xl" />
          </div>
          <p className="text-xl text-center text-cyan-200 font-bold mt-5">You can book more slots also</p>
          <p className="text-xl text-center text-cyan-200 font-bold mt-5">the more you book , the more your chances increases to win</p>
          <i className='text-lg text-yellow-400 block mt-5 font-bold'>1 winner will be selected out of 100 users</i>
          <button 
          onClick={()=>navigate('/dashboard')}
           className='bg-cyan-800 text-white shadow-lg shadow-white px-8 py-2 mt-10 text-xl rounded-lg active:shadow-2xl'>goto dashboard</button>
        </div>
      </div>
{/* slot booked congo end */}
    </div>
  )
}

export default PaymentSuccess
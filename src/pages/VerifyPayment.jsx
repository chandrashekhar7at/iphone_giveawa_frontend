import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseUrl } from './Urls'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRandomNum } from '../redux/features/UserInfoSlice'
import './Spinner.css'; // Import the CSS for the spinner


const VerifyPayment = () => {

  const userinfodata = useSelector(state=>state.userInfo)
  const userAuthdata = useSelector(state=>state.authuser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
      const userid = userAuthdata.id
      const fullname = userinfodata.fullname
      const instaid = userinfodata.instaId
      const email = userinfodata.email
      const phone = userinfodata.phone
      const boxno = userinfodata.boxno
    const ChangePaymentStatus = async()=>{
        try {
            const result = await axios.post(`${BaseUrl}/api/saveuserinfo`,{
                userid,fullname,instaid,email,phone,boxno
            })
            if(result.data.status){
                // generate random number id
                const getRandomInt = (min, max) => {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };
                
                const randomNumber = getRandomInt(2000000000000, 90000000000000); // Generates a random integer between 1 and 100
                dispatch(setRandomNum(randomNumber))
                // navigate to payment success page
                navigate(`/paymentsuccess?randomId=${randomNumber}`)
                return
            }
            navigate('/dashboard')
        } catch (error) {
            navigate('/dashboard')
        }
    }
    ChangePaymentStatus()
},[])
    return (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ); // Loading spinner
}

export default VerifyPayment
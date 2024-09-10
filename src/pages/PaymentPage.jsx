import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { infoid,setAlert, setAlertStatus, setpaymentStatus } from '../redux/features/AuthSlices';

const PaymentPage = () => {
    const [utr, setUtr] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const [userdata, setUserData] = useState({});
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get('from');

    const dispatch = useDispatch();
    const data = useSelector(state => state.authuser);
    const navigate = useNavigate();

    const currentPath = data.currentPath;
    const formData = data.formData;
    // const infoid = data.infoid;
    const usersaveddata = data;

    useEffect(() => {
        dispatch(setpaymentStatus(false));
        if (encodedData) {
            try {
                const decodedData = decodeURIComponent(encodedData);
                setUserData(JSON.parse(decodedData));
            } catch (e) {
            }
        }
    }, [encodedData, dispatch]);

    const handleUtrChange = (e) => {
        setUtr(e.target.value);
    };

    const handleUtrSubmit = async (e) => {
        e.preventDefault();

        if (utr.length !== 12) {
            setError('UTR number must be 12 digits long');
            return;
        }
        try {
            const result = await axios.post(`https://iphonegiveaway-sjph.onrender.com/api/saveuserinfo/${usersaveddata.id}`, {
                formData: {
                    fullname: userdata.fullname,
                    email: userdata.email,
                    phone: userdata.phone,
                    instaId: userdata.instaId,
                    utr:utr
                },
                boxId: userdata.boxId,
                id: usersaveddata.id
            });
            if (result.status === 200) {
                dispatch(infoid(result.data.user._id))
                setError('');
                setUtr(''); // Clear the input field
                dispatch(setpaymentStatus(true));
                dispatch(setAlertStatus(true));
                dispatch(setAlert('Successfully Booked Slot'));
                navigate(userdata.currentPath);
            }
        } catch (error) {
            dispatch(setAlert('Slot booking failed'));
        }
    };

    return (
        <div className=''>
            <p className='text-2xl mt-10 mx-10 font-bold'>Adding Rs300</p>
            <div className='bg-gray-100 mt-5 px-10'>
                <p className='font-bold pt-10'>QR Code</p>
                <img src="QR_code.webp" alt="qr" width={300} height={300} />
            </div>
            <form onSubmit={handleUtrSubmit} className='mx-5 flex flex-col rounded-sm p-5 shadow-md shadow-gray-600 mt-10 mb-20'>
                <label htmlFor="utr" className='font-bold'>UTR NO. / UPI Ref. no</label>
                <p className='text-red-500'>Enter 12 digit UTR Number</p>
                <input
                    type="text"
                    name='utr'
                    id='utr'
                    placeholder='Enter UTR'
                    className='text-2xl outline rounded-md px-5 py-2 mt-3'
                    value={utr}
                    onChange={handleUtrChange}
                />
                {error && <p className='text-red-500 mt-2'>{error}</p>}
                <input
                    type="submit"
                    value="Submit UTR / UPI Ref no."
                    className='bg-green-800 mt-8 text-lg p-2 text-white'
                />
            </form>
            <ul className='mx-10 text-lg'>
                <p className='text-red-600'>Note:-</p>
                <li>1. Submission of UTR no. or UPI Ref no. is necessary</li>
                <li>2. Without UTR no. or UPI Ref no., payment will not be verified</li>
                <li>3. You are disqualified if UTR or UPI Ref. is not submitted correctly</li>
            </ul>
            <div className='mx-10 mt-10'>
                <p className='text-xl font-bold bg-yellow-500 text-black p-4'>Sample UTR NO. Of Different Payment Methods</p>
                <img src="paytm_ref.png" alt="paytm" width={400} height={400} />
                <img src="phonepe_ref.png" alt="phonepe" width={400} height={400} />
                <img src="gpay_ref.png" alt="gpay" width={400} height={400} />
            </div>
        </div>
    );
};

export default PaymentPage;

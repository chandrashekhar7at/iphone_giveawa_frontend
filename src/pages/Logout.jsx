import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { infoid, setAlertStatus, userid, validUSer } from '../redux/features/AuthSlices';

const Logout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initialize with null for loading state

  const data = useSelector((state) => state.authuser)
  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axios.post('/api/logout', null, {
          withCredentials: true
        });
        dispatch(validUSer(false))
        dispatch(userid(null))
        dispatch(infoid(null))
        dispatch(setAlertStatus(false))
        setIsAuthenticated(result.data.status); // Redirect if logout is successful
      } catch (error) {
        setIsAuthenticated(false); // Consider the user not authenticated if there's an error
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Loading state
  }

  return isAuthenticated ? <Navigate to="/signin" /> : <Navigate to="/profile" />;
};

export default Logout;

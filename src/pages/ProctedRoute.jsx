import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axios.get('https://iphonegiveaway-sjph.onrender.com/api/checkUserAuth',{
          withCredentials:true
        });
        console.log(result)
        if(result.data.status){
          setIsAuthenticated(result.data.status)
          return
        }
        setIsAuthenticated(result.data.status); // Assuming `result.data.status` is a boolean
      } catch (error) {
        setIsAuthenticated(result.data.status);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optional: Loading state
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;

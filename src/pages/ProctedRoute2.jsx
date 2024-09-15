import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom';
import './Spinner.css'; // Import the CSS for the spinner
import { BaseUrl } from './Urls';

const ProtectedRoute2 = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axios.get(`${BaseUrl}/api/checkUserAuth`, {
          withCredentials: true
        });
        if (result.data.status) {
          setIsAuthenticated(result.data.status);
          return;
        }
        setIsAuthenticated(result.data.status);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    ); // Loading spinner
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default ProtectedRoute2;

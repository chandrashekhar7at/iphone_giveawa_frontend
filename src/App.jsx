import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import './App.css';
import Dashboard from './pages/Dashboard';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './pages/ProctedRoute';
import ProtectedRoute2 from './pages/ProctedRoute2';
import Profile from './pages/Profile';
import PaymentSuccess from './pages/PaymentSuccess';
import VerifyPayment from './pages/VerifyPayment';
import UserBoxes from './pages/UserBoxes';

const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<ProtectedRoute2/>}>
            <Route index element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
          <Route path='' element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/userboxes' element={<UserBoxes />} />
            <Route path='/paymentsuccess' element={<PaymentSuccess />} />
            <Route path='/verifypayment' element={<VerifyPayment />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

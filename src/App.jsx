import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import './App.css';
import Dashboard from './pages/Dashboard';
import UserBoxes1 from './pages/UserBoxes1';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './pages/ProctedRoute';
import ProtectedRoute2 from './pages/ProctedRoute2';
import Profile from './pages/Profile';
import UserBoxes2 from './pages/UserBoxes2';
import UserBoxes3 from './pages/UserBoxes3';
import UserBoxes4 from './pages/UserBoxes4';
import UserBoxes5 from './pages/UserBoxes5';
import ProtectedRoutePayment from './pages/ProtectedRoutePayment';
import UserBoxes7 from './pages/UserBoxes7';
import UserBoxes8 from './pages/UserBoxes8';
import UserBoxes9 from './pages/UserBoxes9';
import UserBoxes10 from './pages/UserBoxes10';
import UserBoxes66 from './pages/UserBoxes66';

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
            <Route path='/userboxes1' element={<UserBoxes1 />} />
            <Route path='/userboxes2' element={<UserBoxes2 />} />
            <Route path='/userboxes3' element={<UserBoxes3 />} />
            <Route path='/userboxes4' element={<UserBoxes4 />} />
            <Route path='/userboxes5' element={<UserBoxes5 />} />
            <Route path='/userboxes66' element={<UserBoxes66 />} />
            <Route path='/userboxes7' element={<UserBoxes7 />} />
            <Route path='/userboxes8' element={<UserBoxes8 />} />
            <Route path='/userboxes9' element={<UserBoxes9 />} />
            <Route path='/userboxes10' element={<UserBoxes10 />} />
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

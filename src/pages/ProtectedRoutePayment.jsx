import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoutePayment = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from') || '/dashboard';
    if(from == '/userboxes1' || from == '/userboxes2' || from == '/userboxes3' || from == '/userboxes4' || from == '/userboxes5' || from == '/userboxes6' || from == '/userboxes7' || from == '/userboxes8' || from == '/userboxes9' || from == '/userboxes10'){
        return (
          <Outlet/>
        )
    }
    return <Navigate to="/signin" />
}

export default ProtectedRoutePayment
// import React from 'react'
import NavBar from '../../../components/NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider';
// import AdminNav from '../../../components/AdminNav';
// import { useEffect } from 'react';
// import AxiosClient from '../../../axios/axios-client';


const Layout = () => {

    const {token} = useStateContext();

    // useEffect(()=>{
    //     AxiosClient.get('/user')
    //     .then(({data})=>{
    //         setUser(data)
    //     })
    // }, []);

  return (
    <div>
      {/* TOGGLE ADMIN AND GUEST NAV BASED ON TOKEN */}
      {!token ? <NavBar /> : <Navigate to='/dashboard' />}
      {/* {!token ? <NavBar /> : <AdminNav />} */}
      <Outlet />
    </div>
  )
}

export default Layout

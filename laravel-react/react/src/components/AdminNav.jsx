// import React from 'react'

import { Link, Navigate } from 'react-router-dom';
import './NavBar.css';
import AxiosClient from '../axios/axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import { useState } from 'react';
// import { useStateContext } from '../contexts/ContextProvider';

const AdminNav = (props) => {

    const {token, setUser, setToken} = useStateContext();
    const [loggingOut, setLoggingOut] = useState(false);

    function logOut(e){
        e.preventDefault();

        setLoggingOut(true);

        AxiosClient.post('/logout')
        .then(()=>{
            setUser({});
            setToken(null);
            setLoggingOut(false);
        })
    }

    if(!token){
        return <Navigate to='/login' />
    }

    // console.log(props.searchInput);

  return (
    <section className="ftco-section">

        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">

        <div className="container">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="fa fa-bars"></span> Menu
            </button>

            <form action="" className="searchform order-lg-last">
                <div className="form-group d-flex">
                    <input type="text" name='searchInput' value={props.searchInput} onChange={(e)=> props.setSearchInput(e.target.value)} className="form-control pl-3" placeholder="Search" />
                    <button type="submit" placeholder="" className="form-control search"><span className="fa fa-search"></span></button>
                </div>
            </form>

            <div className="collapse navbar-collapse" id="ftco-nav">

                {/* LINKS FOR GUEST & AUTHENTICATED USER -- START */}
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link" to='/dashboard'>Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/users/new'>New User</Link></li>
                    <li className="nav-item"><Link onClick={logOut} className="nav-link" to=''>{loggingOut ? 'Logging Out...' : 'Logout'}</Link></li>
                </ul>
                {/* LINKS FOR GUEST & AUTHENTICATED USER -- END */}

            </div>
        </div>
        </nav>

    </section>
  )
}

export default AdminNav

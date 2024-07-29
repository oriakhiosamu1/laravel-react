// import React from 'react'

import { Link } from 'react-router-dom';
import './NavBar.css';
// import { useStateContext } from '../contexts/ContextProvider';

const NavBar = () => {

    // testing useStateContext custom hook made
    // const {user, token} = useStateContext();
    // const {token} = useStateContext();



  return (
    <section className="ftco-section">

        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">

        <div className="container">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="fa fa-bars"></span> Menu
            </button>

            <form action="#" className="searchform order-lg-last">
                <div className="form-group d-flex">
                    <input type="text" className="form-control pl-3" placeholder="Search" />
                    <button type="submit" placeholder="" className="form-control search"><span className="fa fa-search"></span></button>
                </div>
            </form>

            <div className="collapse navbar-collapse" id="ftco-nav">

                {/* LINKS FOR GUEST & AUTHENTICATED USER -- START */}
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
                    {/* {token && <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>} */}

                    <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/register'>Register</Link></li>
                </ul>
                {/* LINKS FOR GUEST & AUTHENTICATED USER -- END */}

            </div>
        </div>
        </nav>

    </section>
  )
}

export default NavBar

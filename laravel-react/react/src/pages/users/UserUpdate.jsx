// import React from 'react'
// import { useParams } from 'react-router-dom'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminNav from '../../components/AdminNav'
import '../sign-up/SignUp.css'
import { useEffect, useState } from 'react';
import AxiosClient from '../../axios/axios-client';
// import { useEffect, useState } from 'react';
// import AxiosClient from '../../axios/axios-client';

const UserUpdate = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState(null);

    // FETCHES USER BY ID
    useEffect(()=>{
        setIsLoading(true)
        AxiosClient.get(`/users/${id}`, user)
        .then(({data})=>{
            setIsLoading(false);
            setUser(data.data)
            console.log(data)
            // SHOW NOTIFICATION
        })
        .catch(()=>{
            setIsLoading(false);
        })
    }, [])

    // FUNCTION HANDLES INPUT CHANGE
    function handleChange(e){
        const {name, value} = e.target;
        setUser((prev)=>{
            return {...prev, [name]:value}
        })
    }

    // HANDLES SUBMIT
    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);

        AxiosClient.put(`/users/${id}`, user)
        .then(({data})=>{
            // SHOW NOTIFICATIONS
            setUser(data)
            setIsLoading(false);
            // navigate('/users');
            navigate('/dashboard')
        })
        .catch((error)=>{
            console.log(error)
            setIsLoading(false)

            const response = error.response;
            if(response.status === 422){
                console.log(response.data.errors)
                setErrors(response.data.errors)
            }
        })
    }

  return (
    <div>

        <AdminNav />

        <div className="wrapper">
        <h2>{isLoading ? 'Loading...' : `${user.name}`}</h2>
        {/* <h2>Edit {user.name}</h2> */}
        <form onSubmit={handleSubmit}>

        {/* USERNAME FIELD */}
        <div className="input-box">
            <input name='name' value={user.name} onChange={handleChange} type="text" placeholder="Enter your name"  />
        </div>

        {/* EMAIL FIELD */}
        <div className="input-box">
            <input name='email' value={user.email} onChange={handleChange} type="email" placeholder="Enter your email"  />
        </div>

        {/* PASSWORD FIELD */}
        <div className="input-box">
            <input name='password' value={user.password} onChange={handleChange} type="password" placeholder="Create password" />
        </div>

        {/* PASSWORD CONFIRMATION FIELD */}
        <div className="input-box">
            <input name='password_confirmation' value={user.password_confirmation} onChange={handleChange} type="password" placeholder="Confirm password" />
        </div>

        {/* MESSAGE DIV */}
        {errors && <ul>
            {Object.keys(errors).map((key)=>{
                return <li style={{ listStyleType:'none', color:'red' }} key={key}> {errors[key][0]} </li>
            })}
            </ul>
        }

        {/* SUBMIT BUTTON */}
        <div className="input-box button">
            <input  type="Submit" value={isLoading ? 'Loading...' : 'Edit User'} />
        </div>

        </form>
        </div>

    </div>
  )
}

export default UserUpdate


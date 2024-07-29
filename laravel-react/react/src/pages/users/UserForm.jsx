// import React from 'react'
import { useState } from 'react'
import AdminNav from '../../components/AdminNav'
import '../sign-up/SignUp.css'
import AxiosClient from '../../axios/axios-client'
import { useNavigate } from 'react-router-dom'


const UserForm = () => {

    // NEW USER VARIABLE
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    function handleChange(e){
        const {name, value} = e.target;
        setUser((prev)=>{
            return {...prev, [name]:value}
        })
    }

    function handleSubmit(e){
        e.preventDefault();

        setIsLoading(true)
        console.log(user);

        AxiosClient.post(`/users`, user)
        .then(({data})=>{
            setIsLoading(false);
            setUser(data)
            navigate('/users');
            // SHOW NOTIFICATION
        })
        .catch((error)=>{
            setIsLoading(false);
            console.log(error)

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
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>

        {/* USERNAME FIELD */}
        <div className="input-box">
            <input onChange={handleChange} name='name' value={user.name} type="text" placeholder="Enter your name"  />
        </div>

        {/* EMAIL FIELD */}
        <div className="input-box">
            <input onChange={handleChange} name='email' value={user.email} type="email" placeholder="Enter your email"  />
        </div>

        {/* PASSWORD FIELD */}
        <div className="input-box">
            <input onChange={handleChange} name='password' value={user.password} type="password" placeholder="Create password" />
        </div>

        {/* PASSWORD CONFIRMATION FIELD */}
        <div className="input-box">
            <input onChange={handleChange} name='password_confirmation' value={user.password_confirmation} type="password" placeholder="Confirm password" />
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
            <input type="Submit" value={isLoading ? 'Creating User...' : 'Create User'} />
        </div>

        {/* LOGIN ROUTE */}
        {/* <div className="text">
            <h3>Already have an account? <Link to="/login">Login now</Link></h3>
        </div> */}
        </form>
        </div>

    </div>
  )
}

export default UserForm

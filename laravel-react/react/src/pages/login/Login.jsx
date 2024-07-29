// import React from 'react'
import { Link } from 'react-router-dom';
import '../sign-up/SignUp.css';
import { useRef, useState } from 'react';
import AxiosClient from '../../axios/axios-client';
import { useStateContext } from '../../contexts/ContextProvider';

const SignUp = () => {
    // VARIABLES FOR LOGIN
    const emailRef = useRef();
    const passwordRef = useRef();

    // ERRORS
    const [errors,setErrors] = useState(false);

    // LOADING INDICATOR
    const [isLoading, setIsLoading] = useState(false);

    // IMPORTING STATECONTEXT
    const {setUser, setToken} = useStateContext();

    // HANDLES FORM SUBMISSION
    function onSubmitHandler(e){
        e.preventDefault();

        setIsLoading(true);

        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        AxiosClient.post('/login', payLoad)
                    .then(({data})=>{
                        setUser(data.user);
                        setToken(data.token);
                        setIsLoading(false);
                    })
                    .catch((err)=>{
                        const response = err.response;
                        if(response && response.status === 422){
                            if(response.data.errors){
                                console.log(response.data.errors);
                                setErrors(response.data.errors);
                                setIsLoading(false);
                            }else{
                                setErrors({
                                    email: [response.data.message]
                                });
                                setIsLoading(false);
                            }
                        }
                    })
    }

  return (
    <div className="wrapper">
    <h2>Login</h2>
    <form onSubmit={onSubmitHandler}>

        {/* EMAIL */}
      <div className="input-box">
        <input ref={emailRef} type="email" placeholder="Enter your email" />
      </div>

        {/* PASSWORD */}
      <div className="input-box">
        <input ref={passwordRef} type="password" placeholder="Create password" />
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
        <input type="Submit" value={isLoading ?'Loading...' : 'Login'}/>
      </div>

        {/* LINK TO REGISTER */}
      <div className="text">
        <h3>Do not have an account? <Link to="/register">Create An Account</Link></h3>
      </div>
    </form>
  </div>
  )
}

export default SignUp

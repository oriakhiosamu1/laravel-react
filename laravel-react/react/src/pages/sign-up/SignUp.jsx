// import React from 'react'
import { Link } from 'react-router-dom';
import './SignUp.css';
import { useRef, useState } from 'react';
import AxiosClient from '../../axios/axios-client';
import { useStateContext } from '../../contexts/ContextProvider';


const SignUp = () => {

    // FORM FIELDS VARIABLE
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

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
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        AxiosClient.post('/signup', payLoad)
                    .then(({data})=>{
                        setUser(data.user);
                        setToken(data.token);
                        setIsLoading(false);
                    })
                    .catch((err)=>{
                        const response = err.response;
                        if(response && response.status === 422){
                            console.log(response.data.errors);

                            setErrors(response.data.errors);
                            setIsLoading(false);
                        }
                    })
    }

  return (
    <div className="wrapper">
    <h2>Registration</h2>
    <form onSubmit={onSubmitHandler}>

        {/* USERNAME FIELD */}
      <div className="input-box">
        <input ref={nameRef} type="text" placeholder="Enter your name"  />
      </div>

      {/* EMAIL FIELD */}
      <div className="input-box">
        <input ref={emailRef} type="email" placeholder="Enter your email"  />
      </div>

      {/* PASSWORD FIELD */}
      <div className="input-box">
        <input ref={passwordRef} type="password" placeholder="Create password" />
      </div>

      {/* PASSWORD CONFIRMATION FIELD */}
      <div className="input-box">
        <input ref={passwordConfirmationRef} type="password" placeholder="Confirm password" />
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
        <input type="Submit" value={isLoading ? 'Loading...' : 'Register Now'}/>
      </div>

      {/* LOGIN ROUTE */}
      <div className="text">
        <h3>Already have an account? <Link to="/login">Login now</Link></h3>
      </div>
    </form>
  </div>
  )
}

export default SignUp

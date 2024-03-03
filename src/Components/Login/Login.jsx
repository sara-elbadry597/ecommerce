import React, { useContext } from 'react'
import {styles } from "./Login.module.css";
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { TokenContext } from '../../Context/Token';
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate= useNavigate();
  let{setToken}=useContext(TokenContext);
  async function getData(reqBody) {
    try {
      setLoading(true);
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", reqBody);
      
      console.log(data);
  
      if (data.message === "success") {
      setLoading(false)
      localStorage.setItem("userToken",data.token);
      setToken(data.token);
        navigate('/Home');
      } else {
        seterrorMsg("incorrect email or password.");
      }
    } catch (error) {
      setLoading(false);
      if (error.data.message) {
        seterrorMsg(error.data.message);
      } else {
        seterrorMsg("An error occurred during login.");
      }
    }
  }
  const [errorMsg,seterrorMsg] = useState("");
  const[loading,setLoading] = useState(false);
  function validation(values){
    const errors={};
    if(!values.email){
      errors.email="Required";
    }else if(!((/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/).test(values.email))){
      errors.email="invalid email";
    }

    if (!values.password) {
      errors.password="Required";
    }else if(!/^[A-Z][a-z0-9]{3,5}/.test(values.password)){
      errors.password="invalid password";
    }
    return errors;
  }
  const loginForm =useFormik({
   initialValues:{
    email:"",
    password:"",
   },
   
   validate:validation,
   onSubmit: (values)=>{
    getData(values)
   }
   
  })
  return (<><Helmet>
    <meta charSet="utf-8" content="Categories" />
    <title>Login</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
    <div className="container my-5">
      <h2>Login Now: </h2>
      {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:null}
      <form  onSubmit={loginForm.handleSubmit}>
        
        <div className="form-group ">
          <label htmlFor="email" className='mb-2'>Email
          </label>
          <input type="email" name='email' id='email'  className='form-control mb-2' value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}/>
          {loginForm.errors.email&&loginForm.touched.email ? <div className='alert alert-danger'>{loginForm.errors.email}</div>:null}
        </div>
        <div className="form-group ">
          <label htmlFor="password" className='mb-2'>Password
          </label>
          <input type="password" name='password' id='password'  className='form-control mb-2' value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}/>
          {loginForm.errors.password&&loginForm.touched.password ? <div className='alert alert-danger'>{loginForm.errors.password}</div>:null}
        </div>
        <div className="d-flex justify-content-between">
        <Link to={'/forgetPass'} className='fw-bold text-main'>forget your password ?</Link>
        <button type='submit' className='btn bg-main text-white d-block ms-auto' disabled={!(loginForm.isValid&&loginForm.dirty)}>
        {loading?<i className="fa fa-spin fa-spinner me-2"> </i>:null}Login
         </button>
        </div>
       
      </form>
    </div></>
  )
}

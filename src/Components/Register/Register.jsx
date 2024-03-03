import React from 'react'
import {styles } from "./Register.module.css";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { Helmet } from "react-helmet";
export default function Register() {
  const navigate= useNavigate();
  async function getData(reqBody) {
    try {
      setLoading(true);
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", reqBody);
      console.log(response.data);
  
      if (response.data.message === "success") {
      setLoading(false)
        navigate('/Login');
      } else {
        seterrorMsg("Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        seterrorMsg(error.response.data.message);
      } else {
        seterrorMsg("An error occurred during registration.");
      }
    }
  }
  const [errorMsg,seterrorMsg] = useState("");
  const[loading,setLoading] = useState(false);
  function validation(values){
    const errors={};
    if (!values.name) {
      errors.name="Required";
    }else if(values.name.length<3){
      errors.name="name is too short";
    }
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
    if (!values.rePassword) {
      errors.rePassword="Required";
    }else if(values.rePassword!== values.password){
      errors.rePassword="password and repassword aren't matched";
    }
    if (!values.phone) {
      errors.phone="Required";
    }else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
      errors.phone="invalid phone number";
    }


    return errors;
  }
  const registerForm =useFormik({
   initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
   },
   
   validate:validation,
   onSubmit: (values)=>{
    getData(values)
   }
   
  })
  return (
    <>
    <Helmet>
  <meta charSet="utf-8" content="Categories" />
  <title>Register</title>
  <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
    <div className="container my-5">
      <h2>Register Now: </h2>
      {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:null}
      <form  onSubmit={registerForm.handleSubmit}>
        <div className="form-group ">
          <label htmlFor="name" className='mb-2'>Name
          </label>
          <input type="text" name='name' id='name' value={registerForm.values.name} className='form-control mb-2' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.name&&registerForm.touched.name ? <div className='alert alert-danger'>{registerForm.errors.name}</div>:null}
        </div>
        <div className="form-group ">
          <label htmlFor="email" className='mb-2'>Email
          </label>
          <input type="email" name='email' id='email'  className='form-control mb-2' value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.email&&registerForm.touched.email ? <div className='alert alert-danger'>{registerForm.errors.email}</div>:null}
        </div>
        <div className="form-group ">
          <label htmlFor="password" className='mb-2'>Password
          </label>
          <input type="password" name='password' id='password'  className='form-control mb-2' value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.password&&registerForm.touched.password ? <div className='alert alert-danger'>{registerForm.errors.password}</div>:null}
        </div>
        <div className="form-group ">
          <label htmlFor="rePassword" className='mb-2'>RePassword
          </label>
          <input type="password" name='rePassword' id='rePassword'  className='form-control mb-2' value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className='alert alert-danger'>{registerForm.errors.rePassword}</div>:null}
        </div>
        <div className="form-group mb-2 ">
          <label htmlFor="phone" className='mb-2'>Phone
          </label>
          <input type="tel" name='phone' id='phone'  className='form-control mb-2' value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}/>
          {registerForm.errors.phone&&registerForm.touched.phone ? <div className='alert alert-danger'>{registerForm.errors.phone}</div>:null}
        </div>
        <button type='submit' className='btn bg-main text-white d-block ms-auto' disabled={!(registerForm.isValid&&registerForm.dirty)}>
        {loading?<i className="fa fa-spin fa-spinner me-2"> Register</i>:null}
         </button>
      </form>
    </div></>
  )
}

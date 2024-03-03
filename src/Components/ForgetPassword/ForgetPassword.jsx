import React, { useEffect, useState } from 'react'
import {styles } from "./ForgetPassword.module.css";
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [emails,setemails] = useState([]);
  const [errorMsg,seterrorMsg] = useState("");
  const[loading,setLoading] = useState(false);
  let navigate= useNavigate();
let forgetPass= useFormik({
  initialValues:{
    email:"",
  }, 
  onSubmit: getPass,
  validate

})


async function getPass(values) {
 
    setLoading(true);
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
      console.log("Response:", data);
      if (data.statusMsg === "success") {
        toast.success(data.message);
        navigate("/ResetCode");
      }
    } catch (error) {
      seterrorMsg(error?.response?.data?.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  
}
  
  function validate(values){
    let errors={};
    if(!values.email){
      errors.email="Required";
    }else if(!((/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/).test(values.email))){
      errors.email="invalid email";
    }
    return errors
  }
  return (
    
   <>
   <div className="container my-5">
       <h2 className='fw-bolder my-3'>please enter your verification code</h2>
       <form onSubmit={forgetPass.handleSubmit}>
       <div className="form-group ">
          <input placeholder='Email' type="email" name='email' id='email'  className='form-control mb-2' onChange={forgetPass.handleChange} onBlur={forgetPass.handleBlur} />
          {forgetPass.errors.email&&forgetPass.touched.email ? <div className='alert alert-danger'>{forgetPass.errors.email}</div>:null}
        </div>
        <button type='submit' className='btn bg-main text-white'disabled={!(forgetPass.isValid&&forgetPass.dirty)}>verify</button>
       </form>
       
   </div>
  
   
   </>
  )
}

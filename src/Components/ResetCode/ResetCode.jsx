import React, { useState } from 'react'
import {styles } from "./ResetCode.module.css";
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
export default function ResetCode() {
  const navigate= useNavigate();
  const [errorMsg,seterrorMsg] = useState("");
  const[loading,setLoading] = useState(false);
  let validationSchema = Yup.object({
    resetCode: Yup.string().required("code is required "),
  });
  let verification= useFormik({
    initialValues:{
      resetCode: "",
    }, 
   validationSchema,
    onSubmit:verifyCode
  
  })
  async function verifyCode(values){
    setLoading(false);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(data);
      if (data.status == "Success") {
        toast.success(data.status);
        navigate("/ResetPass");
      }
    } catch (error) {
      console.error("API Error:", error.data);
      console.error("API Error message:", error.response.data.message);
      seterrorMsg(error.response.data.message);
      setLoading(true);
    }
  }
  return (
    <>
    
    <div className="container my-5">
        <h2 className='fw-bolder my-3'>reset your account password</h2>
        <form onSubmit={verification.handleSubmit} >
        <div className="form-group ">
        <input 
  placeholder='code' 
  type="text" 
  name='resetCode' 
  id='resetCode' 
  className='form-control mb-2' 
  onChange={verification.handleChange} 
  onBlur={verification.handleBlur}  
/>

           {verification.errors.resetCode && verification.touched.resetCode ? (
            <div className="alert my-2 py-2 alert-danger">
              {verification.errors.resetCode}
            </div>
          ) : (
            ""
          )}
          {errorMsg? <div className="alert  py-2 alert-danger">
              {errorMsg}
            </div>:null}
         </div>
         {loading?<i className="fa fa-spinner fa-spin"> </i>:null}
         <button type='submit' className='btn bg-main text-white' disabled={!((verification.isValid && verification.dirty))}>verify</button>
         
        </form>
        
    </div>
   
    
    </>
  )
}

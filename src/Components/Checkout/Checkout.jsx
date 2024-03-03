import React, { useContext, useState } from 'react'
import {styles } from "./Checkout.module.css";
import { useFormik } from 'formik';
import { cartContext } from '../../Context/Cart';
import { Helmet } from "react-helmet";
export default function Checkout() {

  const [errorMsg,seterrorMsg] = useState("");
  const[loading,setLoading] = useState(false);
  let{onlinePayment}=useContext(cartContext)
  async function payment(values){
    let{data}=await onlinePayment(values);
   window.location.href= data.session.url;
  }

  const formik= useFormik({
    initialValues:{
      
        details: "",
        phone: "",
        city: ""
        
    },
    onSubmit:payment,
    validate:validation,
  })

  function validation(values){
    const errors={};
    if (!values.details) {
      errors.name="Required";
    }else if(values.details.length<3){
      errors.details="details is too short";
    }
    if (!values.phone) {
      errors.phone="Required";
    }else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
      errors.phone="invalid phone number";
    }
    if (!values.city) {
      errors.city="Required";
    }else if(!/^[A-Za-z\s-]+$/.test(values.city)){
      errors.city="invalid city";
    }

    return errors
  }
  return (
    <><Helmet>
    <meta charSet="utf-8" content="Categories" />
    <title>CheckOut</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
    <div className="container bg-main-light p-5 my-5">
      <h2>Shipping Address :</h2>
      <form  onSubmit={formik.handleSubmit}>
        
        <div className="form-group ">
          <label htmlFor="details" className='mb-2'>Details
          </label>
          <input type="text" name='details' id='details'  className='form-control mb-2' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.details&&formik.touched.details ? <div className='alert alert-danger'>{formik.errors.details}</div>:null}
        </div>
        <div className="form-group ">
          <label htmlFor="phone" className='mb-2'>phone
          </label>
          <input type="tel" name='phone' id='phone'  className='form-control mb-2' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.phone&&formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>:null}
        </div>
        <div className="form-group ">
          <label htmlFor="city" className='mb-2'>City
          </label>
          <input type="text" name='city' id='city'  className='form-control mb-2' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.city&&formik.touched.city? <div className='alert alert-danger'>{formik.errors.city}</div>:null}
        </div>
        <button type='submit' className='btn bg-main text-white d-block ms-auto' disabled={!(formik.isValid&&formik.dirty)}>
        {loading?<i className="fa fa-spin fa-spinner me-2"> </i>:null}Pay Now
         </button>
      </form>
    </div></>
  )
}

import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function ResetPass() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  


  const resetPass = useFormik({
    initialValues: {
      email: "",
      newPassword: "", 
    },
    validate: validation,
    onSubmit: changePass
  });

  async function changePass(values) {
    setLoading(true);
    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(data);
      if (data.status === "Success") {
        toast.success(data.status);
       localStorage.removeItem("userToken");
       localStorage.setItem("userToken", data.token);
       navigate("/Home");
      }
    } catch (error) {
      console.error("API Error:", error.data);
      console.error("API Error message:", error.response.data.message);
      setErrorMsg(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  function validation(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = "Invalid email";
    }

    if (!values.newPassword) {
      errors.newPassword = "Required";
    } else if (!/^[A-Z][a-z0-9]{3,5}/.test(values.newPassword)) {
      errors.newPassword = "Invalid newPassword";
    }

    return errors; 
  }

  return (
    <div className="container my-5">
      <h2>Reset your account password</h2>
      {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : null}
      <form onSubmit={resetPass.handleSubmit}>

        <div className="form-group ">
          <label htmlFor="email" className='mb-2'>Email</label>
          <input type="email" name='email' id='email' className='form-control mb-2' value={resetPass.values.email} onChange={resetPass.handleChange} onBlur={resetPass.handleBlur} />
          {resetPass.errors.email && resetPass.touched.email ? <div className='alert alert-danger'>{resetPass.errors.email}</div> : null}
        </div>
        
        <div className="form-group ">
          <label htmlFor="newPassword" className='mb-2'>New Password</label> 
          <input type="password" name='newPassword' id='newPassword' className='form-control mb-2' value={resetPass.values.newPassword} onChange={resetPass.handleChange} onBlur={resetPass.handleBlur} /> 
          {resetPass.errors.newPassword && resetPass.touched.newPassword ? <div className='alert alert-danger'>{resetPass.errors.newPassword}</div> : null} 
        </div>
        
        <button type='submit' className='btn bg-main text-white d-block ms-auto' disabled={!(resetPass.isValid && resetPass.dirty)}>
          {loading ? <i className="fa fa-spin fa-spinner me-2"></i> : "Reset Password"} 
        </button>
      </form>
    </div>
  );
}

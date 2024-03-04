import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
export default function Orders() {
  const token = localStorage.getItem("userToken");
  const decodedToken = jwtDecode(token).id;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  async function GetOrders(id) {
    try {
      setLoading(true);
      let Response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      console.log("Response:", Response);
      if (Response.status==200) {
        setOrders(Response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch orders.");
    }
   
  }
  
  useEffect(() => {
    if (decodedToken) {
      GetOrders(decodedToken);
    }
  }, [decodedToken]);
  
  return (
    <>
    <Helmet>
    <meta charSet="utf-8" content="Categories" />
    <title>Orders</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
      {loading ? <Loader /> :
        <div className="container bg-main-light my-5 p-5 ">
          <h2 className='text-main text-center fw-bolder mb-4'>Your Order</h2>
          {orders &&orders.length > 0 ? (
            orders.map((ele, index) => (
              <div className="row " key={index}>
                
                  <div className="item d-flex justify-content-center align-items-center shadow-sm bg-white p-4 ">
                  <div className="col-md-6">
                      <img src={ ele.cartItems[0].product.imageCover } className='w-100' alt="" />
                  </div>
                  <div className="col-md-6">
                  <h2>{ ele.cartItems.title}</h2>
                      <p><span className='text-main fw-bold'>Brand:</span>{ ele.cartItems[0].product.brand.name }</p>
                      <p><span className='text-main fw-bold'>Category:</span>{ ele.cartItems[0].product.category.name }</p>
                      <p><span className='text-main fw-bold'>Price:</span>{ ele.cartItems[0].price }</p>
                      <p><span className='text-main fw-bold'>Quantity:</span>{ ele.cartItems[0].count }</p>
                    
                  </div>
                    
                     
                  
                </div>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
          <Link to={"/Home"} className='btn bg-main text-white d-block mx-auto my-4'>Back To Home</Link>
        </div>
      }
    </>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { Helmet } from "react-helmet";
export default function Orders() {
  const token = localStorage.getItem("userToken");
  const decodedToken = jwtDecode(token).id;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  async function GetOrders(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      console.log("Response:", data);
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch orders.");
      setLoading(false);
    }
  }

  async function callApi(token) {
    try {
      await GetOrders(token);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }

  useEffect(() => {
    callApi(decodedToken);
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
          {orders.length > 0 ? (
            orders.map((ele, index) => (
              <div className="row g-4" key={index}>
                <div className="col-6">
                  <div className="item d-flex justify-content-center align-items-center shadow-sm bg-white p-4 ">
                    <div className="image">
                      <img src={ele.cartItems?.length > 0 ? ele.cartItems[0].product.imageCover : ''} alt="" />
                    </div>
                    <div className="details">
                      <h2>{ele.cartItems?.length > 0 ? ele.cartItems[0].title : ''}</h2>
                      <p><span className='text-main fw-bold'>Brand:</span>{ele.cartItems?.length > 0 ? ele.cartItems[0].product.brand.name : ''}</p>
                      <p><span className='text-main fw-bold'>Category:</span>{ele.cartItems?.length > 0 ? ele.cartItems[0].product.category.name : ''}</p>
                      <p><span className='text-main fw-bold'>Price:</span>{ele.cartItems?.length > 0 ? ele.cartItems[0].price : ''}</p>
                      <p><span className='text-main fw-bold'>Quantity:</span>{ele.cartItems?.length > 0 ? ele.cartItems[0].count : ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      }
    </>
  );
}

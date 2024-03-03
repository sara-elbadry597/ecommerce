import React, { useContext, useEffect, useState } from 'react'
import {styles } from "./Cart.module.css";
import { cartContext } from '../../Context/Cart';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Cart() {
  const[cartDetails,setCartDetails]=useState({});
  let {getUserCart,deleteItem,updateItemQuantity,setCartId,setnumOfItems,clearCart}=useContext(cartContext);
  async function getCartDetails(){
    let {data}= await getUserCart();
    setnumOfItems(data.numOfCartItems);
    setCartId(data?.data._id);
    console.log(data);
    setCartDetails(data);
  }
  async function removeItem(id){
    let {data}= await deleteItem(id);
    setnumOfItems(data.numOfCartItems);
    setCartDetails(data);
  }
  async function removeAll(){
    let {data}= await clearCart();
    setnumOfItems(data.numOfCartItems);
    setCartDetails(data);
  }
  async function updateQuantity(id,count){
    let {data}= await updateItemQuantity(id,count);
    setCartDetails(data);
  }
  useEffect(()=>{getCartDetails()},[]);
  return (
    <>
     <Helmet>
          <meta charSet="utf-8" content="Cart" />
          <title>Cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    <div className="container bg-main-light my-5 p-5">
      <div className="title d-flex justify-content-between align-items-center">
      <h2>Shop Cart</h2>
      <button  className='btn bg-main text-white' onClick={()=>{removeAll()}}>Clear Cart</button>
      </div>
      <p className='text-main'>Total Cart price: {cartDetails.data?.totalCartPrice} EGP </p>
        
      {cartDetails.data?.products.length ? (
  cartDetails.data.products.map((ele) => (
    <div className="row border-bottom my-2" key={ele.product._id}>
      <div className="col-md-1">
        <img src={ele.product.imageCover} className='w-100' alt={ele.product.title} />
      </div>
      <div className="col-md-11">
        <div className="d-flex justify-content-between align-items-center">
          <div className="left">
            <h4>{ele.product.title}</h4>
            <p className='text-main'>Price: {ele.price} EGP</p>
            <p><i className="fa-solid fa-trash text-main" onClick={() => removeItem(ele.product._id)}></i> Remove</p>
          </div>
          <div className="right">
            <button className='btn btn-info' onClick={() => updateQuantity(ele.product._id, ele.count - 1)} disabled={ele.count === 1}>-</button>
            <span className='mx-2'>{ele.count}</span>
            <button className='btn btn-info' onClick={() => updateQuantity(ele.product._id, ele.count + 1)}>+</button>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <h3 className='my-2 text-center text-main'>Your cart is empty</h3>
)}
<Link to={`/Checkout`} className='btn bg-main text-white w-100 my-3'>CheckOut</Link>
    </div>
    </>);
  
}

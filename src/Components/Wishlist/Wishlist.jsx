import React, { useContext, useState } from 'react'
import {styles } from "./Wishlist.module.css";
import { wishContext } from '../../Context/wishlist';
import { Helmet } from "react-helmet";
export default function Wishlist() {
  const[items,setItems]=useState({});
  let {getLoggedWishList,setnumOfWishedItems,numOfWishedItems,deleteWish}=useContext(wishContext);
  async function getWishedItems(){
   let {data}= await getLoggedWishList();
   setItems(data);
   setnumOfWishedItems(data.count);
   console.log(numOfWishedItems);
   console.log(data);
  }
  async function removeWish(id) {
    let {data}= await deleteWish(id);
    setItems(data);
   setnumOfWishedItems(data.count);
  }
  getWishedItems()
  return<><Helmet>
  <meta charSet="utf-8" content="Categories" />
  <title>Wishlist</title>
  <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
  
  <div className="container bg-main-light my-5 p-5">
  <h2>My WishList</h2>
  {items.data?.length ? (
    items.data.map((ele) => (
      <div className="row border-bottom my-2" key={ele.id}>
        <div className="col-md-1">
          <img src={ele.imageCover} className='w-100' alt={ele.title} />
        </div>
        <div className="col-md-11">
          <div className="d-flex justify-content-between align-items-center">
            <div className="left">
              <h4 className='my-2'>{ele.title}</h4>
              <p className='text-main'>Price: {ele.price}</p>
              <p ><i className=" cursor-pointer fa-solid fa-trash text-main" onClick={() => { removeWish(ele.id) }} ></i> Remove</p>
            </div>
            <div className="right">
              <button className='btn bg-main text-white' >Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <h3 className='my-2 text-center text-main'>Your wish List is empty</h3>
  )}
</div></>

}

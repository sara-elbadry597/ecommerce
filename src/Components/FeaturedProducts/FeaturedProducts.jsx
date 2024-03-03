import React, { useContext } from 'react'
import {styles } from "./FeaturedProducts.module.css";
import axios from 'axios';
import {  useQuery } from 'react-query'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/Cart';
import toast, { Toaster } from 'react-hot-toast';
import { wishContext } from '../../Context/wishlist';
export default function FeaturedProducts() {

  let {addToCart,setnumOfItems}=useContext(cartContext);
  let{addToWishList,setnumOfWishedItems}=useContext(wishContext)
function getProducts() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
let { data,isLoading}= useQuery("featuredProducts",getProducts);

const products= data?.data?.data ;
console.log(products);
async function AddCart(id){
 let {data}=  await addToCart(id);
 console.log(data);
 if(data.status == "success" ){
  setnumOfItems(data.numOfCartItems);
  toast.success("Product added successfully to your cart");

 }
}
async function AddToWishList(id){
  let {data}=await addToWishList(id);
  if(data.status == "success"){
    setnumOfWishedItems(data?.count);
    toast("Product added successfully to your Wishlist");
  }
  console.log(data);
}

  return (
    <>
    <div className="container my-5">
      <div className="row">
      
        {isLoading? <Loader/>:products.map((ele)=>{
          return<>
          
           <div key={ele.id} className="col-md-3">
          <div className="product px-2 py-3">
          <i className="fa-solid fa-heart" onClick={()=>AddToWishList(ele.id)}></i>
          <Link to={'/ProductDetails/'+ ele.id}>
            <img src={ele.imageCover} className='w-100' alt={ele.title} />
          <p className='text-main'>{ele.category.name}</p>
          <h2 className='h6'>{ele.title.split(" ").slice(0,2).join(" ")}</h2>
          <div className="rating d-flex justify-content-between">
            <p>{ele.price} EGP</p>
            <p>
              <i className="fa-solid fa-star rating-color"></i>{ele.ratingsAverage}
            </p>
          </div>
         
          </Link>
            
           
          <button className='btn bg-main text-white' onClick={()=>AddCart(ele.id)}>Add to Cart +</button>
          </div>
          
        </div>
          </>
        })}
       
      </div>
    </div>
    </>
  )
}

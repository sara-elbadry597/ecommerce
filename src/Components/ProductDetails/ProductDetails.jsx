import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Loader from '../Loader/Loader';
import { cartContext } from '../../Context/Cart';
import toast, { Toaster } from 'react-hot-toast';
import { wishContext } from '../../Context/wishlist';
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  let {addToCart,setnumOfItems}=useContext(cartContext);
  let{addToWishList,setnumOfWishedItems}=useContext(wishContext)
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  async function getDetails(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setDetails(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails(params.id);
  }, [params.id]);

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
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (<><Helmet>
    <meta charSet="utf-8" content="Categories" />
    <title>Details</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
    <div className="container my-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="row align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {details.images.map((ele, index) => (
                <img key={index} className='w-100' height={"400"} src={ele} alt="" />
              ))}
            </Slider>
          </div>
          <div className="col-md-8">
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p>{details.category && details.category.name}</p>
            <div className="rating d-flex justify-content-between">
              <p>{details.price} EGP</p>
              <p>
                <i className="fa-solid fa-star rating-color"></i>{details.ratingsAverage}
                <i className="fa-solid fa-heart mx-2 fs-3" onClick={()=>{
                  AddToWishList(details._id)
                }}></i>
              </p>
            </div>
            <button
            onClick={()=>AddCart(details.id)} className='btn bg-main text-white d-block w-100'>Add to Cart +</button>
          </div>
        </div>
      )}
    </div></>
  );
}

import React, { useEffect, useState } from 'react'
import {styles } from "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from 'axios';
export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
  };
  const [categories,setCategories]=useState([])
    async function getCategories(){
      let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      setCategories(data.data)
    }
    useEffect(()=>{
      getCategories()
    },[])
  return (
    <> 
  
    
  
    
    return <>
      <div className="container my-5">
      <h2>Shoo Pouplar Categories</h2>
      <Slider {...settings}>
  
      {
        categories.map((categorie)=><div className="cat">
        <img key={categorie.id} src={categorie.image} height={200} className='w-100 px-1' alt="" />
        <h5>{categorie.name}</h5>
        </div>)
      }
      </Slider>
      </div>
  
    </></>
  )
}

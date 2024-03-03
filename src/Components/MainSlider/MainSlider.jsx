import React from 'react'
import {styles } from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../assests/slider-image-1.jpeg"
import img2 from "../../assests/slider-image-2.jpeg"
import img3 from "../../assests/slider-image-3.jpeg"
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return (
    <Slider {...settings}>
    <div>
    <img src={img3} className='w-100' alt="img3" />
    </div>
    <div>
    <img src={img2} className='w-100' alt="img2" />
    </div>
    <div>
    <img src={img1} className='w-100' alt="img1" />
    </div>
    
  </Slider>
  )
}

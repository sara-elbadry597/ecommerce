import React from 'react'
import {styles } from "./Home.module.css";
import MainSlider from '../MainSlider/MainSlider';
import img2 from "../../assests/slider-image-2.jpeg"
import img3 from "../../assests/slider-image-3.jpeg"
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Loader from '../Loader/Loader';
import { Helmet } from "react-helmet";
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
export default function Home() {
  return (
    <><Helmet>
    <meta charSet="utf-8" content="Categories" />
    <title>Home</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
    <div className="container my-3 ">
      <div className="row gx-0">
        <div className="col-md-8">
          <MainSlider/>
        </div>
       <div className="col-md-4">
        <div>
         <img src={img2} className='w-100' alt="img2" />
        </div>
        <div>
         <img src={img3} className='w-100' alt="img3" />
        </div>
        </div>
      </div>
      <CategoriesSlider/>
      
      <FeaturedProducts/>
    </div>
    </>
  )
}

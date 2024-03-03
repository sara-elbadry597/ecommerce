import React from 'react'
import {styles } from "./NotFound.module.css";
import img1 from "../../assests/download.png";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <><Helmet>
    <meta charSet="utf-8" content="Categories" />
    <title>NotFound</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
    <div className="container">
      <img src={img1} className='w-100' alt="notFound" />
    </div>
    </>
  )
}

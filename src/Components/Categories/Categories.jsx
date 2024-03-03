import React, { useState } from 'react'
import {styles } from "./Categories.module.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Helmet } from "react-helmet";
export default function Categories() {
  const [subcategories, setSubcategories] = useState([]); 
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
  const [SelectedCatName, setSelectedCatName] = useState(""); 

  function getcategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  async function getSubCat(id){
    let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
     setSubcategories(data?.data);
     console.log(data.data);
  }
  function handleCardClick(id,name) {
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
      setSubcategories([]);
    } else {
      setSelectedCatName(name)
      setSelectedCategoryId(id);
      getSubCat(id);
    }
  }
  let{isLoading,data}=useQuery("categories",getcategories);
  let categories= data?.data.data;

  return (<><Helmet>
    <meta charSet="utf-8" content="Categories" />
    <title>Categories</title>
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>

    <div className="container my-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row g-4">
          {categories.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div className="card shadow-sm" onClick={() => handleCardClick(item._id,item.name)}>
                <img src={item.image} height={400} className="card-img-top w-100" alt="..." />
                <div className="card-body">
                  <h5 className=" text-center text-main fw-bolder ">{item.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedCategoryId && (
  <div className="row mt-4 g-4">
      <h2 className='text-center text-main fw-bold'>{SelectedCatName} subcategories</h2> 
    {subcategories.map((subcategory) => {
      return (<>  
      <div className="col-md-4" key={subcategory._id}>
       
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-center fw-bolder">{subcategory.name}</h5>
          </div>
        </div>
      </div>
      </>
       
      );
    })}
  </div>
)}

    </div></>
  );
          }  
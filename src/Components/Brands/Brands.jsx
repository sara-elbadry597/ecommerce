import React, { useState } from 'react'
import {styles } from "./Brands.module.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { Helmet } from "react-helmet";
export default function Brands() {
  const [brand, setBrand] = useState(null); 
  const [selectedBrandId, setSelectedBrandId] = useState(null); 

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { isLoading, data } = useQuery("categories", getBrands);
  let allBrands = data?.data.data;
  console.log(allBrands);

  async function getSpecBrand(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    setBrand(data?.data); 
  }

  function handleClickedBrand(id) {
    setSelectedBrandId(id);
    getSpecBrand(id); 
  }

  return (<>
   <Helmet>
        <meta charSet="utf-8" content="brands" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="container my-3">
      <h2 className='text-center text-main fw-bold'>All Brands</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row g-3 my-3">
          {allBrands.map((ele) => (
            <div className="col-md-3" key={ele._id}>
              <div className="card shadow-sm" data-bs-toggle="modal" data-bs-target="#brandModal" onClick={() => handleClickedBrand(ele._id)}>
                <img src={ele.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center fw-bolder">{ele.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedBrandId && (
        <div className="modal" id="brandModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row align-items-center">
                  <div className="col-4">
                    <h2 className='text-main'>{brand?.name}</h2>
                    <p>{brand?.slug}</p>
                  </div>
                  <div className="col-8">
                    <img src={brand?.image} alt={brand?.name} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div></>
  );
      }
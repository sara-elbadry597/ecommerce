import React, { useContext } from 'react'
import {styles } from "./NavBar.module.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assests/logo.svg";
import { TokenContext } from '../../Context/Token';
import { cartContext } from '../../Context/Cart';
import { wishContext } from '../../Context/wishlist';

export default function NavBar() {
  let navigate = useNavigate();
  let {token,setToken}=useContext(TokenContext);
  let {numOfItems}=useContext(cartContext);
  let{numOfWishedItems}=useContext(wishContext);
  function logOut(){
    localStorage.removeItem("userToken");
    setToken(null);
    navigate('/Login')
  }
  return (<>
 
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
  <Link to={"Home"} className="navbar-brand" >
    <img src={logo} className='w-100' alt="" /></Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    {token?<ul className="navbar-nav mb-2 mb-lg-0 me-auto">
        <li className="nav-item">
          <Link to={"Home"} className="nav-link active" aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={"Cart"} className="nav-link active" aria-current="page" href="#">Cart</Link>
        </li>
        <li className="nav-item">
          <Link to={"Wishlist"} className="nav-link active" aria-current="page" href="#">WishList</Link>
        </li>
        <li className="nav-item">
          <Link to={"Products"} className="nav-link active" aria-current="page" href="#">Products</Link>
        </li>
        <li className="nav-item">
          <Link to={"Categories"} className="nav-link active" aria-current="page" href="#">Categories</Link>
        </li>
        <li className="nav-item">
          <Link to={"Brands"} className="nav-link active" aria-current="page" href="#">Brands</Link>
        </li>
       
      </ul>:null}
      
      <ul className="navbar-nav ms-auto d-flex align-items-center">
  <li className="nav-item mx-1"><i className="fa-brands fa-instagram"></i></li>
  <li className="nav-item mx-1"><i className="fa-brands fa-facebook"></i></li>
  <li className="nav-item mx-1"><i className="fa-brands fa-tiktok"></i></li>
  <li className="nav-item mx-1"><i className="fa-brands fa-twitter"></i></li>
  <li className="nav-item mx-1"><i className="fa-brands fa-linkedin"></i></li>
  <li className="nav-item mx-1"><i className="fa-brands fa-youtube"></i></li>

  {token ? (
    <>
      <li className="nav-item mx-1 position-relative">
        <button onClick={logOut} className="nav-link active" aria-current="page" href="#">SignOut</button>
      </li>
      <li className="nav-item mx-1">
        <Link to={"Cart"} className="nav-link active" aria-current="page" href="#">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className='position-absolute top-0 badge bg-main text-white mt-1'>{numOfItems}</span>
        </Link>
      </li>
      <li className="nav-item mx-1">
        <Link to={"WishList"} className="nav-link active" aria-current="page" href="#">
          <i className="fa-solid fa-heart"></i>
          <span className='position-absolute top-0 badge bg-danger text-white mt-1'>{numOfWishedItems}</span>
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item mx-1">
        <Link to={"Login"} className="nav-link active" aria-current="page" href="#">Login</Link>
      </li>
      <li className="nav-item mx-1">
        <Link to={"Register"} className="nav-link active" aria-current="page" href="#">Register</Link>
      </li>
    </>
  )}
</ul>


      
    </div>
  </div>
</nav>

  </>
    
  )
}

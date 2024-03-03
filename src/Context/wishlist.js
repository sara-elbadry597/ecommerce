import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export let wishContext= createContext();
let headers={
    token:localStorage.getItem("userToken"),
}
function addToWishList(id){
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
    {productId:id},{headers}
    ).then((res)=>res).catch((err)=>err)
}
function getLoggedWishList(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
    {headers}
    ).then((res)=>res).catch((err)=>err)
}
function deleteWish(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {headers}).then((res)=>res).catch((err)=>err)
}
export default function WishContextProvider(params){
    const[numOfWishedItems,setnumOfWishedItems]=useState(null);
   async function getInitiallist(){
    let{data}= await getLoggedWishList();

    setnumOfWishedItems(data?.count);
   
  }

  useEffect(()=>{
    getInitiallist()
  },[])
    return <wishContext.Provider value={{addToWishList,getLoggedWishList,numOfWishedItems,setnumOfWishedItems,deleteWish}}>{params.children}</wishContext.Provider>
}
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext= createContext();
let headers={
    token:localStorage.getItem("userToken"),
}
 function addToCart(id){
 return  axios.post("https://ecommerce.routemisr.com/api/v1/cart",
 {productId:id}
 ,{headers}).then((res)=>res).catch((err)=>err)
}

function getUserCart(){
    return  axios.get("https://ecommerce.routemisr.com/api/v1/cart",
    {headers}).then((res)=>res).catch((err)=>err)
   }

   function deleteItem(id){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {headers}).then((res)=>res).catch((err)=>err)
   }
   function updateItemQuantity(id,count){
    return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},
    {headers}).then((res)=>res).catch((err)=>err)
   }
   function clearCart(){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers}).then((res)=>res).catch((err)=>err)
   }
  
export default function CartContextProvider(props){
  const[cartId,setCartId]=useState(null);
  const[numOfItems,setnumOfItems]=useState(null);
  function onlinePayment(shipingAddress){
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {shipingAddress}
    ,{headers}).then((res)=>res).catch((err)=>err)
   }
   async function getInitialCart(){
    let{data}= await getUserCart();
    setnumOfItems(data?.numOfCartItems);
    setCartId(data?.data?._id);
  }

    useEffect(()=>{
        getInitialCart()
    },[])
    return <cartContext.Provider value={{addToCart,getUserCart,deleteItem,updateItemQuantity,onlinePayment,setCartId,setnumOfItems,cartId,numOfItems,clearCart}}>{props.children}</cartContext.Provider>
}
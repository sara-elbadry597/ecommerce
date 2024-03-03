import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout'; // Corrected import path
import Login from './Components/Login/Login';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Register from './Components/Register/Register';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Products from './Components/Products/Products';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Orders from './Components/Orders/Orders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import WishList from './Components/Wishlist/Wishlist';
import Checkout from './Components/Checkout/Checkout';
import ResetCode from './Components/ResetCode/ResetCode';
import ResetPass from './Components/ResetPass/ResetPass';
import  { TokenContext } from './Context/Token';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from "./Components/protectedRoutes/ProtectedRoutes"
import toast, { Toaster } from 'react-hot-toast';
function App() {
  let{setToken}=useContext(TokenContext);
  let routes = createBrowserRouter([{
    path: "", element: <Layout />, children:
      [
        { path: "Login", element:<Login/>  },
        { path: "Brands", element:<ProtectedRoutes><Brands/></ProtectedRoutes>  },
        { path: "ResetCode", element:<ResetCode/> },
        { path: "ResetPass", element:<ResetPass/> },
        { path: "allorders", element:<ProtectedRoutes><Orders/></ProtectedRoutes>  },
        { path: "Cart", element: <ProtectedRoutes><Cart/></ProtectedRoutes> },
        { path: "Wishlist", element: <ProtectedRoutes><WishList/></ProtectedRoutes> },
        {path:'forgetPass' , element:<ForgetPassword/>},
        { path: "Categories", element: <ProtectedRoutes><Categories/></ProtectedRoutes> },
        { path: "Checkout", element: <ProtectedRoutes><Checkout/></ProtectedRoutes> },
        { path: "Register", element: <Register/> },
        { path: "ProductDetails/:id", element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>  },
        { path: "Products", element: <ProtectedRoutes><Products/></ProtectedRoutes> },
        { path: "Home", element: <ProtectedRoutes><Home/></ProtectedRoutes> },
        { path: "*", element: <NotFound /> }
      ]
  }])
  useEffect(()=>{
   if (localStorage.getItem("userToken")!=null) {
    setToken(localStorage.getItem("userToken"))
   }
  },[]);
  
  return (
    <> 
     <div>
      <Toaster />
    </div>
      <RouterProvider router={routes}>
        </RouterProvider>
    </>


  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import"@fortawesome/fontawesome-free/css/all.min.css"
import TokenContextProvider from './Context/Token';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/Cart';
import { QueryClient, QueryClientProvider } from 'react-query'
import WishContextProvider from './Context/wishlist';


let query= new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <QueryClientProvider client={query}>
   
  <CartContextProvider>
   <WishContextProvider>
  <React.StrictMode>
    <TokenContextProvider>
    <App />
    </TokenContextProvider>
  </React.StrictMode>
  </WishContextProvider>
  </CartContextProvider>
 
</QueryClientProvider>

 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { Navigate, Route, Routes } from "react-router-dom";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";
import { useEffect, useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {history} from './utils/history';
import PrivateRoute from "./components/PrivateRoute";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./utils/context-token";
import * as authService from "./services/auth-service";
import * as cartService from "./services/cart-service";
import Confirmation from "./components/Confirmation";
import ProductsListing from "./routes/Admin/ProductsListing";
import ProductForm from "./routes/Admin/ProductForm";

function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  const[contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  useEffect(() => {

    setContextCartCount(cartService.getCart().items.length);

    if(authService.isAuthenticated()){
      const token = authService.getAccessTokenPayload();
      setContextTokenPayload(token);
    }
  }, [])

  return (
    
    <ContextToken.Provider value={{contextTokenPayload, setContextTokenPayload}}>
      <ContextCartCount.Provider value={{contextCartCount, setContextCartCount}}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="catalog/product/:id" element={<ProductDetails />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="confirmation/:orderId" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
            </Route>
            <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin/></PrivateRoute>}> 
              <Route index element={<Navigate to={"/admin/home"} />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="products" element={<ProductsListing />} />
              <Route path="product/:id" element={<ProductForm />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
    
  );
}

export default App;

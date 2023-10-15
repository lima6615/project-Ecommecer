import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<ClientHome />}>
          <Route index element={<Catalog />}/>
          <Route path="catalog" element={<Catalog />}/>
          <Route path="catalog/product/:id" element={<ProductDetails />} />
          <Route path="product/:id" element={<ProductDetails />}> </Route>
          <Route path="cart" element={<Cart />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

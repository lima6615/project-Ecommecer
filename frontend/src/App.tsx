import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import NotFound from "./components/NotFound";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientHome />}>
          <Route index element={<Catalog />}/>
          <Route path="/catalog" element={<Catalog />}/>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

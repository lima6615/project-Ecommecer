import "./styles.css";
import HeaderClient from "../../components/HeaderClient";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { ProductDTO } from "../../models/product";

 const product: ProductDTO = {
  id: 1,
  name: "Smart Tv",
  description: "TV Philco 72p full HD",
  imgUrl: "",
  price: 4500.0,
  categories: [
    {
      id: 3,
      name: "Eletronicos",
    },
    {
      id: 3,
      name: "Computadores",
    },
  ],
};

function Catalog() {
  return (
    <>
      <HeaderClient />
      <main>
        <section id="catalog-section" className="dsc-container">
          <SearchBar />
          <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
            <ProductCard product={product}/>
          </div>
          <Pagination name="Carregar mais"/>
        </section>
      </main>
    </>
  );
}

export default Catalog;

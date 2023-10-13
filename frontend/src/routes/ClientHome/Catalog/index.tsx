import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import ProductCard from "../../../components/ProductCard";
import Pagination from "../../../components/Pagination";
import { ProductDTO } from "../../../models/product";
import { useEffect, useState } from "react";
import * as productService from '../../../services/product-service';

function Catalog() {

  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    
    productService.findAll()
    .then(response => {
      setProducts(response.data.content);
    })

  }, [])

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar />
        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
            {
             products.map(item => {
              return <ProductCard key={item.id} product={item} />
             })
            }
        </div>
        <Pagination name="Carregar mais" />
      </section>
    </main>
  );
}

export default Catalog;

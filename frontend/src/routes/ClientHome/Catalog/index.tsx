import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import ProductCard from "../../../components/ProductCard";
import Pagination from "../../../components/Pagination";
import * as productService from "../../../services/product-service";

function Catalog() {
  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar />
        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
          {
            productService.findAll().map( item => {
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

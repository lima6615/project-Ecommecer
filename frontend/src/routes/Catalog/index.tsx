import "./styles.css";
import HeaderClient from "../../components/HeaderClient";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";

function Catalog() {
  return (
    <>
      <HeaderClient />
      <main>
        <section id="catalog-section" className="dsc-container">
          <SearchBar />
          <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          <Pagination />
        </section>
      </main>
    </>
  );
}

export default Catalog;

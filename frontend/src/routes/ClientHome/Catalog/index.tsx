import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import ProductCard from "../../../components/ProductCard";
import Pagination from "../../../components/Pagination";
import { ProductDTO } from "../../../models/product";
import { useEffect, useState } from "react";
import * as productService from '../../../services/product-service';

type QueryParams = {
  page: number;
  name : string;
}
function Catalog() {

  const [isLastPage, setIsLastPage] = useState(false);

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: ""
  });

  useEffect(() => {
    productService.findPageRequest(queryParams.page, queryParams.name)
    .then(response => {
      const nextPage = response.data.content;
      setProducts(products.concat(nextPage));
      setIsLastPage(response.data.last)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  function handleSearch(textSearch: string){
    setProducts([]);
    setQueryParams({...queryParams,page: 0 , name: textSearch})
  }

  function handlePage(){
    setQueryParams({...queryParams, page: queryParams.page + 1})
  }

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar onSearch={handleSearch}/>
        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
            {
             products.map(item => {
              return <ProductCard key={item.id} product={item} />
             })
            }
        </div>
        <div onClick={handlePage}>
          {
            !isLastPage && 
            <Pagination  name="Carregar mais" />
          }
          
        </div>
      </section>
    </main>
  );
}

export default Catalog;

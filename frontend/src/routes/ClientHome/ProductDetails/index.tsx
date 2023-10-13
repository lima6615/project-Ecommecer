import "./styles.css";

import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailCard from "../../../components/ProductDetailsCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import * as productService from '../../../services/product-service';

function ProductDetails() {

  const params = useParams();
  const [product, setProduct] = useState<ProductDTO>();

  useEffect(() => {
    productService.findById(Number(params.id))
    .then(response => {
      setProduct(response.data)
    })
  }, [params])
 
  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {product && <ProductDetailCard product={product} />}
        <div className="dsc-btn-page-container">
          <ButtonPrimary name="Comprar" />
          <Link to="/">
            <ButtonInverse name="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;

import "./styles.css";

import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailCard from "../../../components/ProductDetailsCard";
import * as productService from "../../../services/product-service";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {

  const params = useParams();
  const product = productService.findById(Number(params.id));

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        { product &&  <ProductDetailCard product={product} />}
        <div className="dsc-btn-page-container">
          <ButtonPrimary name="Comprar" />
          <Link to={`/`}>
            <ButtonInverse name="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;

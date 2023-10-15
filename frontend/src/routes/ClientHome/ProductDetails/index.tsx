/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";

import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailCard from "../../../components/ProductDetailsCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import * as productService from "../../../services/product-service";
import * as cartService from "../../../services/cart-service";

function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDTO>();

  useEffect(() => {
    productService
      .findById(Number(params.id))
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [params]);

  function hadleOnClick() {
    if (product) {
      cartService.addProduct(product);
      navigate("/cart");
    }
  }

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {product && <ProductDetailCard product={product} />}
        <div className="dsc-btn-page-container">
          <div onClick={hadleOnClick}>
            <ButtonPrimary name="Comprar" />
          </div>
          <Link to="/">
            <ButtonInverse name="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;

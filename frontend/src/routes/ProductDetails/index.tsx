import "./styles.css";

import ButtonInverse from "../../components/ButtonInverse";
import ButtonPrimary from "../../components/ButtonPrimary";
import HeaderClient from "../../components/HeaderClient";
import ProductDetailCard from "../../components/ProductDetailsCard";
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
    }
  ],
};

function ProductDetails() {
  return (
    <>
      <HeaderClient />
      <main>
        <section id="product-details-section" className="dsc-container">
          <ProductDetailCard product={product} />
          <div className="dsc-btn-page-container">
            <ButtonPrimary />
            <ButtonInverse />
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductDetails;

import "./styles.css";
import ProductCategory from "../ProductCategory";
import { ProductDTO } from "../../models/product";

type Props = {
  product: ProductDTO;
};

function ProductDetailCard({ product }: Props) {
  return (
    <div className="dsc-card dsc-mb20">
      <div className="dsc-product-details-top dsc-line-bottom">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div className="dsc-product-details-bottom">
        <h3>R$ {product.price.toFixed(2)}</h3>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div className="dsc-category-container">
          {product.categories.map((items) => {
            return <ProductCategory key={items.id} name={items.name} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;

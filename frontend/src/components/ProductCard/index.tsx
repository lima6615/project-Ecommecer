import "./styles.css";
import computerImg from "../../assets/computer.svg";
import { ProductDTO } from "../../models/product";

type Props = {
  product: ProductDTO;
};

function ProductCard({ product }: Props) {
  return (
    <>
      <div className="dsc-card">
        <div className="dsc-catalog-card-top dsc-line-bottom">
          <img src={computerImg} alt="Computer" />
        </div>
        <div className="dsc-catalog-card-bottom">
          <h3>R$ { product.price.toFixed(2) }</h3>
          <h4>{ product.name }</h4>
        </div>
      </div>
    </>
  );
}

export default ProductCard;

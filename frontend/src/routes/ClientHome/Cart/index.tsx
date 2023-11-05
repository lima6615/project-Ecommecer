import "./styles.css";
import ButtonInverse from "../../../components/ButtonInverse";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as cartService from "../../../services/cart-service";
import { OrderDTO } from "../../../models/Order";
import { ContextCartCount } from "../../../utils/context-cart";
import * as orderService from '../../../services/order-service';

function Cart() {

const navigate = useNavigate();

const [cart, setCart] = useState<OrderDTO>(cartService.getCart());

const {setContextCartCount} = useContext(ContextCartCount);

function hadleOnClick(){
  cartService.cartClean();
  updateCart();
}

function hadleIncreaseItem(productId: number){
  cartService.increaseItem(productId)
  setCart(cartService.getCart());
}

function hadleDecriseItem(productId: number){
  cartService.decreaseItem(productId);
  updateCart();
}

function updateCart(){
  const newCart = cartService.getCart(); 
  setCart(newCart);
  setContextCartCount(newCart.items.length);
}

function handlePlaceOrderClick(){
  orderService.placeOrderRequest(cart)
  .then(response => {
      cartService.cartClean();
      setContextCartCount(0);
      navigate(`/confirmation/${response.data.id}`)
  });
}

  return (
    <>
      <section id="cart-container-section" className="dsc-container">
        {
          cart.items.length === 0 
          ? (
              <div> 
                <h2 className="dsc-section-title dsc-mb20">Seu carrinho está vazio!</h2>
              </div>
            ) 
          : 
          (
            <div className="dsc-card dsc-mb20">
              {cart.items.map((items) => (
                <div key={items.productId} className="dsc-cart-item-container dsc-line-bottom">
                  <div className="dsc-cart-item-left">
                    <img src={items.imgUrl} alt={items.name} />
                    <div className="dsc-cart-item-descripiton">
                      <h3> {items.name}</h3>
                      <div className="dsc-cart-item-quantity-container">
                        <div onClick={() => hadleDecriseItem(items.productId)} className="dsc-cart-item-quantity-btn">-</div>
                        <p>{items.quantity}</p>
                        <div onClick={() => hadleIncreaseItem(items.productId)} className="dsc-cart-item-quantity-btn">+</div>
                      </div>
                    </div>
                  </div>
                  <div className="dsc-cart-item-right">
                    R$ {items.subTotal.toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="dsc-cart-total-container">
                <h3>R$ {cart.total.toFixed(2)}</h3>
              </div>
            </div>
        )}

        <div className="dsc-btn-page-container">
          <Link to="/login">
            <div onClick={handlePlaceOrderClick} className="dsc-btn dsc-btn-blue">
              Finalizar pedido
            </div>
          </Link>
          <Link to="/">
            <ButtonInverse name="Continuar comprando" />
          </Link>
          <div onClick={hadleOnClick}>
            <ButtonInverse name="Limpar carrinho" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;

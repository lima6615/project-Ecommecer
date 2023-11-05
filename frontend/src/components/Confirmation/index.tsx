import './styles.css';
import { useEffect, useState } from "react";
import { OrderDTO } from "../../models/Order";
import { Link, useParams } from "react-router-dom";
import * as orderService from "../../services/order-service";
import ButtonInverse from "../ButtonInverse";

function Confirmation() {

  const params = useParams();

  const [order, setOrder] = useState<OrderDTO>();

  useEffect(() => {
    orderService.findByIdRequest(Number(params.orderId))
    .then(response => {
        setOrder(response.data)
    })
  }, []);

  return (

      <section id="confirmation-section" className="dsc-container">
        <div className="dsc-card dsc-mb20">
           {
        
                order?.items.map((items) => (
                    <div  key={items.productId} className="dsc-cart-item-container dsc-line-bottom">
                    <div className="dsc-cart-item-left">
                        <img src={items.imgUrl} alt={items.name} />
                        <div className="dsc-cart-item-descripiton">
                        <h3> {items.name}</h3>
                        <div className="dsc-cart-item-quantity-container">
                            <p>{items.quantity}</p>
                        </div>
                        </div>
                    </div>
                    <div className="dsc-cart-item-right">
                        R$ {items.subTotal.toFixed(2)}
                    </div>
                    </div>
                ))
           }

          <div className="dsc-cart-total-container">
            <h3>R$ {order?.total.toFixed(2)}</h3>
          </div>
        </div>

        <div className="dsc-confirmation-message dsc-mb20">
          Pedido realizado! Número {order?.id}
        </div>

        <div className="dsc-btn-page-container">
            <Link to={'/'}>
                <ButtonInverse name="Início"/>
            </Link>
        </div>
      </section>
  );
}

export default Confirmation;

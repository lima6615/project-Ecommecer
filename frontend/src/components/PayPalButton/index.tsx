/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import * as orderService from '../../services/order-service';
import { useEffect, useState } from 'react';
import { OrderDTO } from '../../models/Order';
import { useParams } from 'react-router-dom';


const PayPalButton = () => {

    const CLIENT_ID = "Afnjsje-ZqzrRUvjcT1TTiKwOYdAPgnr4NXZU2HiBgV0NDblXNHOzlGRcCxwG1uFIAS6ooSPJnntu4up"

    const [orderCart, setOrderCart] = useState<OrderDTO>();
   
    const param = useParams();

    useEffect(() => {
      orderService.findByIdRequest(Number(param.orderId))
      .then(resp => {
        setOrderCart(resp.data);
      });
    }, []);

    const createOrder = (_: any, actions: any) => {
      const order = {
        intents: "CAPTURE",
        purchase_units: [
          {
            amount: {
              value: String(orderCart?.total), 
            }
          },  
        ]
      };

      return actions.order.create(order); 
    }

    const handleOnApprove = async (_: any, actions: any) => {
      await actions.order.capture();
      alert('Compra realizada com Sucesso!')
    }

    return (
      <PayPalScriptProvider options={{"clientId" : CLIENT_ID, currency : "BRL"}}>
        <PayPalButtons createOrder={createOrder} onApprove={handleOnApprove}/>
      </PayPalScriptProvider>
    );
  }

export default PayPalButton
import { OrderDTO, OrderItemDTO } from './../models/Order';

export function save(cart: OrderDTO) {
    const str = JSON.stringify(cart);
    localStorage.setItem("cart", str);
}

export function get() : OrderDTO {
    const str = localStorage.getItem("cart") || '{"items":[]}';
    const obj =  JSON.parse(str) as OrderDTO;

    const cart = new OrderDTO();
    obj.items.forEach(x =>
      cart.items.push(new OrderItemDTO (x.productId, x.quantity, x.name, x.price, x.imgUrl)));
    
    return cart;
}

export function clean(){
    localStorage.setItem("cart", '{"items":[]}');
}

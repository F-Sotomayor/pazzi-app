import {Order} from "../order/types";

export default function getOrderTotal(orders: Order): string {
  const total = orders.order.reduce((total, item) => {
    return total + item.presentations.reduce((total, {count, price}) => total + count * price, 0);
  }, 0);

  return total.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

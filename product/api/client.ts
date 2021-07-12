import axios from "axios";

import {CartItem} from "../../cart/types";

export default {
  order: (items: CartItem[], deliveryDate: number): Promise<void> =>
    axios.post(
      "/api/order",
      {items, deliveryDate},
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      },
    ),
};

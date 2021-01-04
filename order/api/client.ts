import axios from "axios";

import {CartItem} from "../../cart/types";
import {Order} from "../types";

export default {
  list: (email: string): Promise<Order[]> =>
    axios
      .get(`/api/order?email=${email}`, {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      })
      .then((res) => res.data),
  create: (items: CartItem[]): Promise<void> =>
    axios.post(`/api/order`, items, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    }),
};

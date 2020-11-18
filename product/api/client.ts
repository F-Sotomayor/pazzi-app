import axios from "axios";

import {CartItem} from "../types";

export default {
  order: (items: CartItem[]): Promise<void> =>
    axios.post("/api/order", items, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    }),
};

import {database} from "../../firebase/admin";
import {Product} from "../types";

export default {
  list: (): Promise<Product[]> => {
    return database
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})));
  },
};

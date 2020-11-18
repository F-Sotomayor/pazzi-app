import {timeStamp} from "console";

import {database, firestore} from "../../firebase/admin";
import {CartItem, Order, Product} from "../types";

export default {
  list: (): Promise<Product[]> => {
    return database
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})));
  },
  order: async (order: CartItem[], email: string): Promise<Order> => {
    const batch = database.batch();

    for (const {id, presentations} of order) {
      const units = presentations.reduce(
        (units, presentation) => units + presentation.units * presentation.count,
        0,
      );

      batch.update(database.collection("products").doc(id), {
        stock: firestore.FieldValue.increment(-units),
      });
    }

    await batch.commit();

    const registry: Order = {
      date: +new Date(),
      email,
      order,
      status: "pending",
    };

    await database.collection("orders").add(registry);

    return registry;
  },
};

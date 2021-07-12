import {CartItem} from "../../cart/types";
import {database, firestore} from "../../firebase/admin";
import {Order} from "../types";

export default {
  create: async (order: CartItem[], deliveryDate: number, email: string): Promise<Order> => {
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
    batch.update(database.collection("test").doc("order"), {
      orderNumber: firestore.FieldValue.increment(1),
    });

    await batch.commit();

    const registry: Order = {
      date: +new Date(),
      email,
      order,
      status: "pending",
      deliveryDate,
      ordernumber: Number(
        (await database.collection("test").doc("order").get()).data().orderNumber,
      ),
    };

    await database.collection("orders").add(registry);

    return registry;
  },
  list: async (email: string): Promise<Order[]> => {
    return database
      .collection("orders")
      .where("email", "==", email)
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Order), id: doc.id})));
  },
};

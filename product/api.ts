import {database} from "../firebase/admin";

import {Product} from "./types";

export default {
  list: (): Promise<Product[]> => {
    return database
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})));
  },
  list2: (): Promise<Product[]> =>
    Promise.resolve([
      {
        id: "01",
        title: "Panes de papa con queso",
        stock: 500,
        description: "Goncy careta",
        presentations: [
          {
            units: 14,
            price: 999,
          },
          {
            units: 24,
            price: 199,
          },
          {
            units: 1234,
            price: 5559,
          },
          {
            units: 554,
            price: 1299,
          },
        ],
      },
      {
        id: "02",
        title: "Panes de cebolla con queso",
        stock: 500,
        description: "Pack de 8 panes de cebolla con queso",
        presentations: [
          {
            units: 114,
            price: 588,
          },
          {
            units: 144,
            price: 15888,
          },
          {
            units: 14,
            price: 1888,
          },
          {
            units: 1234,
            price: 1522,
          },
        ],
      },
      {
        id: "03",
        title: "Panes de papa con queso",
        stock: 500,
        description: "Pack de 16 panes de papa con queso",
        presentations: [
          {
            units: 14,
            price: 3500,
          },
        ],
      },
      {
        id: "04",
        title: "Panes de papa con queso",
        stock: 500,
        description: "Pack de 16 panes de papa con queso",
        presentations: [
          {
            units: 14,
            price: 3500,
          },
        ],
      },
    ]),
};

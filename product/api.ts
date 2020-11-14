import {Product} from "./types";

export default {
  list: (): Promise<Product[]> =>
    Promise.resolve([
      {
        id: "01",
        title: "Panes de papa con queso",
        stock: 500,
        description: "Goncy careta",
        presentations: [
          {
            id: "01",
            units: 14,
            price: 999,
          },
          {
            id: "02",
            units: 24,
            price: 199,
          },
          {
            id: "03",
            units: 1234,
            price: 5559,
          },
          {
            id: "04",
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
            id: "01",
            units: 114,
            price: 588,
          },
          {
            id: "02",
            units: 144,
            price: 15888,
          },
          {
            id: "03",
            units: 14,
            price: 1888,
          },
          {
            id: "04",
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
            id: "01",
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
            id: "01",
            units: 14,
            price: 3500,
          },
        ],
      },
    ]),
};

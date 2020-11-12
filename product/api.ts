import {Product} from "./types";

export default {
  list: (): Promise<Product[]> =>
    Promise.resolve([
      {
        id: "01",
        title: "Panes de papa con queso",
        stock: 500,
        presentations: [
          {
            title: "x4 Panes de papa con queso",
            id: "01",
            description: "Pack de 4 panes de papa con queso",
            units: 14,
            price: 999,
          },
        ],
      },
      {
        id: "02",
        title: "Panes de papa con queso",
        stock: 500,
        presentations: [
          {
            title: "x8 Panes de papa con queso",
            id: "01",
            description: "Pack de 8 panes de papa con queso",
            units: 14,
            price: 1888,
          },
        ],
      },
      {
        id: "03",
        title: "Panes de papa con queso",
        stock: 500,
        presentations: [
          {
            title: "x16 Panes de papa con queso",
            id: "01",
            description: "Pack de 16 panes de papa con queso",
            units: 14,
            price: 3500,
          },
        ],
      },
    ]),
};

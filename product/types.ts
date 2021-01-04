import {CartItem} from "../cart/types";

export interface Product {
  id: string;
  title: string;
  description: string;
  stock: number;
  presentations: Presentation[];
}

export interface Presentation {
  units: number;
  price: number;
}

export interface ClientTenant {
  id: string;
}

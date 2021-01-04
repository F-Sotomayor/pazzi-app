import {CartItem} from "../cart/types";

export interface Order {
  date: number;
  order: CartItem[];
  email: string;
  status: "pending" | "completed" | "cancelled";
}

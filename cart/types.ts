import {Presentation, Product} from "../product/types";

export interface CartItem {
  id: Product["id"];
  title: Product["title"];
  presentations: CartItemPresentation[];
  title2: string;
}

export interface CartItemPresentation extends Presentation {
  count: number;
}

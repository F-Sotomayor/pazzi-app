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

export interface CartItem {
  id: Product["id"];
  title: Product["title"];
  presentations: CartItemPresentation[];
}

export interface CartItemPresentation extends Presentation {
  count: number;
}

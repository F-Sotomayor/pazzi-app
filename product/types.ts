export interface Product {
  id: string;
  title: string;
  stock: number;
  presentations: Presentation[];
}

export interface Presentation {
  id: string;
  title: string;
  description: string;
  units: number;
  price: number;
}

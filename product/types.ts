export interface Product {
  id: string;
  title: string;
  description: string;
  stock: number;
  test: string;
  presentations: Presentation[];
  type: string;
  title2: string;
}

export interface Presentation {
  units: number;
  price: number;
}

export interface ClientTenant {
  id: string;
}

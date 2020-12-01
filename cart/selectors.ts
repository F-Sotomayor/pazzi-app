import {CartItem} from "./types";

export function getRemainingStock(item: CartItem, stock: number) {
  return item.presentations.reduce(
    (stock, presentation) => stock - presentation.units * presentation.count,
    stock,
  );
}

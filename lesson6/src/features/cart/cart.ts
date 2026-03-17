import type { Product } from "../products/product.js";

export type CartItem = {
  product: Product;
  quantity: number;
};

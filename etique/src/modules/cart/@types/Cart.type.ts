import { AvailableIcons } from "../hooks/useCartIcons";
import Product from "./Product.type";

type Cart = {
  icon: AvailableIcons,
  isActive: boolean;
  id: string;
  title: string;
  description: string;
  products: Array<Product>;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export default Cart;
import { uid } from "radashi";
import Cart from "../@types/Cart.type";

const cartsDefaults: Array<Cart> = [
  {
    isActive: true,
    id: uid(12),
    products: [],
    title: 'Carrinho',
    description: 'Compras da semana.',
  }
]

export default cartsDefaults;
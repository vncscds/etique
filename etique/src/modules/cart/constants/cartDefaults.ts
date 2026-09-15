import dayjs from "dayjs";
import { ShoppingCartIcon } from "lucide-react-native";
import { uid } from "radashi";
import Cart from "../@types/Cart.type";

const cartDefaults: Cart = {
  isActive: true,
  id: uid(12),
  products: [],
  title: 'Carrinho',
  description: 'Compras da semana.',
  createdAt: dayjs().toISOString(),
  updatedAt: dayjs().toISOString(),
  total: 0.00,
  icon: ShoppingCartIcon
}

export default cartDefaults;
import Button from "@/shared/components/ui/Button";
import Empty from "@/shared/components/ui/Empty";
import { PlusIcon, ShoppingCartIcon } from "lucide-react-native";

type EmptyCartsProps = {
  onPressNewCart?: () => void;
}

export default function EmptyCarts({ onPressNewCart }: EmptyCartsProps) {
  return (
    <Empty
      icon={ShoppingCartIcon}
      title="Nenhum carrinho"
      briefing="Carrinhos vazios"
      description="Crie um novo carrinho para rastrear uma compra em tempo real."
      actions={() => {
        return (
          <Button buttonVariant="dashed" buttonIcon={PlusIcon} fontSize="sm" onPress={onPressNewCart}>
            Criar novo carrinho
          </Button>
        )
      }}
    />
  );
}
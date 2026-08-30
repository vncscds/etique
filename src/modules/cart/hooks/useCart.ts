import useToast from "@/shared/components/hooks/useToast";
import queryKeys from "@/shared/constants/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CheckCircle2Icon } from "lucide-react-native";
import { uid } from "radashi";
import Cart from "../@types/Cart.type";

export default function useCart() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const $queryKey = queryKeys.cart.READ;
  const $listKey = queryKeys.cart.LIST;

  const activeCartQuery = useQuery({
    queryKey: $queryKey,
    queryFn: () => {
      return queryClient.getQueryData<Cart>($queryKey) || null;
    }
  });

  const createNewCart = useMutation(({
    mutationFn: async ({ id = uid(12), title = 'Meu carrinho', description = 'Compras da semana' }: Partial<Pick<Cart, 'id' | 'title' | 'description'>>) => {
      if (activeCartQuery.data?.isActive) {
        throw new Error('HAS_ALREADY_AN_ACTIVE_CART');
      }

      const cart = queryClient.setQueryData<Cart>($queryKey, () => {
        const newCart = { isActive: true, icon: 'milk', id, title, description, products: [], createdAt: dayjs().toISOString(), updatedAt: dayjs().toISOString(), total: 0.00 };
        return newCart as Cart;
      });

      if (!cart) {
        throw new Error('CART_CREATION_ERROR');
      }

      queryClient.setQueryData<Array<Cart>>($listKey, (prevData) => {
        if (!prevData) {
          return [cart];
        }

        return [...prevData, cart];
      });

      return { ...cart };
    },
    onSuccess: ({ title }) => {
      toast.show('Carrinho criado!', {
        icon: CheckCircle2Icon,
        description: `Você criou o carrinho "${title}" com sucesso.`
      });
    },
    onError: (error) => {
      if (error.message === 'HAS_ALREADY_AN_ACTIVE_CART') {
        toast.error('Oops!', {
          description: 'Já existe um carrinho em aberto... É necessário fechar um carrinho antes de abrir outro.'
        });

        return;
      }

      toast.error('Erro!', {
        description: 'Não foi possível criar um carrinho agora. Tente novamente.'
      });
    }
  }));

  return {
    ...activeCartQuery,
    isActive: activeCartQuery.data?.isActive || false,
    createNewCart: createNewCart.mutate,
    isCreatingNewCart: createNewCart.isPending,
  };
}
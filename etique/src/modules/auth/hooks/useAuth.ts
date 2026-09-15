import useToast from "@/shared/components/hooks/useToast";
import queryKeys from "@/shared/constants/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from 'dayjs';
import { router } from "expo-router";
import { UserPlusIcon } from "lucide-react-native";
import { isNullish, sleep } from "radashi";

export default function useAuth() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const $queryKey = queryKeys.auth.ME;

  const { data, ...query } = useQuery({
    enabled: true,
    queryKey: $queryKey,
    queryFn: async () => {
      const data = queryClient.getQueryData($queryKey);
      return data ? data : null;
    },
  });

  const registerFirstAccessMutation = useMutation({
    mutationFn: async () => {
      await sleep(1000);

      queryClient.setQueryData($queryKey, {
        createdAt: dayjs(),
        updatedAt: dayjs()
      });
    },
    onSuccess: async () => {
      toast.show('Bem-vindo!', {
        description: 'Tudo pronto para você começar!',
        icon: UserPlusIcon,
      });

      router.prefetch('/(tabs)');
      router.replace('/(tabs)');
    }
  });

  return {
    isNewUser: isNullish(data),
    registerFirstAccess: registerFirstAccessMutation.mutate,
    isRegisteringFirstAccess: registerFirstAccessMutation.isPending,
    ...query
  }
}
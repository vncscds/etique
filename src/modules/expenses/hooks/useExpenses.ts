import useToast from "@/shared/components/hooks/useToast";
import queryKeys from "@/shared/constants/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useExpenses() {
  const queryClient = useQueryClient();
  const $queryKey = queryKeys.expenses.READ;
  const toast = useToast();

  // tirar log daq, deixar so mutations
  const expensesQuery = useQuery({
    enabled: true,
    queryKey: $queryKey,
    initialData: {
      expend: 0
    },
    queryFn: () => {
      const expensesLog = queryClient.getQueryData<{ expend: number }>($queryKey);

      if (!expensesLog) {
        return { expend: 0 };
      }

      return expensesLog;
    }
  });

  const addRandomExpensiveAmount = useMutation({
    mutationFn: async () => {
      const randomValue = +(Math.random() * (0.9 - 0.1 + 0.1) + 0.1).toFixed(2)

      const newData = queryClient.setQueryData<{ expend: number }>($queryKey, (prevData) => {
        if (!prevData) {
          return { expend: 0 };
        }

        return {
          ...prevData,
          expend: prevData.expend + randomValue
        }
      });

      return {
        ...newData,
        randomValue
      };
    },
    onSuccess: (data) => {
      if (data) {
        toast.show('Valor adicionado!', {
          id: Math.random(),
          description: `Adicionado ${new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(data.randomValue)}`
        })
      }
    }
  })

  return {
    ...expensesQuery,
    expend: new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(expensesQuery.data.expend),
    addRandomExpensiveAmount: addRandomExpensiveAmount.mutate,
  }
}
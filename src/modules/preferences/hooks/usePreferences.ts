import useToast from "@/shared/components/hooks/useToast";
import queryKeys from "@/shared/constants/queryKeys";
import useThrottleStore from "@/shared/lib/throttle-store";
import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2Icon, OctagonAlertIcon, XCircleIcon } from "lucide-react-native";
import * as _ from "radashi";
import React from "react";
import Preferences from "../@types/Preferences.type";
import preferencesDefault from "../constants/preferencesDefault";
import createPreferences from "../services/createPreferences";
import readPreferences from "../services/readPreferences";

export default function usePreferences() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const $queryKey = queryKeys.preferences.READ;
  const $updateKey = queryKeys.preferences.UPDATE;

  const throttleStore = useThrottleStore(state => state);

  const preferencesQuery = useQuery({
    initialData: preferencesDefault,
    queryKey: $queryKey,
    queryFn: readPreferences,
  });

  const forceInitPreferences = useMutation({
    mutationFn: createPreferences
  });

  const updatePreference = useMutation({
    mutationKey: $updateKey,
    mutationFn: async (newPreferences: Partial<Preferences>) => {
      if (throttleStore.isThrottled) {
        toast.error('Ei!', {
          icon: OctagonAlertIcon,
          description: 'Aguarde antes de alterar as preferências novamente...'
        });

        throw new Error('THROTTLED');
      }

      await _.sleep(500);

      const newData = queryClient.setQueryData($queryKey, (prevData) => {
        if (!prevData) {
          return preferencesDefault;
        }

        return { ...prevData, ...newPreferences };
      });

      await _.sleep(1000);

      return newData;
    },
    onSuccess: () => {
      toast.show('Preferências alteradas', {
        icon: CheckCircle2Icon,
        description: 'As suas preferências foram salvas com sucesso!'
      });
    },
    onError: (err) => {
      if (err.message === 'THROTTLED') {
        return;
      }

      toast.error('Um erro aconteceu...', {
        icon: XCircleIcon,
        description: 'Aconteceu um erro ao tentar salvar suas preferências.'
      });
    },
    onSettled: async () => {
      throttleStore.setIsThrottled(true);

      setTimeout(() => {
        throttleStore.setIsThrottled(false);
        updatePreference.reset();
      }, throttleStore.throttleMs);
    }
  });

  const getPreference = React.useCallback(<T extends keyof Preferences>(preference: T) => {
    const preferences = queryClient.getQueryData($queryKey);
    return _.get(preferences, preference, preferencesDefault[preference]);
  }, []);

  const isUpdatingGlobal = useIsMutating({ mutationKey: $updateKey }) > 0;

  return {
    value: preferencesQuery.data,
    get: getPreference,
    query: preferencesQuery,
    init: forceInitPreferences.mutate,
    update: updatePreference.mutate,

    isUpdating: isUpdatingGlobal,
    isLoading: preferencesQuery.isPending,
    isInitializing: forceInitPreferences.isPending,
    isBlocked: updatePreference.isError && updatePreference.error?.message === 'THROTTLED',
  }
}
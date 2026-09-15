import usePreferences from "@/modules/preferences/hooks/usePreferences";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import queryKeys from "../constants/queryKeys";

export default function useQueriesLoader() {
  const queryClient = useQueryClient();
  const preferences = usePreferences();

  const queriesData = React.useMemo(() => [
    {
      enabled: true,
      prefix: 'preferências',
      queryKey: queryKeys.preferences.READ,
    }
  ], []);

  // const queriesData = React.useMemo(() => [
  //   {
  //     prefix: 'PREFERÊNCIAS',
  //     queryKey: queryKeys.preferences.READ,
  //   }
  // ], [queryClient]);

  // const queries = useQueries({ queries: queriesData })



  return {
    isSucess: preferences.query.isSuccess,
    isError: preferences.query.isError,
    isPending: preferences.query.isPending
  };
}
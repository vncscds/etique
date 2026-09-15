import queryKeys from "@/shared/constants/queryKeys";
import { queryClient } from "../../../../app/_layout";
import preferencesDefault from "../constants/preferencesDefault";

export default async function createPreferences() {
  try {
    queryClient.setQueryData(queryKeys.preferences.READ, preferencesDefault);
  } catch (err) {
    if (Error.isError(err)) {
      throw new Error(err.message);
    } else {
      throw new Error('Erro desconhecido ao criar as preferências.');
    }
  }
}
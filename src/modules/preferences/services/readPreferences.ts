import queryKeys from "@/shared/constants/queryKeys";
import { queryClient } from "../../../../app/_layout";
import Preferences from "../@types/Preferences.type";
import preferencesDefault from "../constants/preferencesDefault";

export default function readPreferences() {
  try {
    const preferences = queryClient.getQueryData<Preferences>(queryKeys.preferences.READ);

    if (!preferences) {
      return preferencesDefault;
    }

    return preferences;
  } catch (err: unknown) {
    if (Error.isError(err)) {
      throw new Error(err.message);
    } else {
      throw new Error('Erro desconhecido ao ler as preferências.');
    }
  }
}
import Welcome from "@/modules/auth/components/Welcome";
import useAuth from "@/modules/auth/hooks/useAuth";
import Spinner from "@/shared/components/ui/Spinner";
import Typography from "@/shared/components/ui/Typography";
import { Colors } from "@/shared/constants";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function AuthIndex() {
  const auth = useAuth();

  if (auth.isPending) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: Colors.MAIN_COLORS.ETIQUE.C1 }}>
        <Spinner />
        <Typography fontFamily="Inter_600SemiBold" fontSize="lg" fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C2}>Carregando informações...</Typography>
        <Typography fontFamily="Inter_400Regular" fontSize="xs" fontColor={Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C1}>Aguarde enquanto preparamos tudo</Typography>
      </View>
    );
  }

  if (!auth.isNewUser) {
    return (
      <Redirect href={"/(tabs)"} />
    );
  }

  return (
    <Welcome />
  );
}
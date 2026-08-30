import Typography from "@/shared/components/ui/Typography";
import useQueriesLoader from "@/shared/hooks/useQueriesLoader";
import * as ExpoRouter from "expo-router";
import React from "react";
import * as RN from "react-native";

export default function LoaderScreen() {
  const queriesLoader = useQueriesLoader();
  const colorScheme = RN.useColorScheme();

  const handleAppAppearance = () => {
    console.log('Verificando cor...')

    if (colorScheme === 'unspecified') {
      RN.Appearance.setColorScheme('dark');
    }
  }

  ExpoRouter.useFocusEffect(React.useCallback(() => {
    (async () => {
      console.log('Pré-carregando rotas...')
      ExpoRouter.router.prefetch('/(tabs)/carts')
      ExpoRouter.router.prefetch('/(tabs)/home')
      ExpoRouter.router.prefetch('/(tabs)/shelves')
    })()
  }, []))

  ExpoRouter.useFocusEffect(React.useCallback(() => {
    handleAppAppearance()
  }, []));


  if (queriesLoader.isSucess) {
    return (
      <ExpoRouter.Redirect href={"/(tabs)/home"} />
    )
  };

  return (
    <Typography>
      Carregando tudo...
    </Typography>
  );
}
import Container from "@/shared/components/layout/Container";
import Typography from "@/shared/components/ui/Typography";
import { View } from "react-native";

import usePreferences from "@/modules/preferences/hooks/usePreferences";
import Modal from "@/shared/components/ui/Modal";
import RadioButton from "@/shared/components/ui/RadioButton";
import { Colors } from "@/shared/constants";
import React from "react";

export default function AnimationsScreen() {
  const preferences = usePreferences();
  const disableAnimations = preferences.get('disableAnimations');

  // React.useEffect(() => {
  //   router.prefetch('/(auth)');
  //   router.prefetch('/(tabs)');
  //   router.prefetch('/(tabs)/carts');
  //   router.prefetch('/(tabs)/shelves');
  // }, [disableAnimations]);

  return (
    <React.Fragment>
      <Modal isVisible={preferences.isUpdating} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.MAIN_COLORS.ETIQUE.C1 }} backdropColor={'rgba(0,0,0,.1)'}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', paddingHorizontal: 64, paddingVertical: 26, borderRadius: 7, alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <Typography fontSize="base" fontFamily="Inter_600SemiBold" >Aplicando alterações...</Typography>
            <Typography fontSize="sm" fontColor={Colors.NEUTRAL_COLORS.C6} customStyle={{ lineHeight: 15 }}>Por favor, aguarde.</Typography>
          </View>
        </View>
      </Modal>
      <Container>
        <Typography fontFamily="Inter_700Bold">Animações</Typography>
        <Typography fontSize="sm">{'Para melhorar o desempenho do aplicativo, desative as animações.'}</Typography>
        <View style={{ gap: 16, paddingTop: 16 }}>
          <RadioButton disabled={preferences.isBlocked || preferences.isUpdating || disableAnimations === true} isChecked={disableAnimations === true} label="Sim, desativar animações" onPress={() => preferences.update({ disableAnimations: true })} />
          <RadioButton disabled={preferences.isBlocked || preferences.isUpdating || disableAnimations === false} isChecked={disableAnimations === false} label="Não, manter as animações" onPress={() => preferences.update({ disableAnimations: false })} />
        </View>
      </Container>
    </React.Fragment>
  )
}
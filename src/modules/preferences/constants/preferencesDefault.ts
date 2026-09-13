import { Appearance } from "react-native";

const preferencesDefault = {
  username: 'Usuário',
  theme: Appearance.getColorScheme(),
  appColor: 'pink',
  disableAnimations: false,
};

export default preferencesDefault;
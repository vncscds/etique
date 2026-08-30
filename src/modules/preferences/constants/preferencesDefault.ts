import { Appearance } from "react-native";

const preferencesDefault = {
  theme: Appearance.getColorScheme(),
  appColor: 'pink',
  disableAnimations: false,
};

export default preferencesDefault;
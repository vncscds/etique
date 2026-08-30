import { Colors } from "@/shared/constants";
import { Loader2Icon } from "lucide-react-native";
import * as RN from "react-native";
import Icon, { IconProps } from "./Icon";

export default function Spinner({ iconColor = Colors.MAIN_COLORS_NEUTRAL.ETIQUE.C1, iconSize = "3xl", ...props }: Omit<IconProps, 'icon'>) {
  const spinnerValue = new RN.Animated.Value(0);

  RN.Animated.loop(
    RN.Animated.timing(spinnerValue, {
      toValue: 1,
      duration: 1000,
      easing: RN.Easing.linear,
      useNativeDriver: true
    })
  ).start();


  const spin = spinnerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <RN.Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Icon strokeWidth={2} icon={Loader2Icon} iconColor={iconColor} iconSize={iconSize} {...props} />
    </RN.Animated.View>
  );
}
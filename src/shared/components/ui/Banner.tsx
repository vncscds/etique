import { Colors } from "@/shared/constants";
import { AlertCircleIcon, LucideIcon, XIcon } from "lucide-react-native";
import React from "react";
import * as RN from "react-native";
import Icon from "./Icon";
import Typography from "./Typography";

type BannerProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  onPress?: () => void;
  dismiss?: boolean;
  opacity?: RN.AnimatableNumericValue;
}

export default function Banner({
  title,
  description,
  icon = AlertCircleIcon,
  onPress,
  dismiss = false,
  opacity,
}: BannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleOnDismiss = () => {
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <RN.Pressable style={({ pressed }) => [styles.container, { opacity: pressed ? .5 : 1 }, { opacity }]} onPress={onPress}>
      <RN.View style={styles.header}>
        <RN.View>
          <Icon icon={icon} iconColor={Colors.MAIN_COLORS.ETIQUE.C2} strokeWidth={2} iconSize="xl" />
        </RN.View>
        <RN.View>
          <Typography fontSize="sm" fontFamily="Inter_700Bold" fontColor={Colors.MAIN_COLORS.ETIQUE.C2}>{title}</Typography>
          <Typography fontSize="xs" fontColor={Colors.MAIN_COLORS.ETIQUE.C1}>{description}</Typography>
        </RN.View>
      </RN.View>
      {dismiss && (
        <RN.Pressable style={({ pressed }) => [{ opacity: pressed ? .5 : 1 }]} onPress={handleOnDismiss}>
          <Icon icon={XIcon} iconSize="xl" iconColor={Colors.MAIN_COLORS.ETIQUE.C2} />
        </RN.Pressable>)
      }
    </RN.Pressable >
  );
}

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: Colors.BADGE_COLORS.DEFAULT.BACKGROUND,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  }
});
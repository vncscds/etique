import { Colors } from "@/shared/constants";
import { BadgeIcon, LucideIcon } from "lucide-react-native";
import * as RN from 'react-native';
import { match } from "ts-pattern";
import Icon from "./Icon";
import Typography from "./Typography";

type BadgeProps = {
  title?: string
  variant?: 'neutral' | 'default' | 'warning' | 'success' | 'error';
  icon?: LucideIcon
}

export default function Badge({
  title,
  variant = 'default',
  icon = BadgeIcon
}: BadgeProps) {
  const BADGE_COLOR = match(variant)
    .with('neutral', () => Colors.BADGE_COLORS.NEUTRAL)
    .with('default', () => Colors.BADGE_COLORS.DEFAULT)
    .with('warning', () => Colors.BADGE_COLORS.WARNING)
    .with('success', () => Colors.BADGE_COLORS.SUCCESS)
    .with('error', () => Colors.BADGE_COLORS.ERROR)
    .exhaustive();

  return (
    <RN.View
      style={[
        styles.container,
        { backgroundColor: BADGE_COLOR.BACKGROUND, borderColor: BADGE_COLOR.BORDER }
      ]}
    >
      {icon && <Icon icon={icon} iconSize="xs" iconColor={BADGE_COLOR.INNER} strokeWidth={3} />}
      {title && <Typography fontSize="2xs" fontFamily="Inter_600SemiBold" fontColor={BADGE_COLOR.INNER}>{title}</Typography>}
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    gap: 5,
    borderWidth: 1.5,
    flexShrink: 1,
    borderRadius: 7,
    maxWidth: 100,
  }
})
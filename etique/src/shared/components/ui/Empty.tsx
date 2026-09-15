import { Colors } from "@/shared/constants"
import { CircleOffIcon, LucideIcon } from "lucide-react-native"
import { JSX } from "react"
import { StyleSheet, View } from "react-native"
import Container from "../layout/Container"
import Icon from "./Icon"
import Typography from "./Typography"

type EmptyProps = {
  icon: LucideIcon,
  title: string;
  briefing: string;
  description: string;
  actions?: () => JSX.Element;
}

export default function Empty({ icon = CircleOffIcon, title, briefing, description, actions }: EmptyProps) {
  return (
    <Container customStyle={styles.container}>
      <View style={styles.icon}>
        <Icon icon={icon} iconSize="2xl" iconColor={Colors.BADGE_COLORS.DEFAULT.INNER} />
      </View>
      <View style={styles.text}>
        <Typography fontSize="xl" fontFamily="Inter_700Bold">{title}</Typography>
        <Typography fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C4} customStyle={{ lineHeight: 14 }}>{briefing}</Typography>
      </View>
      <Typography customStyle={{ textAlign: 'center', maxWidth: '90%' }} fontSize="xs" fontColor={Colors.NEUTRAL_COLORS.C6}>{description}</Typography>
      <View>
        {actions?.()}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14
  },
  icon: {
    backgroundColor: Colors.BADGE_COLORS.DEFAULT.BACKGROUND,
    borderWidth: 1,
    borderColor: Colors.BADGE_COLORS.DEFAULT.BORDER,
    padding: 16,
    borderRadius: 12
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
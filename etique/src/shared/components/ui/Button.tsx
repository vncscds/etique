import { Colors } from "@/shared/constants";
import { LucideIcon } from "lucide-react-native";
import { PropsWithChildren } from "react";
import * as RN from "react-native";
import { match } from "ts-pattern";
import Icon from "./Icon";
import Spinner from "./Spinner";
import Typography, { TypographyProps } from "./Typography";

type ButtonProps = PropsWithChildren<{
  isPending?: boolean;
  buttonVariant?: 'default' | 'dashed'
  buttonIcon?: LucideIcon,
  asChild?: boolean;
  customStyle?: RN.StyleProp<RN.ViewStyle>
}> & Pick<RN.PressableProps, 'onPress'> & Pick<TypographyProps, 'fontSize'>;

const dimensions = RN.Dimensions.get('screen');

export default function Button({ isPending, children, buttonIcon, customStyle, asChild, buttonVariant = 'default', fontSize, ...props }: ButtonProps) {
  const typographyFontColor = match(buttonVariant)
    .with('dashed', () => Colors.MAIN_COLORS.ETIQUE.C2)
    .otherwise(() => Colors.NEUTRAL_COLORS.WHITE);

  return (
    <RN.Pressable
      hitSlop={8}
      style={(props) => ([{ opacity: props.pressed || isPending ? .6 : 1, }, styles.buttonContainer, customStyle, buttonVariants[buttonVariant]])}
      disabled={isPending}
      {...props}>
      <RN.View style={[(buttonIcon || isPending) && styles.buttonIcon]}>
        {buttonIcon && <Icon icon={buttonIcon} iconColor={Colors.MAIN_COLORS.ETIQUE.C2} />}
        {isPending && <Spinner iconColor={Colors.NEUTRAL_COLORS.WHITE} iconSize={fontSize} />}
        <Typography fontColor={typographyFontColor} customStyle={{ textAlign: 'center' }} fontSize={fontSize}>
          {children}
        </Typography>
      </RN.View>
    </RN.Pressable >
  )
}

const styles = RN.StyleSheet.create({
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 7,
    backgroundColor: Colors.MAIN_COLORS.ETIQUE.C2,
    justifyContent: 'center'
  }
})

const buttonVariants = RN.StyleSheet.create({
  default: {},
  dashed: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, borderColor: Colors.MAIN_COLORS.ETIQUE.C1,
    minWidth: dimensions.width * 0.9,
    justifyContent: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: '#fff7f9',
    borderStyle: 'dashed',
    borderRadius: 7
  },
})
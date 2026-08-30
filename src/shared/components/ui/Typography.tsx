import * as RN from "react-native";
import { match } from 'ts-pattern';

export type TypographyProps = {
  fontColor?: string;

  fontSize?:
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl';

  fontWeight?:
  'normal' |
  'bold' |
  '100' |
  '200' |
  '300' |
  '400' |
  '500' |
  '600' |
  '700' |
  '800' |
  '900';

  fontFamily?:
  | 'Inter_100Thin'
  | 'Inter_200ExtraLight'
  | 'Inter_300Light'
  | 'Inter_400Regular'
  | 'Inter_500Medium'
  | 'Inter_600SemiBold'
  | 'Inter_700Bold'
  | 'Inter_800ExtraBold'
  | 'Inter_900Black'
  | 'Inter_100Thin_Italic'
  | 'Inter_200ExtraLight_Italic'
  | 'Inter_300Light_Italic'
  | 'Inter_400Regular_Italic'
  | 'Inter_500Medium_Italic'
  | 'Inter_600SemiBold_Italic'
  | 'Inter_700Bold_Italic'
  | 'Inter_800ExtraBold_Italic'
  | 'Inter_900Black_Italic';

  customStyle?: RN.TextStyle
} & RN.TextProps

export default function Typography({
  children,
  fontColor = '#0D0D0D',
  fontFamily = 'Inter_400Regular',
  fontSize = 'base',
  fontWeight = 'normal',
  customStyle,
  ...props
}: TypographyProps) {
  const $fontSize = match(fontSize)
    .with('4xs', () => 6)
    .with('3xs', () => 8)
    .with('2xs', () => 10)
    .with('xs', () => 12)
    .with('sm', () => 14)
    .with('base', () => 16)
    .with('lg', () => 18)
    .with('xl', () => 20)
    .with('2xl', () => 24)
    .with('3xl', () => 28)
    .with('4xl', () => 32)
    .with('5xl', () => 36)
    .with('6xl', () => 40)
    .with('7xl', () => 44)
    .with('8xl', () => 48)
    .otherwise(() => 16);

  const textStyle: RN.TextStyle = {
    color: fontColor,
    fontWeight,
    fontFamily,
    fontSize: $fontSize,
  }

  return (
    <RN.Text style={[textStyle, customStyle]} {...props}>
      {children}
    </RN.Text>
  )
}
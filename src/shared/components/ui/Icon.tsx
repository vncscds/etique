import * as Lucide from 'lucide-react-native';
import { match } from 'ts-pattern';

export type IconProps = {
  icon: Lucide.LucideIcon,
  iconColor?: string;
  iconSize?:
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
} & Pick<Lucide.LucideProps, 'strokeWidth'>;

export default function Icon({ icon: LucideIcon, iconColor, iconSize, ...props }: IconProps) {

  const $iconSize = match(iconSize)
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

  return (
    <LucideIcon
      strokeWidth={1.3}
      color={iconColor}
      size={$iconSize}
      {...props}
    />
  )
}
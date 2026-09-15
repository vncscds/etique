import { Colors } from '@/shared/constants';
import * as React from 'react';
import * as RN from 'react-native';

type ContainerProps = React.PropsWithChildren<{
  unpadded?: boolean;
  customStyle?: RN.ViewStyle;
}>;

export default function Container({
  children,
  unpadded = false,
  customStyle,
}: ContainerProps) {
  return (
    <RN.View style={[unpadded && { padding: 0 }, styles.container, customStyle]}>
      {children}
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.NEUTRAL_COLORS.WHITE,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
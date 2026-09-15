import * as ExpoStatusBar from 'expo-status-bar'
import * as React from 'react'
import * as RN from 'react-native'
import { SafeAreaView as RNSafeAreaView, SafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context'
import useStatusBar from '../hooks/useStatusBar'

type SafeAreaViewProps = React.PropsWithChildren<{
  statusBarStyle?: ExpoStatusBar.StatusBarStyle;
  backgroundColor?: string;
  customStyle?: RN.ViewStyle;
}> & Pick<RNSafeAreaViewProps, 'edges'>;

export default function SafeAreaView({ children, statusBarStyle = 'auto', customStyle, ...props }: SafeAreaViewProps) {
  useStatusBar({ style: statusBarStyle });

  return (
    <RNSafeAreaView style={[styles.container, customStyle]} {...props}>
      {children}
    </RNSafeAreaView>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1
  }
});
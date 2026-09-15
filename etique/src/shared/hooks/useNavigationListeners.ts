import { ImperativeRouter, useNavigation, useRouter } from "expo-router";
import React from "react";
import { BackHandler, Platform } from "react-native";

type UseNavigationListenersProps = {
  onFocus?: (router: ImperativeRouter) => void;
  onBlur?: (router: ImperativeRouter) => void;
  preventRemove?: boolean;
  onBeforeRemove?: () => void;
}

export default function useNavigationListeners({
  onFocus,
  onBlur,
  preventRemove = false,
  onBeforeRemove,
}: UseNavigationListenersProps) {
  const navigation = useNavigation();
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      onFocus?.(router);
    });
    return unsubscribeFocus;
  }, [navigation, onFocus]);

  React.useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      onBlur?.(router);
    });
    return unsubscribeBlur;
  }, [navigation, onBlur]);

  React.useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', (ev) => {
      if (!preventRemove) {
        return false;
      }

      onBeforeRemove?.();

      return true;
    });

    return () => {
      subscription.remove();
    }
  }, [preventRemove, onBeforeRemove]);

  React.useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    navigation.setOptions({ gestureEnabled: !preventRemove });

    return () => {
      navigation.setOptions({ gestureEnabled: true });
    };
  }, [navigation, preventRemove]);
}
import React from "react";
import { BackHandler } from "react-native";

type UseOnBackProps = {
  onBack?: () => boolean;
}

export default function useOnBack({ onBack }: UseOnBackProps) {
  React.useEffect(() => {
    const subscriber = BackHandler.addEventListener('hardwareBackPress', () => {
      return onBack?.();
    });

    return () => {
      subscriber.remove()
    }
  }, []);
}
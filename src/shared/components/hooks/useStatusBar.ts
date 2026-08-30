import { useFocusEffect } from "expo-router";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import { useCallback } from "react";

export default function useStatusBar({ style = 'auto', hidden = false }: StatusBarProps = {}) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setStyle(style);
      StatusBar.setHidden(hidden);
    }, [])
  );
}
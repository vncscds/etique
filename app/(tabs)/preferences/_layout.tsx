import usePreferences from "@/modules/preferences/hooks/usePreferences";
import SafeAreaView from "@/shared/components/layout/SafeAreaView";
import { Colors } from "@/shared/constants";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const preferences = usePreferences();
  const disableAnimations = preferences.get('disableAnimations');

  return (
    <SafeAreaView backgroundColor={Colors.NEUTRAL_COLORS.WHITE} statusBarStyle="dark" edges={["top"]}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: disableAnimations ? 'none' : 'default'
        }}>
        <Stack.Screen
          name="index"
        />
        <Stack.Screen
          name="animations"
        />
      </Stack>
    </SafeAreaView>
  )
}
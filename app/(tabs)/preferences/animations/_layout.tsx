import usePreferences from "@/modules/preferences/hooks/usePreferences";
import Header from "@/shared/components/ui/Header";
import { Stack } from "expo-router";

export default function AnimationsLayout() {
  const preferences = usePreferences();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => {
            return (
              <Header title="Animações" description="Desativar animações" renderLeft={() => {
                return (
                  <Header.BackButton />
                )
              }} />
            )
          }
        }}
      />
    </Stack>
  )
}
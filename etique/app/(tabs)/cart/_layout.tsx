import SafeAreaView from "@/shared/components/layout/SafeAreaView";
import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <SafeAreaView edges={["top"]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
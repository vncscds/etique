import SplashScreen from "@/shared/components/layout/SplashScreen";
import { Calendar } from "@/shared/constants";
import cachePersister from "@/shared/lib/cache-persister";
import * as InterFont from '@expo-google-fonts/inter';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as ReactQuery from "@tanstack/react-query";
import * as ReactQueryPersister from '@tanstack/react-query-persist-client';
import * as ExpoRouter from "expo-router";
import * as _ from 'radashi';
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ReactNativeSafeArea from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';

/**
 * Initializes the React Query client with global caching default options.
 */
export const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      staleTime: Calendar.ONE_MINUTE_IN_MILLISECONDS * 5,
      gcTime: Calendar.ONE_DAY_IN_MILLISECONDS
    }
  }
});

ExpoRouter.SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = React.useState<boolean>(false);

  const [isFontLoaded, isFontError] = InterFont.useFonts({
    ..._.omit(InterFont, ['useFonts', '__metadata__'])
  });

  const persister = React.useMemo(() => cachePersister(), []);

  const handleAppSplashScreen = React.useCallback(async () => {
    if (isFontLoaded || isFontError) {
      await ExpoRouter.SplashScreen.hideAsync()
      await _.sleep(3000)
      setIsAppReady(true);
    }
  }, [isFontLoaded, isFontError]);

  React.useEffect(() => {
    handleAppSplashScreen()
  }, [handleAppSplashScreen]);

  if (!isAppReady) {
    return (
      <SplashScreen />
    );
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ReactNativeSafeArea.SafeAreaProvider>
          <ReactQueryPersister.PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
              buster: 'v1',
              persister,
              maxAge: Number.MAX_SAFE_INTEGER
            }}
          >
            <ExpoRouter.Stack>
              <ExpoRouter.Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
              <ExpoRouter.Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
            </ExpoRouter.Stack>
          </ReactQueryPersister.PersistQueryClientProvider>
        </ReactNativeSafeArea.SafeAreaProvider>
      </BottomSheetModalProvider>
      <Toaster duration={Calendar.ONE_SECOND_IN_MILLISECONDS * 3} />
    </GestureHandlerRootView>
  )
}
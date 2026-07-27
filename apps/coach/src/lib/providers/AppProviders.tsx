import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  AuthProvider,
  ThemeProvider,
  useAppTheme,
} from '@darkmat/shared';

import { CoachDataProvider } from './CoachDataProvider';

function ThemedRoot({ children }: PropsWithChildren) {
  const { colors } = useAppTheme();
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.primaryBackground }}
    >
      <SafeAreaProvider>
        <AuthProvider appRole="coach">
          <CoachDataProvider>{children}</CoachDataProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      variant="coach"
      storageKey="@dark-mat/coach-appearance-preference"
      defaultPreference="dark"
    >
      <QueryClientProvider client={queryClient}>
        <ThemedRoot>{children}</ThemedRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

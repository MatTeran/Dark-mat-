import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '../queryClient';
import { colors } from '../theme';
import { AuthProvider } from './AuthProvider';
import { CommunityProvider } from './CommunityProvider';
import { WorkoutProvider } from './WorkoutProvider';

/**
 * Root provider composition — keep third-party context here,
 * not inside individual screens.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.primaryBackground }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CommunityProvider>
              <WorkoutProvider>{children}</WorkoutProvider>
            </CommunityProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

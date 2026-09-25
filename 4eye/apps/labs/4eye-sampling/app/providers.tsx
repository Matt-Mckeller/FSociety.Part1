'use client';

import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import type { Palette } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { WebSessionProvider, AuthProvider } from '@expanse/auth';
import {
  ThemeProvider,
  lightThemePalette,
  darkThemePalette,
} from '@expanse/theme';
import { createBrandCoreExtensions } from '@expanse/brand-core';

export function Providers({ children }: { children: React.ReactNode }) {
  // Register brand-core component theme configs (ExpanseCharacter,
  // ProgressBar, Gem, etc.) so components like ProfileFrame /
  // PushingProgressCharacter can read `theme.components.ExpanseCharacter`.
  const componentExtensions = useMemo(
    () => ({
      light: createBrandCoreExtensions(lightThemePalette as unknown as Palette),
      dark: createBrandCoreExtensions(darkThemePalette as unknown as Palette),
    }),
    [],
  );

  return (
    <ApolloProvider client={apolloClient}>
      <WebSessionProvider>
        <AuthProvider>
          <ThemeProvider
            initialTheme="blue"
            initialThemeMode="system"
            componentExtensions={componentExtensions}
          >
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </WebSessionProvider>
    </ApolloProvider>
  );
}

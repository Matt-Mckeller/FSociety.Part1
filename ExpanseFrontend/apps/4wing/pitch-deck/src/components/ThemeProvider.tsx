'use client';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MUIThemeProvider theme={theme}>
      {children}
    </MUIThemeProvider>
  );
}

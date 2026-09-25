import type { Metadata } from "next";
import { CssBaseline } from '@mui/material';
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Counsellor Support - Pitch Deck",
  description: "AI-powered counseling assistant with companion robot - Investor Pitch Deck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Counsellor Support - AI Mental Health Assistant",
  description: "AI-powered counseling assistant with companion robot. Supports mental health through live session assistance, between-session support, and standalone AI companionship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation>{children}</Navigation>
        </ThemeProvider>
      </body>
    </html>
  );
}

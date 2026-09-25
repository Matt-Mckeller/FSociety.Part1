import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Expanse Services",
  description: "Fresh baseline app for Expanse services.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

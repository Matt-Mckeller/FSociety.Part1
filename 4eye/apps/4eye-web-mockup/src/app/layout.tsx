import type { Metadata } from "next";
import { Providers } from "@4eye/web/app/providers";

export const metadata: Metadata = {
  title: "4eye Marketing",
  description: "Marketing plan presentation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

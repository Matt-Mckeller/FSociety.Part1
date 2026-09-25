import type { Metadata } from 'next';
import { Providers } from './providers';
import { xpens } from './fonts';

export const metadata: Metadata = {
  title: '4eye.ai',
  description: 'AI-powered learning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={xpens.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

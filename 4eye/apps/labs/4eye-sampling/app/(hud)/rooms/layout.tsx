'use client';

import { RoomsProvider } from '@4eye/core';

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <RoomsProvider>{children}</RoomsProvider>;
}

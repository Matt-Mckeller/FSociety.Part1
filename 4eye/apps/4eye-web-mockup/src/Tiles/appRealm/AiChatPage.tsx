"use client";

import { AiChatDashboard, AiChatProviders } from "./aiChat/AiChatProviders";

export default function AiChatPage() {
  return (
    <AiChatProviders>
      <AiChatDashboard />
    </AiChatProviders>
  );
}

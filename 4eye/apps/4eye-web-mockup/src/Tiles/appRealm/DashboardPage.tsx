"use client";

import AiChatPage from "./AiChatPage";

/**
 * DashboardPage — the App Realm center tile now hosts the AI Chat
 * experience (moved here from the former /appRealm/ai-chat route).
 * AiChatPage supplies the full provider stack + AiChatDashboard.
 */
export default function DashboardPage() {
  return <AiChatPage />;
}

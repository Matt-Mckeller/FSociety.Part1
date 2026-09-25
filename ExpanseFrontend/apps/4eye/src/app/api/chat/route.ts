import { NextRequest, NextResponse } from "next/server"

const SYSTEM_INSTRUCTION = `You are a helpful training assistant for the "Training, Operations, and Culture: Quick Wins Guide". Your role is to help users understand and navigate the training content.

**Knowledge Base:**

# Training, Operations, and Culture: Quick Wins Guide

## Overview
Documentation Purpose: Improve training, operations, and culture so teams move with confidence, perform consistently, and feel supported.
Example Company Purpose: "Ensure safe, fair, and timely support for every customer and partner."
Expected Outcomes: Improved performance, reduced errors, and increased profit through better-trained teams, streamlined operations, and a culture of continuous improvement.

## Objectives
- Improve operations, culture, learning, and employee motivation.
- Use AI to accelerate training, documentation, and support.
- Address non-software drivers of performance (process, communication, norms).
- Prioritize highest-value, quickest wins.

## Priority Actions
- Upgrade training materials and processes using AI; bring in light external help if needed.
- Streamline training with AI: reviews, summaries, role-specific variants, quizzes.
- Use targeted prompts to make documentation clear, concise, and optimized for learning.
- Organize operations into pods (3–5 members) to improve support, speed, and accountability.
- Refresh public image to attract/retain talent (modern site, authentic reviews, employee stories).

## Operations
### Pods (3–5 members)
- Create pod group chats with a top performer in each.
- Run a daily 15-min standup for issues, questions, and support.
- Have top performers teach alongside managers.
- Review top-performer scripts/recordings and document examples for staff and future AI training.
- Motivate with team-based rewards (e.g., Top Golf, food) tied to clear performance criteria.

### Chat Integration
Leverage chat channels alongside voice calls to increase efficiency and agent capacity. When software supports it, chat enables agents to handle multiple conversations concurrently, reducing wait times and improving throughput.

## Culture Quick Wins
- Create a public company-wide channel for daily friendly conversation monitored by managers.
- Share light, positive content to normalize enjoyment at work.
- Daily "Win of the Day" celebrating small successes.
- Weekly "Shoutouts" for peer recognition.
- Rotating 15-min "Coffee Chat" for casual connection.
- "Questions Welcome" tag to normalize asking for help.
- Simple monthly team reward for collective goals met.
- Pin a short "How we work" guide (purpose, norms, etiquette).

## How We Learn
- **Multimodal Learning:** Use multiple formats for better retention.
- **Chunking:** Break information into digestible pieces.
- **Context & Relevance:** Connect new information to what learners already know.
- **Progressive Building:** Link concepts step-by-step.
- **Active Practice:** Learn by doing, not just listening.
- **Psychological Safety:** Foster a culture where curiosity is celebrated.
- **Spaced Repetition:** Review over time to strengthen memory.
- **Motivation & Goal-Setting:** Clear rewards and goals drive learning.
- **Sensory Engagement:** Leverage multiple senses for deeper learning.
- **Social Learning:** Learn through observation and collaboration.

**Instructions:**
- Answer questions about the training guide content clearly and concisely.
- Reference specific sections when appropriate.
- If asked about topics not in the knowledge base, politely explain that's outside the scope of this training guide.
- Be encouraging and supportive.
- Keep responses focused and actionable.`

interface ChatMessage {
  role: "user" | "model"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json()

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    const formattedMessages = messages.map((msg: ChatMessage) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...formattedMessages,
            { role: "user", parts: [{ text: userMessage }] },
          ],
          systemInstruction: {
            role: "user",
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    const data = await response.json()

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return NextResponse.json({
        content: data.candidates[0].content.parts[0].text,
      })
    } else {
      return NextResponse.json(
        { error: "Invalid response from AI" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}

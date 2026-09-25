import { z } from 'zod';

export namespace Chat {
  export const Message = z.object({
    role: z.enum(['system', 'user', 'assistant', 'tool']),
    content: z.string(),
    toolCallId: z.string().optional(),
    toolName: z.string().optional(),
  });
  export type Message = z.infer<typeof Message>;

  export const RequestDto = z.object({
    messages: z.array(Message).min(1),
    model: z.string().optional(),
  });
  export type RequestDto = z.infer<typeof RequestDto>;

  export const StreamEvent = z.discriminatedUnion('type', [
    z.object({ type: z.literal('text'), delta: z.string() }),
    z.object({
      type: z.literal('tool_call'),
      name: z.string(),
      args: z.unknown(),
      callId: z.string(),
    }),
    z.object({
      type: z.literal('tool_result'),
      callId: z.string(),
      ok: z.boolean(),
      result: z.unknown().optional(),
      error: z.string().optional(),
    }),
    z.object({ type: z.literal('done') }),
    z.object({ type: z.literal('error'), error: z.string() }),
  ]);
  export type StreamEvent = z.infer<typeof StreamEvent>;
}

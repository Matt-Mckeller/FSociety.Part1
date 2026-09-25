import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import type { Chat } from '@4eye/scene-studio-shared';
import { ReplaySubject, Observable } from 'rxjs';
import { loadConfig } from '../config/config.service.js';
import { LibraryService } from '../library/library.service.js';
import { BrowseService } from '../actions/browse/browse.service.js';
import { EditService } from '../actions/edit/edit.service.js';
import { AnimateService } from '../actions/animate/animate.service.js';

interface ToolDef {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  handler: (args: Record<string, unknown>) => Promise<unknown>;
}

@Injectable()
export class ChatService {
  private readonly log = new Logger(ChatService.name);
  private client: OpenAI | null = null;

  constructor(
    private readonly library: LibraryService,
    private readonly browse: BrowseService,
    private readonly edit: EditService,
    private readonly animate: AnimateService,
  ) {}

  private get openai(): OpenAI {
    if (this.client) return this.client;
    const cfg = loadConfig();
    if (!cfg.openai.apiKey) throw new Error('OPENAI_API_KEY is not set');
    this.client = new OpenAI({ apiKey: cfg.openai.apiKey });
    return this.client;
  }

  private buildTools(): ToolDef[] {
    return [
      {
        name: 'list_assets',
        description: 'List all assets in the library with id, folder, filename, title, order, tags, starred.',
        parameters: { type: 'object', properties: {}, additionalProperties: false },
        handler: async () => {
          const lib = await this.library.getLibrary();
          return lib.assets.map((a) => ({
            id: a.id,
            folder: a.file.folder,
            filename: a.file.filename,
            title: a.display.title,
            sceneCode: a.display.sceneCode,
            order: a.catalog.order,
            tags: a.catalog.tags,
            starred: a.catalog.starred,
            kind: a.kind,
            source: a.origin.source,
          }));
        },
      },
      {
        name: 'update_asset',
        description: 'Patch display (title, description, sceneCode) or catalog (order, tags, starred) on a single asset.',
        parameters: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
            display: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                sceneCode: { type: 'string' },
              },
            },
            catalog: {
              type: 'object',
              properties: {
                order: { type: 'number' },
                tags: { type: 'array', items: { type: 'string' } },
                starred: { type: 'boolean' },
              },
            },
          },
        },
        handler: async (args) => {
          const { id, display, catalog } = args as {
            id: string;
            display?: Record<string, unknown>;
            catalog?: Record<string, unknown>;
          };
          return this.browse.updateAsset(id, {
            ...(display ? { display: display as never } : {}),
            ...(catalog ? { catalog: catalog as never } : {}),
          });
        },
      },
      {
        name: 'reorder_assets',
        description: 'Set new order values for multiple assets at once.',
        parameters: {
          type: 'object',
          required: ['orders'],
          properties: {
            orders: {
              type: 'object',
              description: 'Map of assetId → numeric order',
              additionalProperties: { type: 'number' },
            },
          },
        },
        handler: async (args) => {
          await this.browse.reorder(args as { orders: Record<string, number> });
          return { ok: true };
        },
      },
      {
        name: 'bulk_tag',
        description: 'Add and/or remove tags across many assets.',
        parameters: {
          type: 'object',
          required: ['assetIds'],
          properties: {
            assetIds: { type: 'array', items: { type: 'string' } },
            add: { type: 'array', items: { type: 'string' } },
            remove: { type: 'array', items: { type: 'string' } },
          },
        },
        handler: async (args) => {
          const { assetIds, add = [], remove = [] } = args as {
            assetIds: string[];
            add?: string[];
            remove?: string[];
          };
          return this.browse.bulkTag({ assetIds, add, remove });
        },
      },
      {
        name: 'start_edit',
        description: 'Submit an image edit job (returns jobId). Progress is reported via WebSocket.',
        parameters: {
          type: 'object',
          required: ['sourceAssetId', 'prompt'],
          properties: {
            sourceAssetId: { type: 'string' },
            prompt: { type: 'string' },
            variations: { type: 'integer', minimum: 1, maximum: 4 },
            size: { enum: ['1024x1024', '1536x1024', '1024x1536', 'auto'] },
          },
        },
        handler: async (args) => {
          const jobId = this.edit.startJob({
            sourceAssetId: (args as { sourceAssetId: string }).sourceAssetId,
            prompt: (args as { prompt: string }).prompt,
            variations: ((args as { variations?: number }).variations ?? 1),
            size: ((args as { size?: 'auto' | '1024x1024' | '1536x1024' | '1024x1536' }).size ?? 'auto'),
          });
          return { jobId };
        },
      },
      {
        name: 'start_animate',
        description: 'Submit an animation job. Returns jobId; progress via WebSocket.',
        parameters: {
          type: 'object',
          required: ['startAssetId', 'prompt'],
          properties: {
            startAssetId: { type: 'string' },
            prompt: { type: 'string' },
            durationSec: { type: 'number', minimum: 2, maximum: 10 },
          },
        },
        handler: async (args) => {
          const jobId = this.animate.startJob({
            startAssetId: (args as { startAssetId: string }).startAssetId,
            prompt: (args as { prompt: string }).prompt,
            durationSec: ((args as { durationSec?: number }).durationSec ?? 5),
          });
          return { jobId };
        },
      },
    ];
  }

  stream(dto: Chat.RequestDto): Observable<Chat.StreamEvent> {
    // ReplaySubject so late subscribers (Nest SSE pipeline subscribes one tick
    // after we return) still receive events that may have already fired
    // synchronously (e.g. immediate error when API key is missing).
    const subject = new ReplaySubject<Chat.StreamEvent>(1000);
    void this.runLoop(dto, subject).catch((err) => {
      subject.next({ type: 'error', error: (err as Error).message });
      subject.next({ type: 'done' });
      subject.complete();
    });
    return subject.asObservable();
  }

  private async runLoop(dto: Chat.RequestDto, sink: ReplaySubject<Chat.StreamEvent>): Promise<void> {
    const cfg = loadConfig();
    const model = dto.model ?? cfg.openai.chatModel;
    const tools = this.buildTools();
    const toolsByName = new Map(tools.map((t) => [t.name, t]));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openaiTools: any = tools.map((t) => ({
      type: 'function',
      function: {
        name: t.name,
        description: t.description,
        parameters: t.parameters,
      },
    }));

    const systemPrompt = `You are the AI assistant for a local image/video gallery for the "Classroom of Tomorrow" marketing video.
You can read the library and modify it via tools. Always call list_assets first if the user references assets you don't know about.
When the user asks to reorder, retag, edit, or animate, call the appropriate tool. Keep replies concise.`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      ...dto.messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...(m.toolCallId ? { tool_call_id: m.toolCallId } : {}),
        ...(m.toolName && m.role === 'tool' ? { name: m.toolName } : {}),
      })),
    ];

    const maxIterations = 5;
    for (let iter = 0; iter < maxIterations; iter++) {
      this.log.log(`iter=${iter} model=${model} messages=${messages.length}`);
      let stream;
      try {
        stream = await this.openai.chat.completions.create({
          model,
          messages,
          tools: openaiTools,
          tool_choice: 'auto',
          stream: true,
        });
      } catch (err) {
        this.log.error(`OpenAI call failed: ${(err as Error).message}`);
        throw err;
      }

      let assistantContent = '';
      const toolCalls = new Map<
        number,
        { id: string; name: string; argsBuf: string }
      >();

      let chunkCount = 0;
      for await (const chunk of stream) {
        chunkCount++;
        const delta = chunk.choices[0]?.delta;
        if (!delta) continue;
        if (delta.content) {
          assistantContent += delta.content;
          sink.next({ type: 'text', delta: delta.content });
        }
        if (delta.tool_calls) {
          for (const tc of delta.tool_calls) {
            const idx = tc.index ?? 0;
            let entry = toolCalls.get(idx);
            if (!entry) {
              entry = { id: tc.id ?? '', name: tc.function?.name ?? '', argsBuf: '' };
              toolCalls.set(idx, entry);
            }
            if (tc.id) entry.id = tc.id;
            if (tc.function?.name) entry.name = tc.function.name;
            if (tc.function?.arguments) entry.argsBuf += tc.function.arguments;
          }
        }
      }
      this.log.log(`iter=${iter} chunks=${chunkCount} contentLen=${assistantContent.length} toolCalls=${toolCalls.size}`);

      if (toolCalls.size === 0) {
        sink.next({ type: 'done' });
        sink.complete();
        return;
      }

      // append assistant message with tool_calls
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const calls = [...toolCalls.values()].map((c) => ({
        id: c.id,
        type: 'function' as const,
        function: { name: c.name, arguments: c.argsBuf || '{}' },
      }));
      messages.push({
        role: 'assistant',
        content: assistantContent || null,
        tool_calls: calls,
      });

      // execute each tool call
      for (const c of calls) {
        let parsed: Record<string, unknown> = {};
        try { parsed = JSON.parse(c.function.arguments); } catch { /* ignore */ }
        sink.next({ type: 'tool_call', name: c.function.name, args: parsed, callId: c.id });
        const def = toolsByName.get(c.function.name);
        if (!def) {
          const err = `Unknown tool: ${c.function.name}`;
          sink.next({ type: 'tool_result', callId: c.id, ok: false, error: err });
          messages.push({ role: 'tool', tool_call_id: c.id, content: JSON.stringify({ error: err }) });
          continue;
        }
        try {
          const result = await def.handler(parsed);
          sink.next({ type: 'tool_result', callId: c.id, ok: true, result });
          messages.push({
            role: 'tool',
            tool_call_id: c.id,
            content: JSON.stringify(result).slice(0, 8000),
          });
        } catch (err) {
          const errMsg = (err as Error).message;
          sink.next({ type: 'tool_result', callId: c.id, ok: false, error: errMsg });
          messages.push({
            role: 'tool',
            tool_call_id: c.id,
            content: JSON.stringify({ error: errMsg }),
          });
        }
      }
      // loop continues — model gets tool results and can either reply or call more tools
    }

    sink.next({ type: 'error', error: `Stopped after ${maxIterations} tool iterations` });
    sink.next({ type: 'done' });
    sink.complete();
  }
}

import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Content Type Flows
 * Per-content-type editing processes, UI options, and transformation pipelines
 * 
 * Migrated from: plans/generation/content_type_flows.md
 */

export const generationContentTypeFlows: PlanModule = {
  id: 'generation-content-type-flows',
  title: 'Generation Module: Content Type Flows',
  description: 'Per-content-type editing processes, UI options, and transformation pipelines',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Each content type has its own creation and editing flow. Some content types involve transformation pipelines (e.g., script → audio).',
        },
      ],
    },
    {
      id: 'content-type-summary',
      title: 'Content Type Summary',
      content: [
        {
          type: 'table',
          headers: ['Type', 'Flow', 'Transformations', 'UI'],
          rows: [
            ['Posts', 'Create → Edit → Review', 'None', 'Text editor'],
            ['Images', 'Create → Edit → Review', 'None', 'Image preview + settings'],
            ['Scripts (Audio)', 'Script → Review → Audio Transform', 'Script → Audio', 'Script editor → Audio preview'],
            ['Scripts (Video)', 'Script → Review → Video Recording/Generation', 'Script → Video', 'Script editor → Video preview'],
            ['Scripts (Audio/Visual)', 'Script → Audio → Visual Sync', 'Script → Audio → Visual', 'Multi-stage editor'],
            ['Visual Scripts', 'Script with visual specs → Video Generation', 'Script + Visual Context → Video', 'Script + storyboard editor'],
          ],
        },
      ],
    },
    {
      id: 'posts',
      title: 'Posts',
      content: [
        {
          type: 'text',
          value: '**Flow**: Create → Edit → Review → Schedule',
        },
        { type: 'heading', level: 4, text: 'UI Options' },
        {
          type: 'list',
          items: [
            'Text editor with character count',
            'Platform preview (how it looks on each platform)',
            'Hashtag suggestions',
            'Emoji picker',
          ],
        },
        {
          type: 'text',
          value: '**Pipeline**: Standard text generation',
        },
      ],
    },
    {
      id: 'images',
      title: 'Images',
      content: [
        {
          type: 'text',
          value: '**Flow**: Create → Edit → Review → Schedule',
        },
        { type: 'heading', level: 4, text: 'UI Options' },
        {
          type: 'list',
          items: [
            'Prompt editor',
            'Style/mood selectors',
            'Platform aspect ratio selector',
            'Label overlay toggle',
            'Multi-language label options',
          ],
        },
        {
          type: 'text',
          value: '**Pipeline**: Image generation with platform-specific formatting',
        },
      ],
    },
    {
      id: 'scripts-audio',
      title: 'Scripts (Audio)',
      content: [
        {
          type: 'text',
          value: '**Flow**: Script Creation → Script Review → Audio Transformation → Audio Review → Schedule',
        },
        { type: 'heading', level: 4, text: 'Stage 1 - Script Creation' },
        {
          type: 'list',
          items: [
            'Text editor for script content',
            'Tone/pace annotations',
            'Speaker notes',
          ],
        },
        { type: 'heading', level: 4, text: 'Stage 2 - Audio Transformation' },
        {
          type: 'list',
          items: [
            'Voice selection',
            'Speed/pitch adjustments',
            'Background music options',
            'Audio preview player',
          ],
        },
        {
          type: 'text',
          value: '**Pipeline**: `script_generation` → `script_to_audio`',
        },
      ],
    },
    {
      id: 'scripts-video',
      title: 'Scripts (Video)',
      content: [
        {
          type: 'text',
          value: '**Flow**: Script Creation → Script Review → Video Recording/Generation → Video Review → Schedule',
        },
        { type: 'heading', level: 4, text: 'Subtypes' },
        {
          type: 'list',
          items: [
            '**Self-Recording**: User records themselves using the script as teleprompter',
            '**AI-Generated**: AI generates video from script',
          ],
        },
        { type: 'heading', level: 4, text: 'Stage 1 - Script Creation' },
        {
          type: 'list',
          items: [
            'Text editor for script content',
            'Teleprompter mode option',
            'Timing/pacing markers',
          ],
        },
        { type: 'heading', level: 4, text: 'Stage 2 - Video Creation' },
        {
          type: 'list',
          items: [
            'For self-recording: Teleprompter UI, recording controls',
            'For AI-generated: Avatar/style selection, scene settings',
          ],
        },
        {
          type: 'text',
          value: '**Pipeline**: `script_generation` → `video_recording` | `script_to_video`',
        },
      ],
    },
    {
      id: 'scripts-audiovisual',
      title: 'Scripts (Audio/Visual)',
      content: [
        {
          type: 'text',
          value: '**Flow**: Script → Audio Generation → Visual Sync → Review → Schedule',
        },
        { type: 'heading', level: 4, text: 'Stage 1 - Script Creation' },
        {
          type: 'list',
          items: [
            'Text with timing markers',
            'Audio cue annotations',
          ],
        },
        { type: 'heading', level: 4, text: 'Stage 2 - Audio Generation' },
        {
          type: 'list',
          items: [
            'Voice selection',
            'Timing refinement',
          ],
        },
        { type: 'heading', level: 4, text: 'Stage 3 - Visual Sync' },
        {
          type: 'list',
          items: [
            'Visual overlay selection',
            'Sync timing adjustments',
            'B-roll / supplementary visuals',
          ],
        },
        {
          type: 'text',
          value: '**Pipeline**: `script_generation` → `script_to_audio` → `audio_visual_sync`',
        },
      ],
    },
    {
      id: 'visual-scripts',
      title: 'Visual Scripts',
      content: [
        {
          type: 'text',
          value: '**Flow**: Script with Visual Specs → Video Generation → Review → Schedule',
        },
        {
          type: 'text',
          value: '**Description**: Scripts that include detailed visual specifications - symbols, environment descriptions, background context, scene composition.',
        },
        { type: 'heading', level: 4, text: 'Script Components' },
        {
          type: 'list',
          items: [
            'Dialogue/narration text',
            'Symbol/icon descriptions (what visual elements appear)',
            'Environment/setting descriptions',
            'Background context specifications',
            'Camera/framing notes',
            'Transition descriptions',
          ],
        },
        { type: 'heading', level: 4, text: 'UI Options' },
        {
          type: 'list',
          items: [
            'Split editor: Script + Visual annotations',
            'Symbol library picker',
            'Environment preset selector',
            'Storyboard preview',
          ],
        },
        { type: 'heading', level: 4, text: 'Prompt Considerations' },
        {
          type: 'list',
          items: [
            'More detailed visual context in prompts',
            'Symbol library references',
            'Environment/mood specifications',
          ],
        },
        {
          type: 'text',
          value: '**Pipeline**: `visual_script_generation` → `script_to_visual_video`',
        },
      ],
    },
    {
      id: 'transformation-pipelines',
      title: 'Transformation Pipelines',
      content: [
        {
          type: 'table',
          headers: ['Pipeline', 'Input', 'Output', 'Description'],
          rows: [
            ['script_to_audio', 'Script text', 'Audio file', 'Text-to-speech with voice settings'],
            ['script_to_video', 'Script text', 'Video file', 'AI-generated video from script'],
            ['video_recording', 'Script + User recording', 'Video file', 'Self-recorded video with script'],
            ['audio_visual_sync', 'Audio + Visual specs', 'Video file', 'Sync audio with visual elements'],
            ['script_to_visual_video', 'Visual script', 'Video file', 'Full visual video from detailed script'],
          ],
        },
      ],
    },
    {
      id: 'tasks',
      title: 'Tasks',
      content: [
        {
          type: 'tasks',
          items: [
            { id: 'ctf-task-1', title: 'Define TypeScript interfaces for each content type', completed: false },
            { id: 'ctf-task-2', title: 'Design per-type editing UI components', completed: false },
            { id: 'ctf-task-3', title: 'Implement transformation pipeline orchestration', completed: false },
            { id: 'ctf-task-4', title: 'Create symbol library for visual scripts', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'overview', title: 'Overview', path: '/modules/generation/overview', description: 'Content types summary' },
    { id: 'configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'Per-type settings' },
    { id: 'process-flow', title: 'Process Flow', path: '/modules/generation/process-flow', description: 'General process diagrams' },
  ],
};

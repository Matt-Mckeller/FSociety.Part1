import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '@mui/material';
import { PageHeader } from '@4up-ui/PageHeader';
import { Card } from '@4up-ui/Card';
import { 
  ModelConfigCard, 
  PromptTemplateCard, 
  PromptTester 
} from '@4up-features/ai-studio';
import { modelConfigs, promptTemplates } from '@seed';

/**
 * AI Studio Page Composition
 * 
 * Demonstrates the layout of the AI Studio configuration page.
 */

const AIStudioPage = () => (
  <Box sx={{ p: 3 }}>
    <PageHeader
      title="AI Studio"
      subtitle="Configure AI models and prompt templates"
      action={{
        label: 'New Template',
        onClick: () => console.log('New template clicked'),
      }}
    />

    <Grid container spacing={3} sx={{ mt: 1 }}>
      {/* Models Section */}
      <Grid size={{ xs: 12 }}>
        <Card title="AI Models" subtitle="Configure which models to use for generation">
          <Grid container spacing={2}>
            {modelConfigs.slice(0, 3).map((config) => (
              <Grid key={config.id} size={{ xs: 12, md: 4 }}>
                <ModelConfigCard
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  config={config as any}
                  onToggleEnabled={(id, enabled) => console.log('Toggle:', id, enabled)}
                  onSetDefault={(id) => console.log('Set default:', id)}
                  showSettings={false}
                />
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>

      {/* Prompt Templates Section */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card title="Prompt Templates" subtitle="Manage your content templates">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {promptTemplates.map((template) => (
              <PromptTemplateCard
                key={template.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                template={template as any}
                onSelect={(t) => console.log('Selected:', t.id)}
                onEdit={(t) => console.log('Edit:', t.id)}
              />
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Prompt Tester Section */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card title="Prompt Tester" subtitle="Test templates with sample inputs">
          <PromptTester
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            template={promptTemplates[0] as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            models={modelConfigs as any}
            onTest={async (templateId, variables) => {
              console.log('Testing:', templateId, variables);
              return 'Sample generated content...';
            }}
            isLoading={false}
          />
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const meta = {
  title: '4up/Pages/AIStudio',
  component: AIStudioPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The AI Studio page for configuring models, managing prompt templates, and testing prompts.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AIStudioPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

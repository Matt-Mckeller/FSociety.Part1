import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { ContentEditor } from '../components';
import { CONTENT_TYPES, lightColors } from '../constants';
import type { ContentType } from '../types';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>{children}</Box>
  </Box>
);

const SAMPLE_CONTENT = `🚀 Transform your business with AI-powered automation!

Tired of manual processes eating up your team's valuable time? Our platform helps you:

✅ Automate repetitive tasks
✅ Reduce operational costs by 40%
✅ Free your team for strategic work

Join 500+ companies already seeing results.

👉 Start your free trial today!`;

const meta: Meta<typeof ContentEditor> = {
  title: 'Screens/AIGuidedEditorV6/Components/ContentEditor',
  component: ContentEditor,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Component = () => {
      const [content, setContent] = React.useState(SAMPLE_CONTENT);
      return (
        <ContentEditor
          content={content}
          onContentChange={setContent}
          contentType={CONTENT_TYPES[0]} // post
          onRegenerate={() => console.log('Regenerate')}
        />
      );
    };
    return <Component />;
  },
};

export const Empty: Story = {
  render: () => {
    const Component = () => {
      const [content, setContent] = React.useState('');
      return (
        <ContentEditor
          content={content}
          onContentChange={setContent}
          contentType={CONTENT_TYPES[0]}
          onRegenerate={() => console.log('Regenerate')}
        />
      );
    };
    return <Component />;
  },
};

export const Generating: Story = {
  render: () => {
    const Component = () => {
      const [content, setContent] = React.useState(SAMPLE_CONTENT);
      return (
        <ContentEditor
          content={content}
          onContentChange={setContent}
          contentType={CONTENT_TYPES[0]}
          onRegenerate={() => {}}
          isGenerating={true}
        />
      );
    };
    return <Component />;
  },
};

export const NearLimit: Story = {
  render: () => {
    const Component = () => {
      // Create content near the word limit
      const longContent = Array(450).fill('word').join(' ');
      const [content, setContent] = React.useState(longContent);
      return (
        <ContentEditor
          content={content}
          onContentChange={setContent}
          contentType={CONTENT_TYPES[0]}
          onRegenerate={() => console.log('Regenerate')}
        />
      );
    };
    return <Component />;
  },
};

export const OverLimit: Story = {
  render: () => {
    const Component = () => {
      // Create content over the word limit
      const longContent = Array(550).fill('word').join(' ');
      const [content, setContent] = React.useState(longContent);
      return (
        <ContentEditor
          content={content}
          onContentChange={setContent}
          contentType={CONTENT_TYPES[0]}
          onRegenerate={() => console.log('Regenerate')}
        />
      );
    };
    return <Component />;
  },
};

export const ArticleType: Story = {
  render: () => {
    const Component = () => {
      const articleContent = `# The Future of AI in Business Automation

## Introduction

Artificial intelligence is revolutionizing how businesses operate. From customer service to supply chain management, AI-powered solutions are helping companies achieve unprecedented levels of efficiency and productivity.

## Key Benefits

### 1. Time Savings
Automation can reduce manual task time by up to 80%, freeing employees to focus on strategic work.

### 2. Cost Reduction
Companies report an average of 40% reduction in operational costs after implementing AI automation.

### 3. Improved Accuracy
AI systems consistently outperform humans in data-intensive tasks, reducing errors by up to 95%.`;
      const [content, setContent] = React.useState(articleContent);
      const articleType = CONTENT_TYPES.find((t: ContentType) => t.id === 'article')!;
      return (
        <ContentEditor
          content={content}
          onContentChange={setContent}
          contentType={articleType}
          onRegenerate={() => console.log('Regenerate')}
        />
      );
    };
    return <Component />;
  },
};

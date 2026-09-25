import type { Meta, StoryObj } from '@storybook/react';
import { PersonaGrid } from '@4up-features/audience';
import { personas } from '@seed';

const meta = {
  title: '4up/Audience/PersonaGrid',
  component: PersonaGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Grid layout displaying persona cards with clickable actions for viewing details and generating content.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonaGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    personas: personas as any,
    onPersonaClick: (id: string) => console.log('Persona clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    personas: [],
    onPersonaClick: () => {},
    onGenerateClick: () => {},
    loading: true,
  },
};

export const SinglePersona: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    personas: [personas[0]] as any,
    onPersonaClick: (id: string) => console.log('Persona clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};

export const ManyPersonas: Story = {
  args: {
    personas: [
      ...personas,
      {
        ...personas[0],
        id: 'persona-extra-001',
        name: 'Alex Rivera',
        title: '4up/Growth Lead',
        quote: 'Data-driven decisions are key to scaling.',
        priority: 2 as const,
      },
      {
        ...personas[1],
        id: 'persona-extra-002',
        name: 'Rachel Kim',
        title: '4up/Brand Manager',
        quote: 'Consistency builds trust with our audience.',
        priority: 2 as const,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    onPersonaClick: (id: string) => console.log('Persona clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};

export const HighPriorityOnly: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    personas: personas.filter((p) => p.priority === 1) as any,
    onPersonaClick: (id: string) => console.log('Persona clicked:', id),
    onGenerateClick: (id: string) => console.log('Generate clicked:', id),
    loading: false,
  },
};

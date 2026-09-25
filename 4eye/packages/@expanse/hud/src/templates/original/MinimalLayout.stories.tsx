import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MinimalLayout, type MinimalLayoutProps } from './MinimalLayout';
import { NavigationProvider } from '@expanse/map/navigation';
import type { MapGridNavigationConfig } from '@expanse/map/navigation/types';
import type { AutoPageMap } from '../types/auto-generation';

// Sample map grid configuration
const sampleConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 5,
    height: 5,
    homePosition: { x: 2, y: 2 },
    wrapAround: true,
  },
  tiles: [
    {
      id: 'home',
      position: { x: 2, y: 2 },
      url: '/',
      seo: { title: 'Home', description: 'Welcome home' },
      display: { label: 'Home', colors: { inactive: '#90caf9', active: '#1976d2' } },
    },
    {
      id: 'about',
      position: { x: 3, y: 2 },
      url: '/about',
      seo: { title: 'About', description: 'About us' },
      display: { label: 'About', colors: { inactive: '#90caf9', active: '#1976d2' } },
    },
    {
      id: 'services',
      position: { x: 2, y: 1 },
      url: '/services',
      seo: { title: 'Services' },
      display: { label: 'Services', colors: { inactive: '#90caf9', active: '#1976d2' } },
    },
    {
      id: 'contact',
      position: { x: 2, y: 3 },
      url: '/contact',
      seo: { title: 'Contact' },
      display: { label: 'Contact', colors: { inactive: '#90caf9', active: '#1976d2' } },
    },
  ],
};

// Sample pages
const HomePage = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
    <h1>Welcome Home</h1>
    <p>Use arrow keys or navigation controls to explore</p>
  </div>
);

const AboutPage = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
    <h1>About Us</h1>
    <p>This is the about page</p>
  </div>
);

const ServicesPage = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
    <h1>Our Services</h1>
    <p>Explore what we offer</p>
  </div>
);

const ContactPage = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
    <h1>Contact Us</h1>
    <p>Get in touch</p>
  </div>
);

const pageRegistry: AutoPageMap = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  contact: ContactPage,
};

const meta: Meta<typeof MinimalLayout> = {
  title: 'Layout Systems/Basic Web Layout/Minimal',
  component: MinimalLayout,
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider config={sampleConfig}>
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', inset: 0 }}>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Minimal layout template for grid navigation with clean, distraction-free design.

**Presets:**
- \`clean\`: Pure content, no controls visible
- \`floating-controls\`: Subtle floating minimap and navigation
- \`bottom-controls\`: Minimap in corner, controls in bottom bar
- \`gaming\`: Dark theme with strategic control placement
- \`presentation\`: Speaker notes panel with progress bar
- \`kiosk\`: Large touch-friendly controls

**Features:**
- Automatic page routing from grid configuration
- Multiple preset configurations
- Customizable overlays (minimap, navigation pad)
- Theme support (light/dark)
- Smooth transitions between pages
        `,
      },
    },
  },
  argTypes: {
    preset: {
      control: 'select',
      options: ['clean', 'floating-controls', 'bottom-controls', 'gaming', 'presentation', 'kiosk'],
      description: 'Layout preset configuration',
    },
    minimapVariant: {
      control: 'select',
      options: ['grid', 'dots', 'blocks'],
      description: 'Minimap visualization style',
    },
    minimapSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Minimap size',
    },
    navPadVariant: {
      control: 'select',
      options: ['default', 'hints', 'compact', 'expanded'],
      description: 'Navigation pad style',
    },
    navPadSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Navigation pad size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MinimalLayout>;

export const Clean: Story = {
  args: {
    preset: 'clean',
    autoPages: pageRegistry,
  },
  parameters: {
    docs: {
      description: {
        story: 'Cleanest possible layout - pure content with no visible controls. Use keyboard arrows to navigate.',
      },
    },
  },
};

export const FloatingControls: Story = {
  args: {
    preset: 'floating-controls',
    autoPages: pageRegistry,
    minimapVariant: 'grid',
    minimapSize: 'medium',
    navPadVariant: 'default',
    navPadSize: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Floating minimap (top-right) and navigation controls (bottom-center). Perfect for presentations or immersive experiences.',
      },
    },
  },
};

export const BottomControls: Story = {
  args: {
    preset: 'bottom-controls',
    autoPages: pageRegistry,
    minimapVariant: 'dots',
    minimapSize: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimap in bottom-right corner with navigation controls in a bottom bar.',
      },
    },
  },
};

export const Gaming: Story = {
  args: {
    preset: 'gaming',
    autoPages: pageRegistry,
    minimapVariant: 'grid',
    minimapSize: 'medium',
    navPadVariant: 'expanded',
    navPadSize: 'large',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Dark theme with gaming-style controls. Minimap top-left, navigation bottom-right.',
      },
    },
  },
};

export const Presentation: Story = {
  args: {
    preset: 'presentation',
    autoPages: pageRegistry,
    minimapVariant: 'dots',
    minimapSize: 'small',
    navPadVariant: 'compact',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Presentation mode with speaker notes area and progress indicator.',
      },
    },
  },
};

export const Kiosk: Story = {
  args: {
    preset: 'kiosk',
    autoPages: pageRegistry,
    minimapVariant: 'blocks',
    minimapSize: 'large',
    navPadVariant: 'expanded',
    navPadSize: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Kiosk mode with large, touch-friendly controls and clear navigation.',
      },
    },
  },
};

export const CustomMinimap: Story = {
  args: {
    preset: 'floating-controls',
    autoPages: pageRegistry,
    minimapVariant: 'blocks',
    minimapSize: 'large',
    navPadVariant: 'hints',
  },
  parameters: {
    docs: {
      description: {
        story: 'Customized control variants - blocks minimap with hints navigation pad.',
      },
    },
  },
};

export const WithCustomContent: Story = {
  args: {
    preset: 'floating-controls',
    autoPages: pageRegistry,
  },
  render: (args: MinimalLayoutProps) => (
    <NavigationProvider config={sampleConfig}>
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', inset: 0 }}>
        <MinimalLayout {...args}>
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Custom Content</h1>
            <p>
              You can pass custom content as children to override the automatic page system.
              This is useful when you want manual control over page rendering.
            </p>
            <p>Try navigating with arrow keys - the content stays the same!</p>
          </div>
        </MinimalLayout>
      </div>
    </NavigationProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom children content instead of automatic page registry.',
      },
    },
  },
};

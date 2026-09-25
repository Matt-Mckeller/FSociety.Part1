import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavigationPad } from './NavigationPad';
import { NavigationProvider } from '@expanse/map/navigation'
import type { MapGridNavigationConfig } from '@expanse/map/navigation/types'

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
      seo: { title: 'Home' },
      display: { label: 'Home', colors: { inactive: '#ccc', active: '#00f' } },
    },
    {
      id: 'about',
      position: { x: 3, y: 2 },
      seo: { title: 'About' },
      display: { label: 'About', colors: { inactive: '#ccc', active: '#00f' } },
    },
  ],
};

const meta: Meta<typeof NavigationPad> = {
  title: 'Layout Systems/HUD Components/Navigation Pad',
  component: NavigationPad,
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider config={sampleConfig}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Navigation pad component with multiple visual variants.
Provides directional navigation with arrow buttons in different styles.

**Variants:**
- \`default\`: Clean arrow buttons in cross pattern
- \`hints\`: Arrows with keyboard shortcut hints (WASD)
- \`compact\`: Minimal space-efficient design
- \`expanded\`: D-Pad style with filled background
- \`hud\`: Dark glass HUD-style (symbol-grid aesthetic)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'hints', 'compact', 'expanded', 'hud'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size preset',
    },
    position: {
      control: 'select',
      options: ['inline', 'bottom-left', 'bottom-right', 'bottom-center'],
      description: 'Positioning mode',
    },
    showKeyboardHints: {
      control: 'boolean',
      description: 'Show WASD keyboard hints (hints variant)',
    },
    showHome: {
      control: 'boolean',
      description: 'Show home button',
    },
    showBack: {
      control: 'boolean',
      description: 'Show back button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all buttons',
    },
    highContrast: {
      control: 'boolean',
      description: 'Enable high contrast mode (WCAG AAA compliant)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationPad>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    position: 'inline',
    showHome: false,
    showBack: false,
    disabled: false,
  },
};

export const WithHints: Story = {
  args: {
    variant: 'hints',
    size: 'medium',
    position: 'inline',
    showKeyboardHints: true,
    showHome: true,
    showBack: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hints variant displays keyboard shortcuts (WASD) on hover.',
      },
    },
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    size: 'small',
    position: 'inline',
    showHome: false,
    showBack: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant minimizes space usage, ideal for mobile or constrained layouts.',
      },
    },
  },
};

export const Expanded: Story = {
  args: {
    variant: 'expanded',
    size: 'large',
    position: 'inline',
    showHome: true,
    showBack: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Expanded variant has a D-Pad style with filled background, great for gaming interfaces.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    variant: 'default',
    size: 'small',
    position: 'inline',
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'default',
    size: 'large',
    position: 'inline',
    showHome: true,
    showBack: true,
  },
};

export const BottomRight: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    position: 'bottom-right',
    showHome: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Fixed position in bottom-right corner of viewport.',
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider config={sampleConfig}>
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#f5f5f5' }}>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    position: 'inline',
    disabled: true,
    showHome: true,
    showBack: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All navigation buttons disabled.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <NavigationProvider config={sampleConfig}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Default</h3>
          <NavigationPad variant="default" size="medium" showHome />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Hints</h3>
          <NavigationPad variant="hints" size="medium" showKeyboardHints showHome />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Compact</h3>
          <NavigationPad variant="compact" size="medium" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Expanded</h3>
          <NavigationPad variant="expanded" size="medium" showHome showBack />
        </div>
      </div>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comparison of all variant styles.',
      },
    },
  },
};

export const HighContrast: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    position: 'inline',
    highContrast: true,
    showHome: true,
    showBack: true,
  },
  parameters: {
    docs: {
      description: {
        story: `High contrast mode for accessibility (WCAG AAA compliant).
Uses solid borders and maximum contrast colors for users with visual impairments.
        `,
      },
    },
  },
};

export const HighContrastAllVariants: Story = {
  render: () => (
    <NavigationProvider config={sampleConfig}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Default (High Contrast)</h3>
          <NavigationPad variant="default" size="medium" showHome highContrast />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Hints (High Contrast)</h3>
          <NavigationPad variant="hints" size="medium" showKeyboardHints showHome highContrast />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Compact (High Contrast)</h3>
          <NavigationPad variant="compact" size="medium" highContrast />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Expanded (High Contrast)</h3>
          <NavigationPad variant="expanded" size="medium" showHome showBack highContrast />
        </div>
      </div>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comparison of all variant styles with high contrast mode enabled.',
      },
    },
  },
};

/**
 * Demonstrates NavigationPad contrast on various backgrounds.
 * The component should remain visible and usable on any background.
 */
export const ContrastDemo: Story = {
  render: () => (
    <NavigationProvider config={sampleConfig}>
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Contrast on Different Backgrounds</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {/* Light Background */}
          <div style={{ 
            padding: '2rem', 
            background: '#ffffff', 
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '12px', color: '#666' }}>Light (#fff)</span>
            <NavigationPad variant="default" size="medium" showHome />
          </div>
          
          {/* Gray Background */}
          <div style={{ 
            padding: '2rem', 
            background: '#9e9e9e', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '12px', color: '#fff' }}>Gray (#9e9e9e)</span>
            <NavigationPad variant="default" size="medium" showHome />
          </div>
          
          {/* Dark Background */}
          <div style={{ 
            padding: '2rem', 
            background: '#1a1a2e', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '12px', color: '#aaa' }}>Dark (#1a1a2e)</span>
            <NavigationPad variant="default" size="medium" showHome />
          </div>
          
          {/* Primary Gradient */}
          <div style={{ 
            padding: '2rem', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '12px', color: '#fff' }}>Gradient</span>
            <NavigationPad variant="default" size="medium" showHome />
          </div>
          
          {/* Image-like pattern */}
          <div style={{ 
            padding: '2rem', 
            background: 'repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '12px', color: '#fff' }}>Pattern</span>
            <NavigationPad variant="default" size="medium" showHome />
          </div>
          
          {/* High Contrast on dark */}
          <div style={{ 
            padding: '2rem', 
            background: '#000000', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '12px', color: '#888' }}>Black + High Contrast</span>
            <NavigationPad variant="default" size="medium" showHome highContrast />
          </div>
        </div>
      </div>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Demonstrates NavigationPad visibility on various backgrounds.
The glass morphism effect maintains readability while the high contrast mode 
ensures WCAG AAA compliance for users with visual impairments.`,
      },
    },
  },
};

/**
 * HUD-style navigation pad with dark glass aesthetic.
 * Matches the symbol-grid design with a compact D-pad and center compass.
 */
export const Hud: Story = {
  args: {
    variant: 'hud',
    size: 'medium',
    position: 'inline',
    showHome: true,
    showBack: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: `HUD variant with dark glass styling (rgba(20, 20, 25, 0.95) + blur).
Features a compact 3x3 D-pad with a center compass icon for "go home".
Optionally shows position indicator [x, y] below the pad.

Ideal for spatial/canvas/game interfaces where you want a floating
navigation control that doesn't distract from the main content.`,
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider config={sampleConfig}>
        <div style={{ 
          width: '100%', 
          minHeight: '300px', 
          background: '#14141a', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '2rem',
        }}>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
};

/**
 * HUD variant positioned in bottom-right corner, typical for game interfaces.
 */
export const HudBottomRight: Story = {
  args: {
    variant: 'hud',
    size: 'medium',
    position: 'bottom-right',
    showHome: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'HUD variant fixed in bottom-right corner, typical placement for game/spatial interfaces.',
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider config={sampleConfig}>
        <div style={{ 
          width: '100vw', 
          height: '100vh', 
          position: 'relative', 
          background: '#14141a',
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255,255,255,0.2)',
            fontSize: '24px',
          }}>
            Canvas Content
          </div>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
};

/**
 * All variants including HUD for comparison.
 */
export const AllVariantsWithHud: Story = {
  render: () => (
    <NavigationProvider config={sampleConfig}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2rem', 
        padding: '2rem',
        background: '#14141a',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>Default</h3>
          <NavigationPad variant="default" size="medium" showHome />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>Hints</h3>
          <NavigationPad variant="hints" size="medium" showKeyboardHints showHome />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>Compact</h3>
          <NavigationPad variant="compact" size="medium" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>Expanded</h3>
          <NavigationPad variant="expanded" size="medium" showHome showBack />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>HUD</h3>
          <NavigationPad variant="hud" size="medium" showHome />
        </div>
      </div>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comparison of all variant styles including the new HUD variant.',
      },
    },
  },
};

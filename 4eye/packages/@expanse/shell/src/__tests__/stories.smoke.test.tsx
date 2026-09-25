/**
 * Story Smoke Tests
 * 
 * Automatically test that every Storybook story renders without errors.
 * This ensures all components load correctly and catches basic render issues.
 */

import { describe, it, expect } from 'vitest';
import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';

// Import all story modules
import * as PanelLayoutStories from '../templates/original/PanelLayout.stories';
import * as ComposableLayoutStories from '@expanse/hud/templates/original/ComposableLayout.stories';
import * as ResponsiveLayoutStories from '@expanse/hud/templates/original/ResponsiveLayout.stories';
import * as DocumentationLayoutStories from '@expanse/hud/templates/original/DocumentationLayout.stories';
import * as DashboardLayoutStories from '@expanse/hud/templates/original/DashboardLayout.stories';
import * as MinimalLayoutStories from '@expanse/hud/templates/original/MinimalLayout.stories';
import * as FullScreenLayoutStories from '@expanse/hud/templates/spatial/FullScreenLayout.stories';
import * as TileStories from '@expanse/map/tiles/components/Tile.stories';
import * as NavigationPadStories from '@expanse/hud/hud-components/navigation-pad/components/NavigationPad.stories';
import * as MinimapStories from '@expanse/hud/map-views/minimap/Minimap.stories';
// ScreenOverlay was removed - skipping for now
// import * as ScreenOverlayStories from '../spatial/overlays/ScreenOverlay.stories';
import * as ActionBarStories from '@expanse/hud/hud-components/action-bars/components/ActionBar.stories';
import * as ActionButtonStories from '@expanse/hud/hud-components/action-button/ActionButton.stories';
import * as ActionGroupStories from '@expanse/hud/hud-components/action-group/ActionGroup.stories';
import * as ActionDockStories from '@expanse/hud/hud/docks/ActionDock.stories';
import * as FloatingToolbarStories from '@expanse/hud/hud-components/floating-controls/components/FloatingToolbar.stories';
// Primitives.stories was removed during primitive cleanup.

// Compose stories from each module
const storyModules = {
  'PanelLayout': composeStories(PanelLayoutStories),
  'ComposableLayout': composeStories(ComposableLayoutStories),
  'ResponsiveLayout': composeStories(ResponsiveLayoutStories),
  'DocumentationLayout': composeStories(DocumentationLayoutStories),
  'DashboardLayout': composeStories(DashboardLayoutStories),
  'MinimalLayout': composeStories(MinimalLayoutStories),
  'FullScreenLayout': composeStories(FullScreenLayoutStories),
  'Tile': composeStories(TileStories),
  'NavigationPad': composeStories(NavigationPadStories),
  'Minimap': composeStories(MinimapStories),
  // 'ScreenOverlay': composeStories(ScreenOverlayStories), // Removed
  'ActionBar': composeStories(ActionBarStories),
  'ActionButton': composeStories(ActionButtonStories),
  'ActionGroup': composeStories(ActionGroupStories),
  'ActionDock': composeStories(ActionDockStories),
  'FloatingToolbar': composeStories(FloatingToolbarStories),
};

describe('Story Smoke Tests', () => {
  Object.entries(storyModules).forEach(([moduleName, stories]) => {
    describe(moduleName, () => {
      Object.entries(stories).forEach(([storyName, Story]) => {
        // Skip non-story exports (like default, meta, etc.)
        if (storyName === 'default' || typeof Story !== 'function') {
          return;
        }

        it(`renders ${storyName} without errors`, () => {
          // Should not throw during render
          expect(() => {
            const { container } = render(<Story />);
            expect(container).toBeInTheDocument();
          }).not.toThrow();
        });

        it(`${storyName} creates DOM elements`, () => {
          const { container } = render(<Story />);
          
          // Should have rendered something (not empty)
          expect(container.firstChild).toBeTruthy();
        });
      });
    });
  });
});

describe('Story Coverage Summary', () => {
  it('has loaded all expected story modules', () => {
    const moduleCount = Object.keys(storyModules).length;
    expect(moduleCount).toBeGreaterThanOrEqual(15); // story modules including HUD components
  });

  it('has stories in each module', () => {
    Object.entries(storyModules).forEach(([moduleName, stories]) => {
      const storyKeys = Object.keys(stories) as (keyof typeof stories)[];
      const storyCount = storyKeys.filter(
        key => key !== 'default' && typeof stories[key] === 'function'
      ).length;
      
      expect(storyCount).toBeGreaterThan(0);
    });
  });
});

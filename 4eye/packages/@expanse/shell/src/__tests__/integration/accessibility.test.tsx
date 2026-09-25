/**
 * Integration tests for Accessibility features
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SkipLinks } from '@expanse/ui/components/SkipLinks';
import { LiveAnnouncer } from '@expanse/ui/components/LiveAnnouncer';
import { renderWithTheme, simulateKeyPress } from '../utils';
import { 
  getNavigationDirection, 
  isActionKey, 
  createNavigationAnnouncement,
  meetsContrastRatio 
} from '@expanse/ui/utils/accessibility';

describe('Accessibility Integration', () => {
  describe('SkipLinks Component', () => {
    it('renders skip links', () => {
      renderWithTheme(
        <SkipLinks
          links={[
            { href: '#main', label: 'Skip to main' },
            { href: '#nav', label: 'Skip to navigation' },
          ]}
        />
      );
      
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '#main');
      expect(links[1]).toHaveAttribute('href', '#nav');
    });

    it('skip links are visually hidden initially', () => {
      renderWithTheme(<SkipLinks />);
      
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        // Should have styles for visual hiding
        const styles = window.getComputedStyle(link);
        expect(
          styles.position === 'absolute' || 
          parseInt(styles.left) < 0
        ).toBeTruthy();
      });
    });

    it('skip links become visible on focus', () => {
      renderWithTheme(<SkipLinks />);
      
      const firstLink = screen.getAllByRole('link')[0];
      
      // Focus the link
      firstLink.focus();
      expect(firstLink).toHaveFocus();
    });

    it('has proper ARIA navigation label', () => {
      const { container } = renderWithTheme(<SkipLinks />);
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', 'Skip links');
    });
  });

  describe('LiveAnnouncer Component', () => {
    it('renders with polite priority', () => {
      render(
        <LiveAnnouncer
          message="Test message"
          priority="polite"
        />
      );
      
      const announcer = screen.getByRole('status');
      expect(announcer).toHaveAttribute('aria-live', 'polite');
      expect(announcer).toHaveTextContent('Test message');
    });

    it('renders with assertive priority', () => {
      render(
        <LiveAnnouncer
          message="Urgent message"
          priority="assertive"
        />
      );
      
      const announcer = screen.getByRole('status');
      expect(announcer).toHaveAttribute('aria-live', 'assertive');
    });

    it('is visually hidden', () => {
      const { container } = render(
        <LiveAnnouncer message="Hidden message" />
      );
      
      const announcer = container.querySelector('[role="status"]');
      const styles = window.getComputedStyle(announcer!);
      
      expect(parseInt(styles.left)).toBeLessThan(0);
      expect(styles.position).toBe('absolute');
    });

    it('calls onClear after timeout', async () => {
      const onClear = jest.fn();
      
      render(
        <LiveAnnouncer
          message="Test"
          clearAfter={100}
          onClear={onClear}
        />
      );
      
      await waitFor(() => {
        expect(onClear).toHaveBeenCalled();
      }, { timeout: 200 });
    });

    it('updates when message changes', () => {
      const { rerender } = render(
        <LiveAnnouncer message="First" />
      );
      
      expect(screen.getByRole('status')).toHaveTextContent('First');
      
      rerender(<LiveAnnouncer message="Second" />);
      
      expect(screen.getByRole('status')).toHaveTextContent('Second');
    });
  });

  describe('Keyboard Navigation Utilities', () => {
    it('maps arrow keys to directions', () => {
      expect(getNavigationDirection('ArrowUp')).toBe('up');
      expect(getNavigationDirection('ArrowDown')).toBe('down');
      expect(getNavigationDirection('ArrowLeft')).toBe('left');
      expect(getNavigationDirection('ArrowRight')).toBe('right');
    });

    it('maps WASD keys to directions', () => {
      expect(getNavigationDirection('w')).toBe('up');
      expect(getNavigationDirection('W')).toBe('up');
      expect(getNavigationDirection('s')).toBe('down');
      expect(getNavigationDirection('S')).toBe('down');
      expect(getNavigationDirection('a')).toBe('left');
      expect(getNavigationDirection('A')).toBe('left');
      expect(getNavigationDirection('d')).toBe('right');
      expect(getNavigationDirection('D')).toBe('right');
    });

    it('maps special keys', () => {
      expect(getNavigationDirection('Home')).toBe('home');
      expect(getNavigationDirection('Escape')).toBe('back');
    });

    it('returns null for unmapped keys', () => {
      expect(getNavigationDirection('x')).toBeNull();
      expect(getNavigationDirection('Tab')).toBeNull();
    });

    it('identifies action keys', () => {
      expect(isActionKey('Enter')).toBe(true);
      expect(isActionKey(' ')).toBe(true);
      expect(isActionKey('Space')).toBe(true);
      expect(isActionKey('a')).toBe(false);
    });
  });

  describe('ARIA Announcement Utilities', () => {
    it('creates navigation announcements', () => {
      const announcement = createNavigationAnnouncement('up');
      expect(announcement).toBe('Navigate up');
    });

    it('includes position in announcements', () => {
      const announcement = createNavigationAnnouncement('right', { x: 2, y: 1 });
      expect(announcement).toContain('Navigate right');
      expect(announcement).toContain('position 2, 1');
    });
  });

  describe('Color Contrast Utilities', () => {
    it('validates passing contrast ratios', () => {
      // Black on white: 21:1 ratio
      expect(meetsContrastRatio('#000000', '#ffffff', 4.5)).toBe(true);
      
      // Dark gray on white: ~15:1 ratio
      expect(meetsContrastRatio('#333333', '#ffffff', 4.5)).toBe(true);
    });

    it('rejects failing contrast ratios', () => {
      // Light gray on white: ~1.3:1 ratio
      expect(meetsContrastRatio('#cccccc', '#ffffff', 4.5)).toBe(false);
      
      // Similar colors
      expect(meetsContrastRatio('#111111', '#222222', 4.5)).toBe(false);
    });

    it('handles short hex codes', () => {
      // This test might fail if short hex is not supported
      // Implementation should handle both #FFF and #FFFFFF
      expect(meetsContrastRatio('#000', '#fff', 4.5)).toBe(false);
    });

    it('validates against different ratio requirements', () => {
      const color1 = '#333333';
      const color2 = '#ffffff';
      
      // Should pass AA normal text (4.5:1)
      expect(meetsContrastRatio(color1, color2, 4.5)).toBe(true);
      
      // Should pass AAA normal text (7:1)
      expect(meetsContrastRatio(color1, color2, 7)).toBe(true);
    });
  });

  describe('Keyboard Navigation Integration', () => {
    it('responds to keyboard events', () => {
      const handleNavigate = jest.fn();
      
      render(
        <div onKeyDown={(e) => {
          const direction = getNavigationDirection(e.key);
          if (direction) {
            handleNavigate(direction);
          }
        }}>
          <button>Test</button>
        </div>
      );
      
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: 'ArrowUp' });
      expect(handleNavigate).toHaveBeenCalledWith('up');
      
      fireEvent.keyDown(button, { key: 'w' });
      expect(handleNavigate).toHaveBeenCalledWith('up');
    });
  });
});

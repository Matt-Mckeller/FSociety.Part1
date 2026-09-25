'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface WireframeSection {
  id: string;
  name: string;
  height: 'small' | 'medium' | 'large' | 'xlarge';
  color: string;
  enabled: boolean;
  content?: string;
}

export interface WireframeConfig {
  pageName: string;
  sections: WireframeSection[];
}

interface WireframeContextType {
  config: WireframeConfig;
  sections: WireframeSection[];
  toggleSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  setSections: (sections: WireframeSection[]) => void;
}

// ============================================================================
// Context
// ============================================================================

const WireframeContext = createContext<WireframeContextType | null>(null);

export function useWireframe() {
  const context = useContext(WireframeContext);
  if (!context) {
    throw new Error('useWireframe must be used within a WireframeProvider');
  }
  return context;
}

// ============================================================================
// Provider
// ============================================================================

interface WireframeProviderProps {
  children: ReactNode;
  initialConfig: WireframeConfig;
}

export function WireframeProvider({ children, initialConfig }: WireframeProviderProps) {
  const [sections, setSections] = useState<WireframeSection[]>(initialConfig.sections);

  const toggleSection = (id: string) => {
    setSections(prev => 
      prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    );
  };

  const reorderSections = (fromIndex: number, toIndex: number) => {
    setSections(prev => {
      const result = [...prev];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  return (
    <WireframeContext.Provider 
      value={{ 
        config: { ...initialConfig, sections }, 
        sections, 
        toggleSection, 
        reorderSections,
        setSections,
      }}
    >
      {children}
    </WireframeContext.Provider>
  );
}

// ============================================================================
// Default Configs
// ============================================================================

export const homepageWireframeConfig: WireframeConfig = {
  pageName: 'Homepage',
  sections: [
    { id: 'nav', name: 'Navigation Bar', height: 'small', color: '#1e293b', enabled: true, content: 'Logo • Features • Pricing • About • Contact • CTA' },
    { id: 'hero', name: 'Hero Section', height: 'xlarge', color: '#3b82f6', enabled: true, content: 'Headline + Subheadline + CTAs + Hero Image' },
    { id: 'logos', name: 'Logo Bar', height: 'small', color: '#64748b', enabled: true, content: 'Trusted by: Logo • Logo • Logo • Logo • Logo' },
    { id: 'features', name: 'Features Overview', height: 'large', color: '#8b5cf6', enabled: true, content: '3-4 Feature Cards with Icons' },
    { id: 'howItWorks', name: 'How It Works', height: 'medium', color: '#10b981', enabled: true, content: 'Step 1 → Step 2 → Step 3' },
    { id: 'testimonials', name: 'Testimonials', height: 'medium', color: '#f59e0b', enabled: true, content: 'Quote Cards or Carousel' },
    { id: 'cta', name: 'Final CTA', height: 'medium', color: '#ec4899', enabled: true, content: 'Compelling CTA + Button' },
    { id: 'footer', name: 'Footer', height: 'medium', color: '#334155', enabled: true, content: 'Links • Social • Legal • Copyright' },
  ],
};

export const featuresPageWireframeConfig: WireframeConfig = {
  pageName: 'Features',
  sections: [
    { id: 'nav', name: 'Navigation Bar', height: 'small', color: '#1e293b', enabled: true },
    { id: 'hero', name: 'Feature Hero', height: 'large', color: '#3b82f6', enabled: true, content: 'Page Title + Overview' },
    { id: 'grid', name: 'Feature Grid', height: 'xlarge', color: '#8b5cf6', enabled: true, content: '6-12 Features with Icons' },
    { id: 'deep1', name: 'Feature Deep Dive 1', height: 'large', color: '#10b981', enabled: true, content: 'Image + Description + Benefits' },
    { id: 'deep2', name: 'Feature Deep Dive 2', height: 'large', color: '#06b6d4', enabled: true, content: 'Image + Description + Benefits' },
    { id: 'integrations', name: 'Integrations', height: 'medium', color: '#f59e0b', enabled: true, content: 'Integration Logos Grid' },
    { id: 'cta', name: 'CTA Section', height: 'medium', color: '#ec4899', enabled: true },
    { id: 'footer', name: 'Footer', height: 'medium', color: '#334155', enabled: true },
  ],
};

export const pricingPageWireframeConfig: WireframeConfig = {
  pageName: 'Pricing',
  sections: [
    { id: 'nav', name: 'Navigation Bar', height: 'small', color: '#1e293b', enabled: true },
    { id: 'hero', name: 'Pricing Header', height: 'medium', color: '#3b82f6', enabled: true, content: 'Title + Monthly/Annual Toggle' },
    { id: 'cards', name: 'Pricing Cards', height: 'xlarge', color: '#10b981', enabled: true, content: 'Starter • Pro • Enterprise' },
    { id: 'comparison', name: 'Feature Comparison', height: 'xlarge', color: '#8b5cf6', enabled: true, content: 'Comparison Table' },
    { id: 'faq', name: 'FAQ Section', height: 'large', color: '#f59e0b', enabled: true, content: 'Common Questions' },
    { id: 'enterprise', name: 'Enterprise CTA', height: 'medium', color: '#ec4899', enabled: true, content: 'Contact Sales' },
    { id: 'footer', name: 'Footer', height: 'medium', color: '#334155', enabled: true },
  ],
};

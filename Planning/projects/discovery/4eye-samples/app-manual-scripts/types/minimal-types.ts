


interface VisualizationSuggestion {
  id: string;
  type: VisualizationType;
  title: string;
  description: string;                   // Why this visualization would help
  priority: 'low' | 'medium' | 'high' | 'critical';
  
  // What would be visualized
  conceptToVisualize: string;
  suggestedContent?: string;             // Prompt/description for generation
  
  // Animation & Interaction
  suggestedAnimations?: AnimationStyle[];
  suggestedInteractions?: InteractionType[];
  autoPlay?: boolean;
  loopAnimation?: boolean;
  
  // Technical specs
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
  estimatedGenerationTime?: number;      // Seconds
  requiresInteractivity?: boolean;
  
  // Learning effectiveness
  bestForModalities?: LearningModality[]; // Which learning styles benefit most
  cognitiveLoad?: 'low' | 'medium' | 'high'; // Mental effort required
  
  // Example structure (for HTML/SVG)
  exampleStructure?: string;             // Pseudo-code or description
  templateId?: string;                   // Reference to reusable template
}
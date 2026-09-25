
/*
Input Requirements
- Dialog with timestamps

Optional Requirements
- Previous dialog context

Todo: Allow for planning steps in the generation output
Todo: Determine whether the prompt should have a planning approach or direct generation approach and 
the timing expectations for processing these and the impact on latency and quality
*/

import type { VisualizationType } from "./enums.ts";

export interface VisualizationSuggestionMinimal {
    id: string;
    type: VisualizationType;
    title: string;
    description: string;                   // Why this visualization would help
    conceptToVisualize: string;
}



export interface MinimalDialogInput {
  // Core Content
  transcriptions: { text: string; timestamp: number; confidence: number; }[];
}

interface ExampleDialogInput_v2 {
  // Core Content
  transcriptions: { text: string; timestamp: number; }[];
  // alternatives, confidence score
  // other metadata
}
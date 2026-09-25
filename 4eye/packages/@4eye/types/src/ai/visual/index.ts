/**
 * Visual observe claims. Frame refs stay with the producer; this is what
 * the model said it saw.
 */

export interface VisualFrameRef {
  id: string;
  uri?: string;
}

export interface VisualObserveResult {
  frame: VisualFrameRef;
  claims: {
    color?: string;
    shape?: string;
    count: number;
    flying: boolean;
    occluded: boolean;
  };
}

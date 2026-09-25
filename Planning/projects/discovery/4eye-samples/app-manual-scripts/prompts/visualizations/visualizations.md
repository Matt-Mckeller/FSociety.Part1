if (coreType.includes('MERMAID')) {
  html = generateMermaidTemplate(viz, sample.metadata);
} else if (coreType.includes('INTERACTIVE')) {
  html = generateInteractiveTemplate(viz, sample.metadata);  // ← This matched
} else {
  html = generateGenericTemplate(viz, sample.metadata);
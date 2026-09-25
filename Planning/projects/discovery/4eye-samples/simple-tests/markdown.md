

```typescript
interface WhisperTransformersJsResult {
  text: string;              // Full transcript
  chunks: ChunkTimestamp[];  // Time-segmented transcript
}

interface ChunkTimestamp {
  text: string;      // Text for this chunk
  timestamp: [number, number | null];  // [start, end] in seconds
}

// Input: 3-minute classroom audio about fractions

const result = await transcriber(audioBlob);

console.log(result);
// Output:
{
  text: "Alright class, today we're going to learn about fractions. Who can tell me what a fraction is? It's like when you cut something into pieces? Yes, exactly. A fraction shows us parts of a whole.",
  
  chunks: [
    {
      text: " Alright class, today we're going to learn about fractions.",
      timestamp: [0, 4.5]
    },
    {
      text: " Who can tell me what a fraction is?",
      timestamp: [4.5, 7.2]
    },
    {
      text: " It's like when you cut something into pieces?",
      timestamp: [7.2, 10.8]
    },
    {
      text: " Yes, exactly.",
      timestamp: [10.8, 12.1]
    },
    {
      text: " A fraction shows us parts of a whole.",
      timestamp: [12.1, 15.6]
    }
  ]
}
```
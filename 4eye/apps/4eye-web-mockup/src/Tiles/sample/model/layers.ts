export interface SampleCard {
  title: string;
  body: string;
}

export interface SampleLayer {
  id: string;
  index: number;
  label: string;
  tagline: string;
  /** Base color — used for tile backgrounds and fills. */
  color: string;
  /** Bright display variant — used for text, glows, and selection outlines on dark bg. */
  accentColor: string;
  cards: SampleCard[];
}

export const SAMPLE_LAYERS: SampleLayer[] = [
  {
    id: "aion",
    index: 1,
    label: "AION",
    tagline: "Full Dive Systems, the epitomy of Learning & Engagement.",
    color: "#0d1b6e",
    accentColor: "#8b9cf4",
    cards: [
      {
        title: "Core Intelligence",
        body: "Transformer-based inference substrate operating at the edge with persistent context across sessions. Provides the foundational reasoning layer all higher integrations route through.",
      },
      {
        title: "Neural Memory",
        body: "Episodic and semantic memory banks enable long-term knowledge retention across interaction sessions. Hierarchical compression maintains recall fidelity without unbounded storage growth.",
      },
      {
        title: "Orchestration Engine",
        body: "Dynamic routing distributes inference workloads across specialized model endpoints based on task type and latency constraints. Handles fallback, retry, and load balancing transparently.",
      },
      {
        title: "Protocol Interface",
        body: "Standardized API surface exposes AION capabilities to every upstream integration via a versioned contract. Schema evolution is backward-compatible across all registered integration layers.",
      },
    ],
  },
  {
    id: "brainwave",
    index: 2,
    label: "AI brainwave Integrations",
    tagline: "Direct neural interface bridging cognition and compute",
    color: "#1a237e",
    accentColor: "#9fa8da",
    cards: [
      {
        title: "Signal Processing",
        body: "Sub-millisecond neural signal decoding from electrode arrays with adaptive noise cancellation tuned per user. Raw spike trains are filtered, sorted, and structured before reaching AION.",
      },
      {
        title: "Cognitive Mapping",
        body: "Real-time translation of motor intention and semantic thought patterns into structured intent objects. Continuous calibration adapts to neural drift without interrupting active sessions.",
      },
      {
        title: "Latency Pipeline",
        body: "End-to-end roundtrip from neural intent to downstream actuator response targeting sub-10ms via on-device inference. Critical paths bypass cloud routing entirely.",
      },
      {
        title: "Privacy Sandboxing",
        body: "Federated signal processing ensures raw electrode data never leaves the user's personal compute boundary. Only high-level intent vectors are transmitted, with user-controlled retention windows.",
      },
    ],
  },
  {
    id: "robot",
    index: 3,
    label: "Robot Integrations",
    tagline: "Embodied AI systems connecting physical and digital worlds",
    color: "#1565c0",
    accentColor: "#90caf9",
    cards: [
      {
        title: "Actuator Control",
        body: "Closed-loop motor control runs at 1 kHz feedback with torque and position feedback per joint. AION inference updates motion plans at 30 Hz while the low-level loop executes independently.",
      },
      {
        title: "Sensor Fusion",
        body: "Multimodal fusion of LiDAR, stereo camera, tactile, and proprioceptive streams into a unified spatial representation. Sensor dropout is handled gracefully via learned imputation.",
      },
      {
        title: "Spatial Awareness",
        body: "Real-time 3D occupancy mapping with dynamic obstacle avoidance maintains human-safe operating margins. Scene graphs are updated continuously and shared back to the visual observability layer.",
      },
      {
        title: "Task Orchestration",
        body: "Hierarchical task decomposition breaks high-level goals into motion primitives with online replanning under uncertainty. AION provides goal interpretation; the robot closes the execution loop.",
      },
    ],
  },
  {
    id: "glasses",
    index: 4,
    label: "AI Glasses Integrations",
    tagline: "Augmented reality overlay for real-time ambient intelligence",
    color: "#1976d2",
    accentColor: "#64b5f6",
    cards: [
      {
        title: "Scene Recognition",
        body: "30 fps ambient scene understanding with sub-100ms annotation overlay latency on waveguide displays. Object identity, spatial relationships, and text are extracted and ranked by relevance.",
      },
      {
        title: "AR Rendering Pipeline",
        body: "Waveguide-optimized rendering maintains 90-nit display brightness across mixed lighting conditions. Depth-correct occlusion keeps overlays visually grounded to real-world geometry.",
      },
      {
        title: "Ambient Context",
        body: "Passive context inference from the current field of view surfaces relevant information proactively — without explicit queries. Intent prediction reduces latency from question to answer to near-zero.",
      },
      {
        title: "Gesture Input",
        body: "Hand tracking and micro-gesture recognition enable touchless UI navigation without dedicated IMU hardware. A library of 48 gestures can be composed and remapped per user profile.",
      },
    ],
  },
  {
    id: "visual",
    index: 5,
    label: "AI Visual Observability Integrations",
    tagline: "Visual telemetry streams for multimodal situational awareness",
    color: "#0288d1",
    accentColor: "#4fc3f7",
    cards: [
      {
        title: "Frame Capture",
        body: "Multi-stream video ingestion at up to 4K60 with hardware-accelerated preprocessing and adaptive bitrate selection. Capture fidelity scales automatically with available compute and bandwidth.",
      },
      {
        title: "Object Detection",
        body: "Real-time detection and tracking across 1,000+ object classes with temporal consistency linking across frame boundaries. Confidence scores and bounding boxes are emitted as structured events.",
      },
      {
        title: "Anomaly Flagging",
        body: "Statistical deviation detection compares live frame streams against learned baseline behaviors. Flagged events include a confidence score, causal trace, and timestamp for downstream audit.",
      },
      {
        title: "Visual Dashboards",
        body: "Live telemetry compositing surfaces key visual events in configurable dashboards with retention policies per channel. Alerts route to audio and chat integration layers for multi-modal delivery.",
      },
    ],
  },
  {
    id: "audio",
    index: 6,
    label: "AI Audio Observability Integrations",
    tagline: "Real-time audio analysis and acoustic signal intelligence",
    color: "#00838f",
    accentColor: "#4dd0e1",
    cards: [
      {
        title: "Voice Transcription",
        body: "Streaming ASR with sub-word timestamps, speaker diarization, and domain adaptation for technical vocabulary. Transcripts are structured and forwarded to AION for semantic processing.",
      },
      {
        title: "Acoustic Fingerprinting",
        body: "Ambient sound classification runs against a library of 500+ environmental signatures with temporal event linking. Novel signatures trigger unsupervised clustering and are flagged for human review.",
      },
      {
        title: "Sentiment Analysis",
        body: "Real-time tone and emotional state inference from prosodic features operates independently of transcription quality. Valence and arousal vectors are streamed to the chat integration layer.",
      },
      {
        title: "Noise Filtering",
        body: "Beamforming and spectral subtraction maintain speech intelligibility to 85 dB SNR in open environments. Adaptive filters retrain per session from detected noise floor baselines.",
      },
    ],
  },
  {
    id: "chat",
    index: 7,
    label: "AI Chat",
    tagline: "Conversational interface layer for human-AI interaction",
    color: "#26c6da",
    accentColor: "#80deea",
    cards: [
      {
        title: "Dialogue Management",
        body: "Multi-turn conversation engine maintains persona-consistent tone and topic threading across arbitrarily long sessions. Intent disambiguation routes ambiguous inputs to clarification flows before AION processing.",
      },
      {
        title: "Context Window",
        body: "Effective 1M-token context is maintained via hierarchical summarization, enabling indefinite session memory without truncation artifacts. Critical moments are pinned and never summarized away.",
      },
      {
        title: "Persona Tuning",
        body: "Fine-tuned character configurations adapt communication style, verbosity, and domain emphasis to user preferences. Persona parameters are versioned and can be A/B tested across cohorts.",
      },
      {
        title: "Multi-turn Memory",
        body: "Cross-session conversation memory persists user preferences, facts, and commitments with user-controlled retention and selective forgetting. Memory edits are surfaced transparently in the UI.",
      },
    ],
  },
];

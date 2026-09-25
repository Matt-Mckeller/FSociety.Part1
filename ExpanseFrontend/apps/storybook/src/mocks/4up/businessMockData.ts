/**
 * Mock data for Business Feature component stories
 * 
 * Note: Using inline objects for mock data flexibility.
 * These mocks are designed for Storybook visualization.
 */

// ═══════════════════════════════════════════════════════════════
// BUSINESS PROFILE
// ═══════════════════════════════════════════════════════════════

export const mockBusinessProfile = {
  id: 'biz-demo-001',
  businessId: 'biz-demo-001',
  name: '4up',
  tagline: 'AI-orchestrated marketing that takes your business to the next level',
  description: '4up is an AI-powered marketing automation platform that helps businesses create, schedule, and optimize their social media content across all platforms.',
  industry: 'Marketing Technology',
  industrySubcategory: 'Content Marketing Automation',
  website: 'https://4up.io',
  foundedYear: 2024,
  companySize: 'small' as const,
  headquarters: 'Chicago, IL',
  markets: ['North America', 'Europe'],
  businessModel: 'saas',
  revenueModel: 'subscription',
  stage: 'mvp' as const,
};

// ═══════════════════════════════════════════════════════════════
// BRAND VOICE
// ═══════════════════════════════════════════════════════════════

export const mockBrandVoice = {
  id: 'voice-demo-001',
  businessId: 'biz-demo-001',
  formality: 'casual' as const,
  tone: {
    primaryTone: 'friendly',
    secondaryTones: ['confident', 'innovative'],
    emojiUsage: 'moderate' as const,
    hashtagStyle: 'minimal' as const,
    ctaStyle: 'direct' as const,
    sentenceLength: 'medium' as const,
  },
  personality: {
    traits: ['approachable', 'expert', 'innovative', 'supportive'],
    values: ['excellence', 'innovation', 'transparency'],
    archetypes: ['The Expert', 'The Innovator'],
  },
  vocabulary: {
    preferredPhrases: ['Let\'s build', 'Level up', 'Supercharge'],
    avoidTerms: ['utilize', 'leverage', 'synergy', 'paradigm'],
    industryTerms: ['AI', 'automation', 'content strategy', 'engagement'],
    competitorTerms: ['Hootsuite', 'Buffer', 'Sprout Social'],
  },
  doExamples: [
    'We say "Let\'s build" not "Contact us"',
    'We use clear, action-oriented language',
    'We include helpful tips and insights',
  ],
  dontExamples: [
    'We don\'t say "utilize" or "leverage"',
    'We avoid corporate jargon',
    'We never use overly formal language',
  ],
  samplePosts: [
    {
      content: '🚀 Just shipped our new AI content generator! It\'s like having a marketing team in your pocket. What would you create first?',
      platform: 'twitter',
      whyGood: 'Engaging, conversational, uses emoji appropriately',
    },
    {
      content: 'Marketing doesn\'t have to be complicated. Our platform makes it easy to create, schedule, and optimize your content—all in one place.',
      platform: 'linkedin',
      whyGood: 'Clear value proposition, professional yet approachable',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// COMPANY GOALS
// ═══════════════════════════════════════════════════════════════

export const mockCompanyGoals = {
  id: 'goals-demo-001',
  businessId: 'biz-demo-001',
  strategic: [
    { goal: 'Become the go-to AI marketing platform for SMBs', weight: 10, timeframe: 'long' as const },
    { goal: 'Reach $10M ARR', weight: 9, timeframe: 'medium' as const },
    { goal: 'Expand to European markets', weight: 7, timeframe: 'medium' as const },
  ],
  tactical: [
    { goal: 'Launch v2.0 with advanced AI features', weight: 9, timeframe: 'short' as const },
    { goal: 'Grow to 1000 paying customers', weight: 8, timeframe: 'short' as const },
  ],
  contentGoals: [
    { goal: 'Build thought leadership in AI marketing', weight: 9, metrics: ['Social engagement', 'Newsletter signups'] },
    { goal: 'Drive product demo requests', weight: 8, metrics: ['Demo requests', 'Trial signups'] },
    { goal: 'Educate audience on AI marketing benefits', weight: 7, metrics: ['Content shares', 'Time on page'] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// COMPANY PURPOSE
// ═══════════════════════════════════════════════════════════════

export const mockCompanyPurpose = {
  id: 'purpose-demo-001',
  businessId: 'biz-demo-001',
  mission: 'Empower businesses to grow through innovative AI-powered marketing tools.',
  vision: 'A world where every business has access to enterprise-grade marketing automation.',
  tagline: 'Build. Scale. Win.',
  coreThemes: [
    { purpose: 'Improve', weight: 10, subThemes: ['Learning', 'Progression', 'Growth'] },
    { purpose: 'Innovate', weight: 9, subThemes: ['Technology', 'AI', 'Automation'] },
    { purpose: 'Win', weight: 8, subThemes: ['Competition', 'Success', 'Achievement'] },
  ],
  secondaryThemes: [
    { purpose: 'Connect', weight: 6, subThemes: ['Community', 'Relationships'] },
  ],
  values: [
    { name: 'Excellence', description: 'We never settle for good enough', weight: 9 },
    { name: 'Innovation', description: 'We embrace new ideas and technologies', weight: 9 },
    { name: 'Transparency', description: 'We communicate openly and honestly', weight: 8 },
  ],
  purposeGoals: [
    { goal: 'Help 10,000 businesses automate their marketing', category: 'customer' as const, weight: 10 },
    { goal: 'Reduce time spent on content creation by 80%', category: 'customer' as const, weight: 9 },
    { goal: 'Set the standard for AI-powered marketing', category: 'industry' as const, weight: 8 },
  ],
};

// ═══════════════════════════════════════════════════════════════
// PAIN POINTS
// ═══════════════════════════════════════════════════════════════

export const mockPainPoints = [
  {
    id: 'pain-001',
    businessId: 'biz-demo-001',
    title: 'No time for consistent content creation',
    description: 'Businesses struggle to maintain a consistent posting schedule across multiple platforms.',
    severity: 'critical' as const,
    category: 'time' as const,
    contentAngle: 'Emphasize automation and time savings',
  },
  {
    id: 'pain-002',
    businessId: 'biz-demo-001',
    title: 'Too many disconnected tools',
    description: 'Marketing teams use multiple tools that don\'t integrate well together.',
    severity: 'high' as const,
    category: 'complexity' as const,
    contentAngle: 'Highlight all-in-one platform benefits',
  },
  {
    id: 'pain-003',
    businessId: 'biz-demo-001',
    title: 'Expensive agency fees',
    description: 'Hiring agencies for content creation is costly for small businesses.',
    severity: 'high' as const,
    category: 'cost' as const,
    contentAngle: 'Show cost comparison with DIY AI approach',
  },
  {
    id: 'pain-004',
    businessId: 'biz-demo-001',
    title: 'Difficulty measuring ROI',
    description: 'Hard to track which content drives actual business results.',
    severity: 'medium' as const,
    category: 'capability' as const,
    contentAngle: 'Feature analytics and attribution capabilities',
  },
  {
    id: 'pain-005',
    businessId: 'biz-demo-001',
    title: 'Keeping up with algorithm changes',
    description: 'Platforms constantly change their algorithms affecting content reach.',
    severity: 'medium' as const,
    category: 'risk' as const,
    contentAngle: 'AI adapts to platform changes automatically',
  },
];

// ═══════════════════════════════════════════════════════════════
// BRAND THEMES
// ═══════════════════════════════════════════════════════════════

export const mockBrandTheme = {
  id: 'theme-demo-001',
  businessId: 'biz-demo-001',
  coreThemes: [
    {
      name: 'Improve',
      description: 'Continuous growth and self-improvement',
      keywords: ['Learning', 'Progression', 'Growth', 'Development', 'Advancement'],
      weight: 10,
    },
    {
      name: 'Innovate',
      description: 'Embracing new ideas and technology',
      keywords: ['Technology', 'AI', 'Automation', 'Future', 'Cutting-edge'],
      weight: 9,
    },
    {
      name: 'Win',
      description: 'Achieving success and beating the competition',
      keywords: ['Competition', 'Success', 'Achievement', 'Victory', 'Results'],
      weight: 8,
    },
  ],
  secondaryThemes: [
    {
      name: 'Connect',
      description: 'Building meaningful relationships',
      keywords: ['Community', 'Relationships', 'Network', 'Collaboration'],
      weight: 6,
    },
    {
      name: 'Simplify',
      description: 'Making complex things simple',
      keywords: ['Easy', 'Streamlined', 'Effortless', 'Intuitive'],
      weight: 5,
    },
  ],
  visualConcepts: [
    { concept: 'Progression', application: 'Show growth from small to large' },
    { concept: 'Expanding', application: 'Use outward-moving animations' },
  ],
  motifs: ['Upward arrows', 'Growth curves', 'Connected nodes'],
  symbols: ['Rocket', 'Chart', 'Lightning bolt'],
};

// ═══════════════════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════

export const mockDesignSystem = {
  id: 'design-demo-001',
  businessId: 'biz-demo-001',
  tastePreferences: ['Modern', 'Clean', 'Bold', 'Tech-forward'],
  culturalAssociations: ['SaaS', 'Gaming', 'Fintech'],
  symbols: ['Rocket', 'Chart Up', 'Lightning', 'Arrow'],
  symbolsDetailed: [
    {
      name: 'Rocket',
      shapeType: 'icon' as const,
      priority: 1 as const,
      primaryUse: 'Launch and growth metaphors',
      variations: ['Simple outline', 'Filled', 'With trail'],
      usageTags: [{ type: 'hero' }, { type: 'accent' }],
    },
    {
      name: 'Chart Up',
      shapeType: 'icon' as const,
      priority: 2 as const,
      primaryUse: 'Success and growth metrics',
      variations: ['Line chart', 'Bar chart'],
      usageTags: [{ type: 'data' }, { type: 'success' }],
    },
  ],
  numbers: [
    { value: 3, meaning: 'Groups of 3 items' },
    { value: 4, meaning: 'Grid layouts' },
  ],
  motionDirections: [
    { direction: 'Up and right', meaning: 'Progress and growth' },
  ],
  visualConcepts: ['Growth', 'Connection', 'Innovation'],
};

// ═══════════════════════════════════════════════════════════════
// BUSINESS STORIES
// ═══════════════════════════════════════════════════════════════

export const mockStories = [
  {
    id: 'story-001',
    businessId: 'biz-demo-001',
    title: 'How We Started',
    type: 'origin' as const,
    narrative: 'Our founders were frustrated with the time it took to create marketing content. They built a simple tool for themselves, and before long, friends and colleagues wanted to use it too.',
    message: 'Great solutions come from real problems',
    weight: 10,
    purpose: 'inspire' as const,
    intent: 'emotion' as const,
    usageContext: 'all' as const,
    emotionalTone: 'inspiring' as const,
    isPublic: true,
  },
  {
    id: 'story-002',
    businessId: 'biz-demo-001',
    title: 'Acme Corp Success',
    type: 'customer_success' as const,
    narrative: 'Acme Corp was struggling to maintain a consistent social presence. After implementing 4up, they saw their engagement increase by 10x within 3 months.',
    message: 'Real results from real businesses',
    weight: 9,
    purpose: 'sell' as const,
    intent: 'action' as const,
    usageContext: 'sales' as const,
    emotionalTone: 'triumphant' as const,
    isPublic: true,
  },
  {
    id: 'story-003',
    businessId: 'biz-demo-001',
    title: 'The AI Breakthrough',
    type: 'product' as const,
    narrative: 'After months of experimentation, our team finally achieved the perfect balance between AI efficiency and human creativity.',
    message: 'Innovation through persistence',
    weight: 8,
    purpose: 'educate' as const,
    intent: 'perception' as const,
    usageContext: 'website' as const,
    emotionalTone: 'authentic' as const,
    isPublic: true,
  },
];

// ═══════════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════════

export const mockTestimonials = [
  {
    id: 'testimonial-001',
    businessId: 'biz-demo-001',
    author: 'Sarah Johnson',
    authorRole: 'Marketing Director',
    authorCompany: 'TechStart Inc',
    authorImage: '',
    narrative: '4up has completely transformed how we approach content marketing. What used to take our team a full week now takes just a few hours.',
    rating: 5,
    weight: 10,
    source: 'g2' as const,
    isVerified: true,
    isPublic: true,
  },
  {
    id: 'testimonial-002',
    businessId: 'biz-demo-001',
    author: 'Mike Chen',
    authorRole: 'Founder',
    authorCompany: 'GrowthLab',
    narrative: 'As a solo founder, I couldn\'t afford a marketing team. 4up gave me the ability to maintain a professional social presence without breaking the bank.',
    rating: 5,
    weight: 9,
    source: 'direct' as const,
    isVerified: true,
    isPublic: true,
  },
  {
    id: 'testimonial-003',
    businessId: 'biz-demo-001',
    author: 'Emily Rodriguez',
    authorRole: 'CMO',
    authorCompany: 'ScaleUp Co',
    narrative: 'The AI suggestions are spot-on. It\'s like having a marketing consultant available 24/7.',
    rating: 4,
    weight: 8,
    source: 'linkedin' as const,
    isVerified: false,
    isPublic: true,
  },
];

// ═══════════════════════════════════════════════════════════════
// RESEARCH & STATISTICS
// ═══════════════════════════════════════════════════════════════

export const mockStatistics = [
  {
    id: 'stat-001',
    businessId: 'biz-demo-001',
    title: 'Content Marketing Market Size',
    value: '$600B',
    category: 'market_size' as const,
    source: 'Industry Report 2024',
    sourceUrl: 'https://example.com/report',
    confidence: 'verified' as const,
    contentRelevance: 10,
    usageContext: 'all' as const,
  },
  {
    id: 'stat-002',
    businessId: 'biz-demo-001',
    title: 'AI Adoption in Marketing',
    value: '72%',
    category: 'industry_trend' as const,
    source: 'Marketing AI Survey',
    confidence: 'verified' as const,
    contentRelevance: 9,
    usageContext: 'social' as const,
  },
  {
    id: 'stat-003',
    businessId: 'biz-demo-001',
    title: 'Time Saved with AI Content',
    value: '80%',
    category: 'roi_proof' as const,
    source: 'Customer Survey',
    confidence: 'verified' as const,
    contentRelevance: 10,
    usageContext: 'sales' as const,
  },
  {
    id: 'stat-004',
    businessId: 'biz-demo-001',
    title: 'AI marketing automation',
    value: '12,100 searches/mo',
    category: 'seo_keyword' as const,
    source: 'Keyword Tool',
    confidence: 'estimated' as const,
    contentRelevance: 8,
    usageContext: 'website' as const,
  },
];

// ═══════════════════════════════════════════════════════════════
// BUSINESS NOTES
// ═══════════════════════════════════════════════════════════════

export const mockNotes = [
  {
    id: 'note-001',
    businessId: 'biz-demo-001',
    title: 'Q1 Product Strategy',
    content: 'Focus on AI content generation improvements and multi-platform scheduling.',
    category: 'strategy' as const,
    priority: 10,
    status: 'active' as const,
    forContent: true,
    tags: ['roadmap', 'ai'],
  },
  {
    id: 'note-002',
    businessId: 'biz-demo-001',
    title: 'Competitor launched new feature',
    content: 'ContentAI just launched video generation. We should evaluate for our roadmap.',
    category: 'competitor' as const,
    priority: 8,
    status: 'active' as const,
    forContent: false,
    tags: ['competition', 'research'],
  },
  {
    id: 'note-003',
    businessId: 'biz-demo-001',
    title: 'Customer feedback trend',
    content: 'Multiple customers requesting better analytics dashboard.',
    category: 'feedback' as const,
    priority: 7,
    status: 'active' as const,
    forContent: true,
    tags: ['feedback', 'analytics'],
  },
];

// ═══════════════════════════════════════════════════════════════
// BUSINESS URLS
// ═══════════════════════════════════════════════════════════════

export const mockUrls = [
  {
    id: 'url-001',
    businessId: 'biz-demo-001',
    label: 'Main Website',
    url: 'https://4up.io',
    type: 'website' as const,
    isPrimary: true,
  },
  {
    id: 'url-002',
    businessId: 'biz-demo-001',
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/4up',
    type: 'social' as const,
    isPrimary: false,
  },
  {
    id: 'url-003',
    businessId: 'biz-demo-001',
    label: 'Twitter/X',
    url: 'https://twitter.com/4up_io',
    type: 'social' as const,
    isPrimary: false,
  },
  {
    id: 'url-004',
    businessId: 'biz-demo-001',
    label: 'Getting Started Guide',
    url: 'https://4up.io/docs/getting-started',
    type: 'resource' as const,
    isPrimary: false,
  },
  {
    id: 'url-005',
    businessId: 'biz-demo-001',
    label: 'Free Trial Landing',
    url: 'https://4up.io/trial',
    type: 'landing' as const,
    isPrimary: false,
  },
];

// ═══════════════════════════════════════════════════════════════
// LOGO VARIANTS
// ═══════════════════════════════════════════════════════════════

export const mockLogos = [
  {
    id: 'logo-001',
    businessId: 'biz-demo-001',
    name: 'Primary Logo',
    format: 'svg' as const,
    background: 'light' as const,
    useCase: 'all' as const,
    isPrimary: true,
    width: 200,
    height: 60,
  },
  {
    id: 'logo-002',
    businessId: 'biz-demo-001',
    name: 'Dark Mode Logo',
    format: 'svg' as const,
    background: 'dark' as const,
    useCase: 'website' as const,
    isPrimary: false,
    width: 200,
    height: 60,
  },
  {
    id: 'logo-003',
    businessId: 'biz-demo-001',
    name: 'Social Avatar',
    format: 'png' as const,
    background: 'light' as const,
    useCase: 'social' as const,
    isPrimary: false,
    width: 400,
    height: 400,
  },
  {
    id: 'logo-004',
    businessId: 'biz-demo-001',
    name: 'Favicon',
    format: 'ico' as const,
    background: 'light' as const,
    useCase: 'favicon' as const,
    isPrimary: false,
    width: 32,
    height: 32,
  },
];

// ═══════════════════════════════════════════════════════════════
// SAMPLE POSTS
// ═══════════════════════════════════════════════════════════════

export const mockSamplePosts = [
  '🚀 Just shipped our new AI content generator! It\'s like having a marketing team in your pocket.\n\nWhat would you create first?\n\n#AIMarketing #ContentCreation',
  'Marketing doesn\'t have to be complicated.\n\nOur platform makes it easy to:\n✅ Create content in seconds\n✅ Schedule across all platforms\n✅ Track what works\n\nAll in one place.',
  'The secret to consistent social media presence?\n\nIt\'s not working harder. It\'s working smarter with AI.\n\nHere\'s how we help businesses 10x their output 🧵',
];

// ═══════════════════════════════════════════════════════════════
// PERSONAL PROFILE
// ═══════════════════════════════════════════════════════════════

export const mockPersonalProfile = {
  id: 'personal-demo-001',
  name: 'Alex Morgan',
  displayName: 'AlexM',
  tagline: 'Helping startups scale through strategic marketing and AI',
  bio: '15+ years in B2B marketing. Passionate about AI, automation, and helping founders build their brands. Previously at Google and HubSpot.',
  title: 'Marketing Director',
  location: 'Chicago, IL',
  website: 'https://alexmorgan.io',
  personalGoals: [
    { goal: 'Build thought leadership in AI marketing', category: 'professional' as const, weight: 10, description: 'Become a recognized voice in the AI marketing space' },
    { goal: 'Grow LinkedIn following to 50k', category: 'influence' as const, weight: 9, description: 'Expand reach on professional networks' },
    { goal: 'Launch personal newsletter', category: 'communication' as const, weight: 8, description: 'Weekly insights on marketing and AI' },
    { goal: 'Mentor 5 early-stage founders', category: 'relationships' as const, weight: 7, description: 'Give back to the startup community' },
    { goal: 'Improve public speaking skills', category: 'personal' as const, weight: 6, description: 'Become comfortable speaking at conferences' },
  ],
  personalityTraits: ['authentic', 'analytical', 'empathetic', 'direct'],
  values: ['integrity', 'growth', 'innovation', 'community'],
  strengths: ['strategic thinking', 'team leadership', 'public speaking', 'content creation'],
  interests: ['AI/ML', 'Marketing Strategy', 'Startup Growth', 'Leadership'],
  favoriteTopics: ['Content Marketing', 'Brand Building', 'AI Tools', 'Founder Stories'],
  personalThemes: ['personal growth', 'industry insights', 'behind the scenes'],
};

// ═══════════════════════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// AUDIENCE SEGMENTS
// ═══════════════════════════════════════════════════════════════

export const mockAudienceSegments = [
  {
    id: 'segment-smb-001',
    businessId: 'biz-demo-001',
    name: 'Growth-Stage Startups',
    description: 'Early-stage startups looking to scale their marketing efforts efficiently.',
    type: 'smb' as const,
    priority: 1 as const,
    estimatedSize: 50000,
    maturityLevel: 'consideration' as const,
  },
  {
    id: 'segment-midmarket-001',
    businessId: 'biz-demo-001',
    name: 'Mid-Market SaaS',
    description: 'Established SaaS companies seeking to optimize content operations.',
    type: 'mid_market' as const,
    priority: 2 as const,
    estimatedSize: 15000,
    maturityLevel: 'decision' as const,
  },
  {
    id: 'segment-agency-001',
    businessId: 'biz-demo-001',
    name: 'Marketing Agencies',
    description: 'Agencies looking to offer AI-powered services to their clients.',
    type: 'b2b' as const,
    priority: 3 as const,
    estimatedSize: 8000,
    maturityLevel: 'awareness' as const,
  },
];

// ═══════════════════════════════════════════════════════════════
// USER PERSONAS
// ═══════════════════════════════════════════════════════════════

export const mockUserPersonas = [
  {
    id: 'persona-marcus-001',
    businessId: 'biz-demo-001',
    segmentId: 'segment-smb-001',
    name: 'Marcus Chen',
    title: 'VP of Marketing',
    photo: undefined,
    background: 'Marcus leads a small but mighty marketing team at a Series A startup. He wears many hats and is always looking for ways to do more with less.',
    quote: 'I need tools that just work, without a steep learning curve.',
    priority: 1 as const,
    ageRange: '30-40',
    gender: 'male' as const,
    location: 'San Francisco, CA',
    education: 'MBA, Northwestern',
    goalIds: ['goal-001', 'goal-002'],
    painPointIds: ['pain-001', 'pain-002'],
    motivationIds: ['motivation-001'],
    behaviorIds: [],
    channelIds: [],
  },
  {
    id: 'persona-sarah-001',
    businessId: 'biz-demo-001',
    segmentId: 'segment-smb-001',
    name: 'Sarah Rodriguez',
    title: 'Founder & CEO',
    photo: undefined,
    background: 'Sarah bootstrapped her e-commerce company and handles marketing herself while building the product.',
    quote: 'Every minute I spend on marketing is a minute away from product.',
    priority: 1 as const,
    ageRange: '25-35',
    gender: 'female' as const,
    location: 'Austin, TX',
    education: 'BS Computer Science',
    goalIds: ['goal-003'],
    painPointIds: ['pain-001', 'pain-003'],
    motivationIds: ['motivation-002'],
    behaviorIds: [],
    channelIds: [],
  },
  {
    id: 'persona-james-001',
    businessId: 'biz-demo-001',
    segmentId: 'segment-midmarket-001',
    name: 'James Thompson',
    title: 'Director of Content',
    photo: undefined,
    background: 'James manages a team of 5 content creators and is responsible for the company\'s entire content strategy.',
    quote: 'I need to scale content production without sacrificing quality.',
    priority: 2 as const,
    ageRange: '35-45',
    gender: 'male' as const,
    location: 'New York, NY',
    education: 'BA Journalism',
    goalIds: ['goal-004'],
    painPointIds: ['pain-002', 'pain-004'],
    motivationIds: ['motivation-003'],
    behaviorIds: [],
    channelIds: [],
  },
  {
    id: 'persona-emily-001',
    businessId: 'biz-demo-001',
    segmentId: 'segment-agency-001',
    name: 'Emily Park',
    title: 'Agency Owner',
    photo: undefined,
    background: 'Emily runs a boutique marketing agency serving 20+ clients and needs efficient tools to manage content at scale.',
    quote: 'My clients expect results, not excuses about bandwidth.',
    priority: 3 as const,
    ageRange: '35-45',
    gender: 'female' as const,
    location: 'Chicago, IL',
    education: 'BA Marketing',
    goalIds: ['goal-005'],
    painPointIds: ['pain-003'],
    motivationIds: ['motivation-004'],
    behaviorIds: [],
    channelIds: [],
  },
];

export const mockSkills = [
  {
    id: 'skill-001',
    name: 'Content Strategy',
    category: 'domain' as const,
    level: 85,
    tier: 3 as const,
    xp: 8500,
    xpToNext: 1500,
    description: 'Planning and executing content marketing strategies',
  },
  {
    id: 'skill-002',
    name: 'AI & Automation',
    category: 'technical' as const,
    level: 72,
    tier: 3 as const,
    xp: 7200,
    xpToNext: 800,
    description: 'Using AI tools for marketing automation',
  },
  {
    id: 'skill-003',
    name: 'Public Speaking',
    category: 'communication' as const,
    level: 58,
    tier: 2 as const,
    xp: 5800,
    xpToNext: 1200,
    description: 'Presenting at conferences and events',
  },
  {
    id: 'skill-004',
    name: 'Data Analysis',
    category: 'analytical' as const,
    level: 45,
    tier: 2 as const,
    xp: 4500,
    xpToNext: 1500,
    description: 'Analyzing marketing performance data',
  },
  {
    id: 'skill-005',
    name: 'Team Leadership',
    category: 'leadership' as const,
    level: 68,
    tier: 3 as const,
    xp: 6800,
    xpToNext: 1200,
    description: 'Leading and mentoring marketing teams',
  },
  {
    id: 'skill-006',
    name: 'Copywriting',
    category: 'creative' as const,
    level: 75,
    tier: 3 as const,
    xp: 7500,
    xpToNext: 500,
    description: 'Writing compelling marketing copy',
  },
  {
    id: 'skill-007',
    name: 'Spanish',
    category: 'language' as const,
    level: 32,
    tier: 1 as const,
    xp: 3200,
    xpToNext: 1800,
    description: 'Business-level Spanish communication',
  },
];

// ═══════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════

export const mockProducts = [
  {
    id: 'product-pro-001',
    businessId: 'biz-demo-001',
    name: '4up Pro Plan',
    description: 'Our flagship AI-powered marketing automation platform for growing businesses. Create, schedule, and optimize content across all platforms.',
    category: 'SaaS Platform',
    features: [
      'Unlimited AI-generated posts',
      'Multi-platform scheduling',
      'Advanced analytics dashboard',
      'Custom brand voice training',
      'Team collaboration tools',
    ],
    benefits: [
      'Save 10+ hours per week on content creation',
      'Increase engagement by up to 3x',
      'Maintain consistent brand voice',
      'Scale content without scaling team',
    ],
    pricing: {
      amount: 99,
      currency: 'USD',
      model: 'subscription' as const,
      interval: 'month' as const,
    },
    targetPersonaIds: ['persona-marcus-001', 'persona-sarah-001'],
    targetSegmentIds: ['segment-smb-001'],
    uniqueSellingPoints: [
      'Only AI that truly learns your brand voice',
      'Pay only for what you post',
      'One platform for all social channels',
    ],
    commonObjections: [
      'AI content lacks authenticity',
      'Too expensive for small teams',
      'Learning curve too steep',
    ],
    status: 'active' as const,
  },
  {
    id: 'product-enterprise-001',
    businessId: 'biz-demo-001',
    name: '4up Enterprise',
    description: 'Enterprise-grade content automation with advanced security, SSO, and dedicated support for large organizations.',
    category: 'SaaS Platform',
    features: [
      'Everything in Pro',
      'SSO & SAML integration',
      'Custom API access',
      'Dedicated success manager',
      'SLA guarantees',
    ],
    benefits: [
      'Enterprise-grade security compliance',
      'Seamless IT integration',
      'Priority support response',
      'Custom training programs',
    ],
    pricing: {
      amount: 499,
      currency: 'USD',
      model: 'subscription' as const,
      interval: 'month' as const,
    },
    targetPersonaIds: ['persona-james-001'],
    targetSegmentIds: ['segment-midmarket-001'],
    uniqueSellingPoints: [
      'SOC 2 Type II certified',
      'White-glove onboarding',
      '99.9% uptime guarantee',
    ],
    commonObjections: [
      'Need to evaluate security posture',
      'Requires IT approval',
      'Long procurement process',
    ],
    status: 'active' as const,
  },
  {
    id: 'product-api-001',
    businessId: 'biz-demo-001',
    name: 'Content Generation API',
    description: 'Integrate 4up\'s AI content generation into your own applications with our developer-friendly API.',
    category: 'Developer Tools',
    features: [
      'RESTful API access',
      'SDK for popular languages',
      'Webhook integrations',
      'Rate limiting controls',
      'Sandbox environment',
    ],
    benefits: [
      'Build AI content into your product',
      'Rapid integration (average 2 hours)',
      'Scale with usage-based pricing',
    ],
    pricing: {
      amount: 0.01,
      currency: 'USD',
      model: 'usage' as const,
    },
    targetPersonaIds: [],
    targetSegmentIds: ['segment-agency-001'],
    uniqueSellingPoints: [
      'Industry-leading response times',
      'Comprehensive documentation',
      'Generous free tier',
    ],
    commonObjections: [
      'Need to evaluate API reliability',
      'Concerned about rate limits',
    ],
    status: 'beta' as const,
  },
  {
    id: 'product-agency-001',
    businessId: 'biz-demo-001',
    name: '4up for Agencies',
    description: 'White-label solution for marketing agencies to offer AI-powered content services to their clients.',
    category: 'Agency Solution',
    features: [
      'Multi-client workspace',
      'White-label dashboard',
      'Client billing management',
      'Brand switching',
      'Agency analytics',
    ],
    benefits: [
      'Serve unlimited clients',
      'Increase margins on content services',
      'Differentiate from competitors',
    ],
    pricing: {
      amount: 299,
      currency: 'USD',
      model: 'subscription' as const,
      interval: 'month' as const,
    },
    targetPersonaIds: ['persona-emily-001'],
    targetSegmentIds: ['segment-agency-001'],
    uniqueSellingPoints: [
      'Built specifically for agencies',
      'Your branding, your pricing',
      'Unlimited client seats',
    ],
    commonObjections: [
      'Clients want bespoke solutions',
      'Concern about AI quality perception',
    ],
    status: 'coming_soon' as const,
  },
];

// ═══════════════════════════════════════════════════════════════
// PLATFORMS
// ═══════════════════════════════════════════════════════════════

export const mockPlatformConfigs = [
  {
    id: 'platform-linkedin-001',
    businessId: 'biz-demo-001',
    platform: 'linkedin' as const,
    connected: true,
    accountId: 'li-123456',
    accountName: '4up Marketing',
    settings: {
      maxCharacters: 3000,
      maxHashtags: 5,
      maxImages: 9,
      linkStyle: 'end' as const,
      hashtagPlacement: 'end' as const,
      linkedinSettings: {
        postType: 'company' as const,
        companyPageId: 'company-4up',
      },
    },
    voiceAdjustments: {
      formalityShift: 1,
      emojiUsage: 'minimal' as const,
      hashtagStyle: 'minimal' as const,
    },
  },
  {
    id: 'platform-twitter-001',
    businessId: 'biz-demo-001',
    platform: 'twitter' as const,
    connected: true,
    accountId: 'tw-789012',
    accountName: '@4upHQ',
    settings: {
      maxCharacters: 280,
      maxHashtags: 3,
      maxImages: 4,
      linkStyle: 'inline' as const,
      hashtagPlacement: 'inline' as const,
      twitterSettings: {
        threadsEnabled: true,
        maxThreadLength: 10,
      },
    },
    voiceAdjustments: {
      formalityShift: -1,
      emojiUsage: 'moderate' as const,
      hashtagStyle: 'moderate' as const,
    },
  },
  {
    id: 'platform-instagram-001',
    businessId: 'biz-demo-001',
    platform: 'instagram' as const,
    connected: true,
    accountId: 'ig-345678',
    accountName: '@4up.io',
    settings: {
      maxCharacters: 2200,
      maxHashtags: 30,
      maxImages: 10,
      linkStyle: 'inline' as const,
      hashtagPlacement: 'first_comment' as const,
      instagramSettings: {
        accountType: 'business' as const,
        storiesEnabled: true,
      },
    },
    voiceAdjustments: {
      formalityShift: -2,
      emojiUsage: 'liberal' as const,
      hashtagStyle: 'liberal' as const,
    },
  },
  {
    id: 'platform-facebook-001',
    businessId: 'biz-demo-001',
    platform: 'facebook' as const,
    connected: false,
    settings: {
      maxCharacters: 63206,
      maxHashtags: 10,
      maxImages: 10,
      linkStyle: 'inline' as const,
      hashtagPlacement: 'end' as const,
      facebookSettings: {
        pageId: '',
        pageName: '',
      },
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// AI STUDIO - MODEL CONFIGS
// ═══════════════════════════════════════════════════════════════

export const mockAIModelConfigs = [
  {
    id: 'model-gpt4-001',
    businessId: 'biz-demo-001',
    provider: 'openai' as const,
    modelId: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Most capable model for complex content generation',
    enabled: true,
    isDefault: true,
    settings: {
      temperature: 0.7,
      maxTokens: 4096,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
    },
    costPer1kTokens: 0.01,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'model-claude-001',
    businessId: 'biz-demo-001',
    provider: 'anthropic' as const,
    modelId: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Excellent for nuanced, thoughtful content',
    enabled: true,
    isDefault: false,
    settings: {
      temperature: 0.5,
      maxTokens: 4096,
    },
    costPer1kTokens: 0.003,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'model-gpt35-001',
    businessId: 'biz-demo-001',
    provider: 'openai' as const,
    modelId: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and cost-effective for simple content',
    enabled: true,
    isDefault: false,
    settings: {
      temperature: 0.8,
      maxTokens: 2048,
    },
    costPer1kTokens: 0.0005,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'model-gemini-001',
    businessId: 'biz-demo-001',
    provider: 'google' as const,
    modelId: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s advanced reasoning model',
    enabled: false,
    isDefault: false,
    settings: {
      temperature: 0.6,
      maxTokens: 2048,
    },
    costPer1kTokens: 0.0025,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
];

// ═══════════════════════════════════════════════════════════════
// AI STUDIO - PROMPT TEMPLATES
// ═══════════════════════════════════════════════════════════════

export const mockPromptTemplates = [
  {
    id: 'template-linkedin-001',
    businessId: 'biz-demo-001',
    name: 'LinkedIn Thought Leadership',
    description: 'Generate insightful LinkedIn posts that establish expertise',
    category: 'social',
    platform: 'linkedin',
    prompt: `Write a LinkedIn post about {{topic}} that:
- Opens with a hook or contrarian take
- Shares a personal insight or experience
- Provides actionable value
- Ends with a question to drive engagement

Tone: {{tone}}
Length: {{length}}

Brand voice guidelines:
{{brand_voice}}`,
    variables: [
      { name: 'topic', type: 'text' as const, required: true },
      { name: 'tone', type: 'select' as const, options: ['Professional', 'Conversational', 'Inspirational'], required: true },
      { name: 'length', type: 'select' as const, options: ['Short (100 words)', 'Medium (200 words)', 'Long (300 words)'], required: true },
      { name: 'brand_voice', type: 'textarea' as const, required: false },
    ],
    isActive: true,
    isDefault: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'template-twitter-001',
    businessId: 'biz-demo-001',
    name: 'Twitter Thread Generator',
    description: 'Create engaging Twitter threads that educate and inform',
    category: 'social',
    platform: 'twitter',
    prompt: `Create a {{thread_length}}-tweet thread about {{topic}}.

Each tweet should:
- Be under 280 characters
- Flow naturally to the next
- Use emojis appropriately

Include:
- A hook in the first tweet
- Key insights in the middle
- A call-to-action at the end`,
    variables: [
      { name: 'topic', type: 'text' as const, required: true },
      { name: 'thread_length', type: 'select' as const, options: ['3', '5', '7', '10'], required: true },
    ],
    isActive: true,
    isDefault: false,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'template-product-001',
    businessId: 'biz-demo-001',
    name: 'Product Announcement',
    description: 'Announce new features or products with impact',
    category: 'product',
    platform: 'all',
    prompt: `Write a {{platform}} post announcing {{product_feature}}.

Target audience: {{persona}}
Key benefits: {{benefits}}

The post should:
- Lead with the user benefit
- Explain what's new briefly
- Include a clear CTA`,
    variables: [
      { name: 'platform', type: 'select' as const, options: ['LinkedIn', 'Twitter', 'Instagram', 'Facebook'], required: true },
      { name: 'product_feature', type: 'text' as const, required: true },
      { name: 'persona', type: 'text' as const, required: false },
      { name: 'benefits', type: 'textarea' as const, required: true },
    ],
    isActive: true,
    isDefault: false,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-15'),
  },
];

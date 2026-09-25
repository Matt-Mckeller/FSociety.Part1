# Theme Weights & Biases - Examples

## Purpose
This file provides examples of how theme weights could be applied contextually. **These are example structures, not actual settings.** Actual weights will be defined and refined over time, likely through a database system integrated with `/marketing-app` and `/ai-marketing-company` projects.

---

## How Weights Work

### Concept
Theme weights determine the emphasis placed on each brand theme based on:
- **Audience** (who we're talking to)
- **Platform** (where the content appears)
- **Content type** (what we're creating)
- **Feature/product** (what we're promoting)
- **Campaign goal** (what we're trying to achieve)

### Weight Scale
- **0.0 - 0.10:** Minimal/background presence
- **0.11 - 0.25:** Supporting element
- **0.26 - 0.40:** Significant presence
- **0.41 - 0.60:** Major emphasis
- **0.61 - 1.00:** Dominant theme

**Note:** Weights across themes should generally sum to 1.0 for a given context, but this isn't a strict rule.

---

## Example Weight Matrices

### Example 1: Enterprise B2B Technical Whitepaper

```yaml
context:
  audience: enterprise_decision_makers
  platform: website_download
  content_type: technical_whitepaper
  feature: infrastructure_services
  goal: establish_credibility

theme_weights:
  protect: 0.35    # Security, stability, trust are paramount
  grow: 0.30       # Scalability and growth matter
  innovate: 0.20   # Modern approaches, but not playful
  win: 0.10        # Competitive advantage exists but subtle
  heal: 0.05       # Minimal relevance in this context 

rationale: |
  Enterprise buyers prioritize security and stability (Protect), 
  want solutions that scale with their growth (Grow), appreciate 
  modern technology (Innovate), care about competitive edge (Win), 
  but wellness themes are largely irrelevant here (Heal minimal).

tone: professional, authoritative, trustworthy
language: technical, precise, comprehensive
```

---

### Example 2: EdTech Student-Facing Landing Page

```yaml
context:
  audience: middle_high_school_students
  platform: website_landing_page
  content_type: product_introduction
  feature: gamified_learning_platform
  goal: excitement_and_enrollment

theme_weights:
  innovate: 0.35   # Gamification, fun, engagement front and center
  grow: 0.30       # Learning, progress, improvement core value
  win: 0.20        # Achievement, rewards, competition appealing
  heal: 0.10       # Positive experience, reduced stress
  protect: 0.05    # Security present but not emphasized to students

rationale: |
  Students respond to fun and engagement (Innovate), care about 
  learning and progress (Grow), motivated by achievements (Win), 
  benefit from positive framing (Heal), while security concerns 
  are for parents, not primary student messaging (Protect minimal).

tone: energetic, playful, inspiring
language: accessible, exciting, relatable
```

---

### Example 3: EdTech Parent-Focused Marketing Email

```yaml
context:
  audience: parents_of_students
  platform: email_campaign
  content_type: marketing_email
  feature: gamified_learning_platform
  goal: address_concerns_and_convert

theme_weights:
  grow: 0.35       # Learning outcomes, student development
  heal: 0.25       # Student well-being, positive experience
  protect: 0.20    # Safety, privacy, appropriate content
  innovate: 0.15   # Modern approach, engagement
  win: 0.05        # Achievement is good but not lead message

rationale: |
  Parents prioritize actual learning results (Grow), care deeply 
  about child's well-being and happiness (Heal), need assurance 
  about safety and appropriateness (Protect), appreciate modern 
  methods (Innovate), but competition/winning less important (Win minimal).

tone: reassuring, informative, empathetic
language: clear, benefit-focused, addresses concerns
```

---

### Example 4: Developer Recruitment LinkedIn Post

```yaml
context:
  audience: experienced_developers
  platform: linkedin
  content_type: recruitment_post
  feature: flexible_work_opportunities
  goal: attract_quality_candidates

theme_weights:
  grow: 0.35       # Career development, skill growth, learning
  win: 0.25        # Better compensation, competitive advantages
  innovate: 0.20   # Modern tech stack, interesting challenges
  protect: 0.15    # Job security, fair treatment, respect
  heal: 0.05       # Work-life balance present but subtle

rationale: |
  Developers value growth opportunities and learning (Grow), 
  motivated by good compensation and career wins (Win), attracted 
  to modern technology and challenges (Innovate), need to feel 
  respected and secure (Protect), with wellness as bonus (Heal minimal).

tone: respectful, opportunity-focused, authentic
language: technical where relevant, no BS, direct
```

---

### Example 5: Investor Pitch Deck

```yaml
context:
  audience: venture_capital_investors
  platform: pitch_presentation
  content_type: business_case
  feature: overall_business_model
  goal: secure_funding

theme_weights:
  grow: 0.45       # Market growth, scalability, expansion primary
  win: 0.30        # Competitive position, market capture, ROI
  innovate: 0.15   # Differentiation, unique approach
  protect: 0.10    # Risk mitigation, solid fundamentals
  heal: 0.00       # Purpose matters but not lead investor message

rationale: |
  Investors primarily care about growth potential and ROI (Grow dominant), 
  want to back winners with competitive advantages (Win high), appreciate 
  innovation as differentiation (Innovate), need risk assurances (Protect), 
  but social good is secondary to returns (Heal minimal/zero in pitch numbers).

tone: confident, data-driven, ambitious
language: business metrics, market size, returns
note: Purpose and healing themes can appear in mission/vision slides but not financial projections
```

---

### Example 6: Social Media - Instagram Educational Post

```yaml
context:
  audience: general_educational_community
  platform: instagram
  content_type: social_media_post
  feature: educational_engagement_tips
  goal: brand_awareness_and_engagement

theme_weights:
  innovate: 0.30   # Engaging format, creative presentation
  grow: 0.25       # Learning and improvement focus
  heal: 0.25       # Positive, uplifting, supportive
  win: 0.10        # Some achievement framing
  protect: 0.10    # Safe, trustworthy source

rationale: |
  Instagram favors engaging, visually interesting content (Innovate), 
  educational content centers on growth (Grow), positive framing 
  performs well (Heal), mild achievement messaging (Win), with trust 
  as baseline (Protect). Balance keeps content feel natural and platform-appropriate.

tone: friendly, accessible, inspirational
language: concise, visual-forward, hashtag-optimized
```

---

### Example 7: Product Documentation (Technical)

```yaml
context:
  audience: developers_and_administrators
  platform: documentation_site
  content_type: technical_documentation
  feature: API_integration_guide
  goal: successful_implementation

theme_weights:
  protect: 0.40    # Security best practices, error handling
  grow: 0.25       # Scalable implementation patterns
  innovate: 0.20   # Modern approaches, efficiency
  win: 0.10        # Performance optimization
  heal: 0.05       # Clear, frustration-reducing docs

rationale: |
  Technical docs must emphasize secure practices (Protect dominant), 
  show scalable patterns (Grow), demonstrate modern methods (Innovate), 
  include performance tips (Win), and be clear/helpful to reduce 
  developer frustration (Heal minimal but present).

tone: precise, helpful, authoritative
language: technical, code-focused, example-rich
```

---

## Dynamic Weight Adjustment

### Concept
Weights aren't static—they can adjust based on:
- **User behavior** (What content performs better?)
- **A/B testing results** (Which emphasis converts?)
- **Platform trends** (What's working on LinkedIn vs. Instagram?)
- **Competitive landscape** (What differentiates us?)
- **Seasonal factors** (Back-to-school vs. summer messaging)

### Example: A/B Test Learning

**Initial hypothesis:**
```yaml
audience: small_business_owners
theme_weights:
  grow: 0.35
  protect: 0.30
  innovate: 0.20
  win: 0.10
  heal: 0.05
```

**After testing:**
- Version A (above weights): 2.3% conversion
- Version B (increased Win to 0.25, reduced Grow to 0.25): 3.7% conversion

**Updated weights based on data:**
```yaml
audience: small_business_owners
theme_weights:
  win: 0.30        # Adjusted up based on performance
  grow: 0.30       # Still important
  protect: 0.25    # Slightly reduced
  innovate: 0.10   # De-emphasized
  heal: 0.05       # Unchanged
learning: "Small business owners respond strongly to competitive advantage messaging"
```

---

## Theme Combination Effectiveness

### High-Performing Combinations (Hypothetical Examples)

**Grow + Innovate (0.35 + 0.30)**
- Works well for: EdTech, professional development, SaaS products
- Why: Learning through modern, engaging methods

**Protect + Grow (0.35 + 0.30)**
- Works well for: Enterprise software, infrastructure, financial services
- Why: Safe scaling and secure growth

**Win + Innovate (0.30 + 0.30)**
- Works well for: Competitive products, gaming, performance tools
- Why: Achievement through engaging mechanics

**Heal + Grow (0.30 + 0.30)**
- Works well for: Wellness apps, educational therapy, mental health tools
- Why: Positive development and well-being

**Protect + Heal (0.30 + 0.25)**
- Works well for: Healthcare, child safety, trust-critical services
- Why: Safe, supportive environments

### Combinations to Use Carefully

**Win + Heal (both high)**
- Can conflict: Competition vs. compassion
- Use when: Healthy competition, personal bests vs. others

**Innovate + Protect (both dominant)**
- Can conflict: Innovation implies change vs. stability
- Use when: "Safely innovative," "responsibly cutting-edge"

---

## AI System Usage

### For Content Generation
```python
# Pseudo-code example
def generate_content(context):
    weights = get_theme_weights(
        audience=context.audience,
        platform=context.platform,
        content_type=context.content_type,
        feature=context.feature
    )
    
    # AI uses weights to:
    # 1. Emphasize themes proportionally
    # 2. Select appropriate language/tone
    # 3. Choose relevant symbols/concepts
    # 4. Balance multiple themes naturally
    
    return ai_generate(
        prompt=context.prompt,
        theme_weights=weights,
        examples=get_few_shot_examples(weights)
    )
```

### For Content Evaluation
```python
# Pseudo-code example
def evaluate_content_alignment(content, context):
    expected_weights = get_theme_weights(context)
    detected_themes = analyze_theme_presence(content)
    
    alignment_score = calculate_similarity(
        expected=expected_weights,
        actual=detected_themes
    )
    
    return {
        'score': alignment_score,
        'suggestions': generate_improvement_suggestions(
            expected_weights,
            detected_themes
        )
    }
```

---

## Implementation Roadmap

### Phase 1: Manual Definition
- [ ] Define baseline weights for common contexts
- [ ] Document rationale for each
- [ ] Create weight templates for typical scenarios
- [ ] Test with real content creation

### Phase 2: Database Integration
- [ ] Build weight storage system
- [ ] Create UI for weight management
- [ ] Enable context-based retrieval
- [ ] Version control for weight changes

### Phase 3: AI-Assisted Optimization
- [ ] Implement A/B testing framework
- [ ] Track performance by weight combination
- [ ] AI suggests weight adjustments based on data
- [ ] Human reviews and approves changes

### Phase 4: Automated Learning
- [ ] System learns from performance data
- [ ] Weights adjust dynamically based on results
- [ ] Anomaly detection (unexpected performance)
- [ ] Continuous optimization loop

---

## Adding New Weight Examples

### Template
```yaml
context:
  audience: [target audience]
  platform: [where content appears]
  content_type: [format/medium]
  feature: [what's being promoted]
  goal: [primary objective]

theme_weights:
  grow: [0.00-1.00]
  innovate: [0.00-1.00]
  win: [0.00-1.00]
  heal: [0.00-1.00]
  protect: [0.00-1.00]

rationale: |
  [Explain why these weights make sense for this context]

tone: [descriptive words]
language: [style characteristics]
notes: [any special considerations]
```

---

## Status
📋 **Examples Only** - These are illustrative examples, not actual system settings

**Next steps:**
1. ⏳ Gather real contexts where content is needed
2. ⏳ Define initial weight baselines with stakeholder input
3. ⏳ Create weight database schema
4. ⏳ Build weight management interface in marketing-app
5. ⏳ Integrate with AI content generation
6. ⏳ Implement A/B testing framework
7. ⏳ Begin performance tracking and optimization

**Integration targets:**
- `/marketing-app` - Weight management and application
- `/ai-marketing-company` - Automated weight-based content generation
- Analytics system - Performance tracking by weight combination

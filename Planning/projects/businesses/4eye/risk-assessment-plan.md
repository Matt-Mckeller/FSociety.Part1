# 4eye Risk Assessment Plan

**Focus Areas:** Real-time chat features, classroom usage, competitive landscape  
**Goal:** Identify blockers and validate technical approach  
**Format:** Concise, actionable findings

---

## Assessment Structure

### 1. Business Goals Alignment Assessment

**Core 4eye Goals:**
1. **Optimizing Learning Outcomes**
2. **Accessibility**
3. **Improving Engagement, Attention, and Focus**
4. **Improving Mental Health and Wellbeing**

**Real-Time Features Impact Analysis:**

| Feature | Learning Outcomes | Accessibility | Engagement/Focus | Mental Health | Net Impact |
|---------|------------------|---------------|------------------|---------------|------------|
| **Real-time classroom sync** | ⚠️ Could distract from content | ⚠️ Requires stable internet | ✅ High engagement | ⚠️ FOMO if disconnected | ? |
| **Live shared summaries** | ✅ Reinforces key points | ✅ Helps catch up if behind | ✅ Keeps attention | ✅ Reduces stress | ✅ Strong |
| **Student-to-student chat** | ❌ Distracts from learning | ✅ Peer support | ❌ Reduces focus | ⚠️ Social pressure/anxiety | ❌ Harmful |
| **Command-only interaction** | ✅ Focused assistance | ✅ Simple, clear | ✅ Quick help | ✅ Low pressure | ✅ Strong |
| **Real-time teacher controls** | ✅ Teacher can guide focus | ✅ Adaptive to needs | ✅ Structured engagement | ✅ Safe environment | ✅ Strong |

**Key Questions:**
- Do real-time features **enhance** or **distract from** learning outcomes?
- Does requiring stable internet **harm accessibility** for underserved students?
- Does live classroom activity create **engagement** or **anxiety**?
- Are students better off with **private AI tutor** vs **shared classroom experience**?

**Evaluation Criteria:**
- [ ] **Learning Outcomes:** Does the feature measurably improve understanding/retention?
- [ ] **Accessibility:** Can students with limited tech/internet access use it?
- [ ] **Engagement:** Does it maintain focus or create distractions?
- [ ] **Mental Health:** Does it reduce stress or create social pressure?

**Deliverable:** Goals-aligned feature scorecard (prioritize features that serve 3+ goals)

---

### 2. Technical Risk Assessment (Real-Time Features)

**What to Evaluate:**
- [ ] **WebSocket vs Polling** - Cost, scalability, reliability trade-offs
- [ ] **Real-time sync architecture** - Shared classroom views, latency requirements
- [ ] **Offline/degraded handling** - What happens when connection drops
- [ ] **Scale limits** - Classroom size limits (10? 30? 100+ students?)
- [ ] **Infrastructure costs** - AWS/Firebase/Supabase realtime pricing at scale

**Key Questions:**
- Can you MVP with polling instead of WebSockets? (Much simpler)
- What's the minimum viable real-time feature set?
- What breaks if latency is 2-5 seconds vs instant?

**Deliverable:** 1-page technical decision matrix

---

### 3. Product Risk Assessment (Classroom Use)

**What to Evaluate:**
- [ ] **Moderation requirements** - Student-to-student chat vs command-only
- [ ] **Privacy/FERPA compliance** - Student data, chat logs, recordings
- [ ] **Teacher control** - Can teacher disable features, monitor, intervene?
- [ ] **Distraction potential** - Does real-time chat help or hurt learning?
- [ ] **Age appropriateness** - K-12 vs college considerations

**Key Questions:**
- Should MVP skip student-to-student chat entirely? (Just student-to-AI)
- Do teachers need real-time dashboards showing student engagement?
- What's the minimum compliance needed for school pilots?

**Deliverable:** Risk-ranked feature list (green/yellow/red)

---

### 4. Market & Competition Analysis

**Competitors to Analyze:**

**Direct EdTech AI Competitors:**
- [ ] **Khanmigo** (Khan Academy's AI tutor) - What do they do/not do?
- [ ] **Quizlet Q-Chat** - AI tutoring approach
- [ ] **Brainly** - Student Q&A + AI
- [ ] **Socratic by Google** - AI homework helper
- [ ] **Numerade** - Video + AI tutoring

**Real-Time Classroom Tools:**
- [ ] **Nearpod** - Interactive lessons with real-time student participation
- [ ] **Pear Deck** - Real-time formative assessment
- [ ] **Kahoot** - Real-time classroom engagement
- [ ] **ClassDojo** - Classroom communication

**AI Chat Platforms (Non-Edu):**
- [ ] **ChatGPT Edu** - What schools are already using
- [ ] **Claude** - Growing in education
- [ ] **Gemini** - Google's offering

**Analysis Framework:**
| Competitor | Real-Time Features | AI Tutoring | Classroom Integration | Pricing | Gap/Opportunity |
|------------|-------------------|-------------|----------------------|---------|-----------------|
| Khanmigo   | ?                 | ✓           | ?                    | ?       | ?               |
| Nearpod    | ✓                 | Limited     | ✓                    | ?       | ?               |

**Key Questions:**
- What do they NOT do that 4eye would?
- Why would schools switch from free ChatGPT?
- What's the unfair advantage?

**Deliverable:** 1-page competitive positioning summary

---

### 5. Go/No-Go Decision Points

**Red Flags (Stop):**
- ❌ Real-time features require >$50k infrastructure investment for MVP
- ❌ FERPA compliance requires 12+ months certification process
- ❌ Market dominated by free alternatives with network effects
- ❌ Real-time chat creates unmanageable moderation burden
- ❌ **Real-time features actively harm learning outcomes or mental health**
- ❌ **Accessibility barriers exclude underserved students (core mission conflict)**

**Yellow Flags (Pivot):**
- ⚠️ Real-time sync is complex - could start with async-first approach
- ⚠️ Student chat is risky - focus on AI tutor only initially
- ⚠️ K-12 compliance is heavy - start with college/adult learners
- ⚠️ Existing competitors - need clear differentiation story
- ⚠️ **Real-time features boost engagement but hurt focus (mixed goals impact)**
- ⚠️ **Requires stable internet (accessibility concern for target market)**

**Green Lights (Proceed):**
- ✅ Real-time can be done with managed services (Firebase/Supabase)
- ✅ Teacher-controlled features reduce moderation concerns
- ✅ Command-based interface (not free chat) limits risks
- ✅ Clear gaps in competitor offerings
- ✅ Visualizations + real-time + AI = unique combination
- ✅ **Features measurably improve learning outcomes**
- ✅ **Accessible to students with varying tech access (offline modes, low-bandwidth)**
- ✅ **Reduces anxiety and supports mental health (vs creating pressure)**
- ✅ **Maintains focus and attention (vs creating distractions)**

---

## Research Process

### Week 1: Goals Alignment + Technical Deep-Dive

**Days 1-2: Business Goals Assessment**
1. **Map features to goals** 
   - List all planned real-time features
   - Score each against 4 core goals (Help/Neutral/Hurt)
   - Identify goal conflicts (e.g., engagement vs mental health)

2. **User research on goals**
   - Interview 3-5 students: Does real-time help or stress them?
   - Interview 3-5 teachers: Does it improve outcomes or distract?
   - Document specific examples of help/harm

**Days 3-5: Technical Feasibility**
1. **Test real-time infrastructure options**
   - Build WebSocket proof-of-concept
   - Test Firebase Realtime Database
   - Test Supabase Realtime
   - Document: Cost, complexity, scale limits

2. **Prototype core real-time feature**
   - Shared classroom view (30 students)
   - Measure latency, resource usage
   - Test degraded network conditions (accessibility!)

**Output:** Goals alignment scorecard + Technical feasibility report (2 pages)

### Week 2: Market Research
1. **Competitor analysis** (2 days)
   - Sign up for trials of top 5 competitors
   - Document feature matrix
   - Identify gaps and overlaps

2. **Customer discovery** (3 days)
   - Interview 5-10 teachers about real-time needs
   - Ask about existing tool pain points
   - Validate feature priorities

**Output:** Competitive analysis + customer insights (2 pages)

### Week 3: Risk Mitigation + Goals-First Planning
1. **Document compliance requirements** (1-2 days)
   - FERPA basics for MVP
   - Data privacy requirements
   - Minimum viable compliance

2. **Create goals-aligned phased rollout** (1-2 days)
   - MVP feature set (keep only features that serve 2+ goals)
   - Phase 2 features (features with goal conflicts to test later)
   - Decision criteria for each phase
   - **Accessibility-first considerations** (offline mode, low-bandwidth)

**Output:** Go/no-go recommendation with goals-aligned phased plan (1 page)

---

## Final Deliverable Format

### 4eye Risk Assessment Report (Max 5 Pages)

**Page 1: Executive Summary**
- Go/No-Go recommendation
- **Goals alignment score** (do real-time features serve the mission?)
- Top 3 risks + mitigation
- Key decisions needed

**Page 2: Business Goals Impact**
- Feature scorecard (aligned with 4 core goals)
- Goal conflicts identified
- Recommended feature prioritization based on goals

**Page 3: Technical Assessment**
- Real-time approach recommendation
- Architecture diagram (simple)
- Cost/scale projections
- Accessibility considerations (offline, low-bandwidth)

**Page 4: Market Position**
- Competitive matrix (visual)
- Differentiation strategy
- Target customer segment

**Page 5: Action Plan**
- MVP feature list (prioritized by goal alignment)
- Next steps (ranked)
- Open questions

---

## Quick Start Actions

**This Week:**
1. **Score each real-time feature against 4 core goals** (2 hours)
   - Create simple spreadsheet: Feature | Learning | Accessibility | Engagement | Mental Health | Score
   - Identify potential goal conflicts
2. Build WebSocket proof-of-concept (1 day)
3. Sign up and test Khanmigo, Nearpod, Quizlet Q-Chat (1 day)
4. **Interview 2-3 students about real-time features** (2 days)
   - Ask: Does live classroom activity help or stress you?
   - Ask: Would you rather have private AI tutor or shared classroom view?

**Next Week:**
5. Compile findings into 5-page report
6. Make go/no-go decision on real-time features **based on goal alignment**
7. Define MVP scope (only features that serve 2+ goals)

---

## Key Decision Questions to Answer

1. **Can real-time features be built with <$500/month infrastructure?**
2. **Is student-to-student chat necessary for MVP?**
3. **What's the one thing 4eye does that no competitor does well?**
4. **Can you start with college students to avoid K-12 compliance?**
5. **Would teachers pay for this vs using free ChatGPT?**
6. **Do real-time features IMPROVE learning outcomes or just engagement?** ⭐
7. **Does requiring stable internet exclude underserved students?** ⭐
8. **Do students feel less anxious with private AI vs shared classroom?** ⭐
9. **Which features serve 3+ goals and should be prioritized?** ⭐

---

## Notes & Observations

### ✅ Completed - October 26, 2025

**1. Goals Alignment Scorecard** (`goals-alignment-scorecard.md`)
- Scored 10 potential real-time features against 4 core goals
- **Key Finding:** Private AI tutor + teacher-controlled features score highest (+4)
- **Key Finding:** Student-to-student chat actively harmful (-3) - DO NOT BUILD
- **MVP Features Identified:** 6 priority features that serve 3-4 goals each

**Initial Assessment:**
- ✅ Real-time features CAN align with goals if designed carefully
- ❌ Social features (chat, feeds) undermine core mission
- ✅ Accessibility-first approach (transcription, summaries) serves all goals
- ⚠️ Requiring stable internet is a concern - need offline modes

---

### Next Immediate Actions

**Today/This Week:**
1. ✅ ~~Score features against goals~~ - DONE
2. **Review scorecard findings** - Do you agree with the assessments?
3. **Pick 2-3 features to prototype** - Suggested: Command-only interaction + Live summaries + Transcription
4. **Quick competitor check** - Sign up for Khanmigo and Nearpod trials (30 min each)

**Questions for You:**
- Do the feature scores match your intuition?
- Any features I evaluated that you want to reconsider?
- Ready to move to technical prototyping or want more research first?


/**
 * Expanse EDU Presentation Slides Data
 * Extracted from Full Expanse EDU Pitch Deck
 */
import type { Slide, SectionType } from "./types"

// Helper to create slide IDs
const slideId = (num: number) => `slide-${num.toString().padStart(3, "0")}`

export const slides: Slide[] = [
  // ============================================================================
  // INTRODUCTION (Slides 1-6)
  // ============================================================================
  {
    id: slideId(1),
    slideNumber: 1,
    title: "Expanse EDU",
    subtitle: "Game Changing Engagement Solution For K-12 & Higher Education",
    content: [{ type: "text", value: "Title Slide" }],
    notes: "",
    section: "introduction",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 10,
  },
  {
    id: slideId(2),
    slideNumber: 2,
    title: "Expanse EDU",
    subtitle: "Game Changing Engagement Solution For K-12 & Higher Education",
    content: [
      {
        type: "text",
        value:
          "Disruptive Engagement Solution targeting K-12 and Higher Education markets",
      },
    ],
    notes:
      "Disruptive Engagement Solution? Positives and Negatives, depends on audience, invites commentary for marketing though",
    section: "introduction",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 15,
  },
  {
    id: slideId(3),
    slideNumber: 3,
    title: "Matthew McKeller",
    subtitle: "Software Engineer, Innovator, Entrepreneur",
    content: [
      { type: "text", value: "/in/MattMckeller" },
      { type: "text", value: "https://www.expanseservices.com" },
    ],
    notes:
      "I'm highly experienced in web application development and apis and integrations which are core to this product. I grew up in the midwest and I am a highly motivated entrepreneur. I am creating this product because there is a tremendous need, its core to who I am as a person, and there is massive potential for success and positive change.",
    section: "introduction",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(4),
    slideNumber: 4,
    title: "Before we begin…",
    subtitle: "Let's take a moment to gather some positive energy.",
    content: [{ type: "text", value: "Audience engagement moment" }],
    notes:
      "Perhaps ask the audience what they are grateful for today, and tell them good job.",
    section: "introduction",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(5),
    slideNumber: 5,
    title: "Addressing The Halo Effect",
    subtitle:
      "A cognitive bias that occurs when a person's first impression of someone or something influences their overall judgment",
    content: [
      {
        type: "text",
        value: "Setting expectations and addressing potential biases",
      },
    ],
    notes:
      "Do I want this in the pitch? Seems like perhaps make it a smaller point if included.",
    section: "introduction",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(6),
    slideNumber: 6,
    title: "Halo Effect: Breaking into Education",
    subtitle: "Integration Support for Major LMS & SIS",
    content: [
      {
        type: "bullets",
        value: [
          "Integration Support for Major LMS & SIS through a single API with support for FERPA, GDPR, SOC 2 Type II compliance",
          "Free or low cost options for districts leading to quicker decision making",
          "Easy adoption for schools and teachers - keep current workflows or improve them",
          "Content is not the focus - improve learning experience by improving existing environments",
          "Diverse marketing approaches - advertise to schools, teachers, students, and parents",
        ],
      },
    ],
    notes:
      "Market change: Covid edtech boom. Market change: Ed.link integration of multiple LMS & SIS. Massive potential, scalable and innovative solution.",
    section: "introduction",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 45,
  },

  // ============================================================================
  // PITCH OUTLINE (Slide 7)
  // ============================================================================
  {
    id: slideId(7),
    slideNumber: 7,
    title: "Pitch Outline",
    content: [
      {
        type: "bullets",
        value: [
          "Problems and goals",
          "Core product focus and intro flow",
          "Audience, Scale, and Profit potential",
          "Deeper dive into the product",
        ],
      },
    ],
    notes: "",
    section: "problem",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 15,
  },

  // ============================================================================
  // PROBLEMS & OPPORTUNITIES (Slides 8-16)
  // ============================================================================
  {
    id: slideId(8),
    slideNumber: 8,
    title: "Problems Targeted & Market Opportunities",
    subtitle: "Understanding the challenges in modern education",
    layout: "section-header",
    content: [
      {
        type: "bullets",
        value: [
          "Student Engagement Crisis",
          "Mental Health Challenges",
          "Financial Literacy Gap",
          "Market Size & Opportunity",
        ],
      },
    ],
    notes: "<Audience Involvement Opportunities in this section>",
    section: "problem",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 5,
  },
  {
    id: slideId(9),
    slideNumber: 9,
    title: "Target 1: Engagement",
    subtitle: "Untapped Potential",
    content: [
      {
        type: "quote",
        value:
          "Our classrooms are filled with untapped potential, but too many students are disengaged, their minds wandering in a landscape of boredom. When learning becomes a monotonous chore, motivation withers, and focus evaporates. We are losing their brilliance to a system that fails to ignite their curiosity.",
      },
    ],
    notes: "",
    section: "problem",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(10),
    slideNumber: 10,
    title: "Target 1: Engagement",
    subtitle: "Missing Purpose",
    content: [
      {
        type: "quote",
        value:
          "A ship without a rudder drifts aimlessly. When students don't see the connection between their education and their dreams, their drive falters. We must illuminate the path forward, showing them how learning empowers them to shape their own destinies.",
      },
    ],
    notes: "",
    section: "problem",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(11),
    slideNumber: 11,
    title: "Target 1: Engagement",
    subtitle: "Competing with Instant Gratification",
    content: [
      {
        type: "quote",
        value:
          "In a world of instant gratification, the rewards of education can seem distant and abstract. We are competing with the allure of immediate pleasure, the dopamine rush of likes and virtual victories. We must make learning an experience that is equally engaging, equally rewarding, and equally relevant to their lives.",
      },
    ],
    notes: "",
    section: "problem",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(12),
    slideNumber: 12,
    title: "Target 1: Engagement",
    subtitle: "The Data",
    content: [
      {
        type: "statistic",
        value: "Only 47% of students are engaged in school",
      },
      {
        type: "text",
        value:
          "74% of 5th graders are highly engaged, dropping to just 33% by high school — Gallup Student Poll",
      },
      {
        type: "bullets",
        value: [
          "Average attention span dropped from 12 seconds (2000) to 8 seconds (2015) — shorter than a goldfish",
          "Less than half of students see education as necessary for their future — ECMC Group Survey",
          "Constant dopamine hits from social media train brains to seek novelty over sustained focus",
          "21-33% of undergraduates drop out each year, often citing lack of engagement",
        ],
      },
      {
        type: "text",
        value:
          "Engaged students are 2.5x more likely to get excellent grades and 4.5x more likely to be hopeful about the future.",
      },
    ],
    notes:
      "Source: Gallup School Engagement Survey, Microsoft attention study, ECMC Group 2022",
    section: "problem",
    assets: [],
    priority: "critical",
    audiences: ["general", "educator"],
    estimatedTime: 60,
  },
  {
    id: slideId(13),
    slideNumber: 13,
    title: "Target 2: Mental Health",
    subtitle: "Empty Desks",
    content: [
      {
        type: "quote",
        value:
          "Empty desks tell a story of unmet needs. When students feel overwhelmed by sadness and hopelessness, school becomes a battleground, not a place of learning. Their absence is a cry for help – a signal that we must do more to support their well-being.",
      },
    ],
    notes: "",
    section: "problem",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(14),
    slideNumber: 14,
    title: "Target 2: Mental Health",
    subtitle: "Struggling in Silence",
    content: [
      {
        type: "quote",
        value:
          "Our classrooms are filled with potential, but too many students are struggling in silence. Mental health challenges rob them of their ability to learn, to focus, to thrive. We cannot afford to ignore the silent epidemic that's stealing their futures.",
      },
    ],
    notes: "",
    section: "problem",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(15),
    slideNumber: 15,
    title: "Target 2: Mental Health",
    subtitle: "Self-Belief",
    content: [
      {
        type: "quote",
        value:
          "A mind clouded by doubt cannot soar. Negative beliefs about oneself clip the wings of potential. We must nurture self-belief and empower our students to see the incredible possibilities that lie within them.",
      },
    ],
    notes: "",
    section: "problem",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(16),
    slideNumber: 16,
    title: "Target 2: Mental Health",
    subtitle: "The Data & Opportunities",
    content: [
      {
        type: "statistic",
        value:
          "1 in 7 adolescents (14%) globally experience mental health conditions",
      },
      {
        type: "bullets",
        value: [
          "Major depression up 145% in teen girls, 161% in boys (2010-2020) — Anxious Generation",
          "Anxiety increased 134% among US undergraduates since 2010 — American College Health Association",
          "Suicidal behaviors among high schoolers increased 40%+ in the decade before 2019",
          "Nearly 20% of children ages 3-17 have a mental, emotional, or behavioral disorder",
        ],
      },
      {
        type: "text",
        value:
          "PBIS (Positive Behavior Intervention) can lead to 20-40% reduction in disciplinary referrals and creates more positive learning environments.",
      },
    ],
    notes: "Sources: WHO, NCBI, Anxious Generation by Jonathan Haidt, PBIS.org",
    section: "problem",
    assets: [],
    priority: "critical",
    audiences: ["general", "educator"],
    estimatedTime: 45,
  },

  // ============================================================================
  // PURPOSE & GOALS (Slides 17-24)
  // ============================================================================
  {
    id: slideId(17),
    slideNumber: 17,
    title: "Purpose & Goals",
    subtitle: "Our mission to transform education",
    layout: "section-header",
    content: [
      {
        type: "bullets",
        value: [
          "Increase Engagement & Motivation",
          "Support Mental Health",
          "Build Financial Literacy",
          "Prepare Students for the Future",
        ],
      },
    ],
    notes: "",
    section: "goals",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 5,
  },
  {
    id: slideId(18),
    slideNumber: 18,
    title: "Goal: Increase Engagement and Motivation",
    content: [
      {
        type: "text",
        value:
          "Expanse transforms motivation through proven gamification techniques and behavioral science.",
      },
      {
        type: "bullets",
        value: [
          "Boost intrinsic motivation through visual progress, leveling systems, and artistic expression",
          "Enable extrinsic motivation with real rewards connected to performance",
          "Foster healthy competition between classes and schools without exposing individual failures",
          "Provide quicker feedback and gratification to compete with social media dopamine loops",
          "Create a sense of purpose by connecting learning to tangible outcomes",
        ],
      },
      {
        type: "text",
        value:
          "Quicker rewards increase focus and attention. The positive reinforcement is directly linked to the action, making it more salient.",
      },
    ],
    notes:
      "Key insight: Immediate rewards strengthen memory formation through dopamine activation.",
    section: "goals",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 45,
  },
  {
    id: slideId(19),
    slideNumber: 19,
    title: "Goal: Improved Academic Performance & Completion",
    content: [
      { type: "text", value: "The app is designed to motivate students to:" },
      {
        type: "bullets",
        value: [
          "Improve work completion rates and attendance",
          "Graduate with their degrees",
          "Achieve higher grades",
          "Participate in class",
        ],
      },
      {
        type: "text",
        value:
          "Learning comprehension will be improved through reward, increased engagement, additional goals, and improved mood.",
      },
    ],
    notes: "",
    section: "goals",
    assets: [],
    priority: "critical",
    audiences: ["general", "educator"],
    estimatedTime: 40,
  },
  {
    id: slideId(20),
    slideNumber: 20,
    title:
      "Goal: Spread Awareness To The Value of Rewards, Goals, and Positive Reinforcement",
    content: [
      {
        type: "bullets",
        value: [
          "Spread knowledge about gamification and positive reinforcement benefits",
          "Reduce gaps in knowledge regarding benefits of positive reinforcement, rewards, dopamine, growth tracking",
          "Increase association between rewards and desired performance activities",
          "Add additional goals for students to strive to complete",
        ],
      },
    ],
    notes: "",
    section: "goals",
    assets: [],
    priority: "important",
    audiences: ["general", "educator"],
    estimatedTime: 40,
  },
  {
    id: slideId(21),
    slideNumber: 21,
    title: "Goal: Improve Mental Health & Promote a Positive Mindset",
    content: [
      {
        type: "bullets",
        value: [
          "Cultivate positive experiences through recognition, rewards, and celebration",
          "Increase self-efficacy through visual progress tracking and achievement systems",
          "Enable artistic expression and personalization — known to improve mental health",
          "Improve classroom culture as a whole, lifting all students' moods",
          "Provide parent communication for positive reinforcement at home",
          "Replace punishment with positive behavior intervention approaches",
        ],
      },
      {
        type: "text",
        value:
          "Success in the classroom boosts students' confidence. Positive feedback and recognition improve mood, leading to better performance.",
      },
    ],
    notes:
      "Research shows positive reinforcement in Ghana reduced absenteeism by 80% (ResearchGate 2020)",
    section: "goals",
    assets: [],
    priority: "critical",
    audiences: ["general", "educator"],
    estimatedTime: 40,
  },
  {
    id: slideId(22),
    slideNumber: 22,
    title: "Goal: Instill a Growth Oriented Mindset",
    content: [
      {
        type: "text",
        value:
          "Expanse 'double-taps' the value of progress — adding visualization and celebration to achievements already happening in the classroom.",
      },
      {
        type: "bullets",
        value: [
          "Visual progress tracking with leveling systems and experience bars",
          "Achievements and milestones that celebrate incremental growth",
          "Continuous reminders of improvement to build persistence",
          "Transform abstract grade improvements into tangible, visible progress",
        ],
      },
      {
        type: "text",
        value:
          "Students who set clear goals experience greater self-efficacy and are more likely to persist through challenges.",
      },
    ],
    notes:
      "Based on self-efficacy research from Bandura's social-cognitive theory",
    section: "goals",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(23),
    slideNumber: 23,
    title: "Goal: Increase College Access & Completion",
    content: [
      {
        type: "text",
        value:
          "Achieving these goals will directly enhance college access and completion by fostering confidence, a growth mindset, improved grades, and a stronger sense of purpose.",
      },
    ],
    notes: "",
    section: "goals",
    assets: [],
    priority: "important",
    audiences: ["general", "educator"],
    estimatedTime: 20,
  },
  {
    id: slideId(24),
    slideNumber: 24,
    title: "Goal: Make Education More Fun, and lots more!",
    content: [
      {
        type: "text",
        value:
          "Through the rewards, positive reinforcement, progression, competition, and social aspects of Expanse EDU we can make education more fun and engaging.",
      },
    ],
    notes: "",
    section: "goals",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 20,
  },

  // ============================================================================
  // USER EXPERIENCE (Slides 25-34)
  // ============================================================================
  {
    id: slideId(25),
    slideNumber: 25,
    title: "Crucial User Experience Details",
    subtitle: "How Expanse integrates seamlessly into education",
    layout: "section-header",
    content: [
      {
        type: "bullets",
        value: [
          "Easy Integration with Existing LMS",
          "Intuitive Teacher Dashboard",
          "Engaging Student Experience",
          "Parent & Guardian Visibility",
        ],
      },
    ],
    notes: "",
    section: "ux",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 5,
  },
  {
    id: slideId(26),
    slideNumber: 26,
    title: "User Experience",
    content: [
      {
        type: "text",
        value:
          "The product is Easy to Use and seamlessly Integrates into the existing school LMS (Learning Management Systems) i.e., Canvas, Blackboard, Google Classroom, Moodle.",
      },
    ],
    notes: "",
    section: "ux",
    assets: [],
    priority: "critical",
    audiences: ["general", "educator", "technical"],
    estimatedTime: 30,
  },
  {
    id: slideId(27),
    slideNumber: 27,
    title: "Core Concept",
    content: [
      {
        type: "text",
        value:
          "I'm making a game by taking core components that make a game engaging and applying them to the educational environment.",
      },
      {
        type: "text",
        value:
          "Initial and core product features focus on rewards, positive reinforcement, and progression.",
      },
    ],
    notes: "",
    section: "ux",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(28),
    slideNumber: 28,
    title: "Expanse EDU DOES NOT LOOK like your typical game",
    content: [
      { type: "text", value: "Regarding gamification and a gaming theme:" },
      {
        type: "text",
        value:
          "Expanse takes the core components of games and integrates them into the classroom environment in an accessible and user friendly way.",
      },
    ],
    notes: "",
    section: "ux",
    assets: [],
    priority: "important",
    audiences: ["general", "educator"],
    estimatedTime: 25,
  },
  {
    id: slideId(29),
    slideNumber: 29,
    title: "Core Product Focus Areas",
    content: [{ type: "text", value: "Visual showing core focus areas" }],
    notes: "",
    section: "ux",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(30),
    slideNumber: 30,
    title: "Core Components",
    content: [
      {
        type: "bullets",
        value: [
          "Reward & Positive Reinforcement to make learning a fun and empowering experience",
          "Instant Gratification to compete with social media and gaming",
          "Progression systems to show growth",
          "Recognition and acknowledgment",
          "Goal setting and achievement",
        ],
      },
    ],
    notes: "",
    section: "ux",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 45,
  },
  {
    id: slideId(31),
    slideNumber: 31,
    title: "Product Flow",
    content: [{ type: "text", value: "Visual diagram of product flow" }],
    notes: "",
    section: "ux",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 10,
  },
  {
    id: slideId(32),
    slideNumber: 32,
    title: "Core Product Flow & Economy Foundation",
    content: [
      {
        type: "bullets",
        value: [
          "Observe Rewardable Activity (i.e. Completed Work)",
          "Reward Coins, Loot, and Enable Other Features",
          "Event activity triggers rewards and progression",
        ],
      },
    ],
    notes: "",
    section: "ux",
    assets: [],
    priority: "critical",
    audiences: ["general", "technical"],
    estimatedTime: 40,
  },
  {
    id: slideId(33),
    slideNumber: 33,
    title: "Scale & Audience",
    content: [{ type: "text", value: "Transition slide to market section" }],
    notes: "",
    section: "ux",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 5,
  },
  {
    id: slideId(34),
    slideNumber: 34,
    title: "Scale & Audience Questions",
    content: [
      {
        type: "bullets",
        value: [
          "Who is the audience, and how big could this get?",
          "How many lives can we touch?",
          "Let's focus on the number of potential users.",
        ],
      },
    ],
    notes: "",
    section: "ux",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 20,
  },

  // ============================================================================
  // SCALE & MARKET (Slides 35-50)
  // ============================================================================
  {
    id: slideId(35),
    slideNumber: 35,
    title: "Scale: Popular LMS User Counts",
    content: [
      {
        type: "text",
        value:
          "Integration is supported for: Blackboard, Canvas, Google Classroom, Moodle, and most popular LMS/SIS platforms.",
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "critical",
    audiences: ["general", "investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(36),
    slideNumber: 36,
    title: "Scale: Student Counts",
    content: [
      { type: "statistic", value: "75 million students in US (Fall 2022)" },
      {
        type: "bullets",
        value: [
          "49.6 million in public K-12",
          "5.5 million in private K-12",
          "20+ million in higher education",
        ],
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "critical",
    audiences: ["general", "investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(37),
    slideNumber: 37,
    title: "Scale: Audience Expansion",
    content: [
      {
        type: "text",
        value:
          "In the future Expanse EDU's solutions can expand into other forms of education including e-learning, professional development, and corporate training.",
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 20,
  },
  {
    id: slideId(38),
    slideNumber: 38,
    title: "Scale: Audience Summary (US)",
    content: [
      { type: "text", value: "Assumes 93% LMS Usage" },
      { type: "text", value: "Eligible LMS Users breakdown" },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "critical",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(39),
    slideNumber: 39,
    title: "Scale: Audience Summary (Global)",
    content: [
      {
        type: "text",
        value: "Assumes 55% Of Total Market Is Targetable (LMS/Country)",
      },
      { type: "text", value: "Eligible LMS Users - Global market" },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "critical",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(40),
    slideNumber: 40,
    title: "Scale: Profit Potential",
    content: [
      {
        type: "quote",
        value:
          "What truly matters more than money? A life filled with purpose, growth, and positive impact. The joy of helping others, the strength found in challenges overcome. But also, strong revenue potential.",
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 20,
  },
  {
    id: slideId(41),
    slideNumber: 41,
    title: "Scale: Yearly Profit Potential (US)",
    content: [
      {
        type: "text",
        value: "Discuss earning details in person, multiple targets",
      },
      { type: "text", value: "Freemium assumes $1/m profit per user" },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "critical",
    audiences: ["investor"],
    estimatedTime: 45,
    sensitive: true,
  },
  {
    id: slideId(42),
    slideNumber: 42,
    title: "Scale: Yearly Profit Potential (Global)",
    content: [
      {
        type: "text",
        value: "Discuss earning details in person, multiple targets",
      },
      { type: "text", value: "Freemium assumes $1/m profit per user" },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "critical",
    audiences: ["investor"],
    estimatedTime: 45,
    sensitive: true,
  },
  {
    id: slideId(43),
    slideNumber: 43,
    title: "Scale: Yearly Profit Potential (KC)",
    content: [
      { type: "text", value: "KC 1% Market to 100% Market" },
      {
        type: "text",
        value: "6-12 + Higher Ed Market, Freemium Users Only @0.1$/m",
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "supporting",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(44),
    slideNumber: 44,
    title: "Scale: Yearly Profit Potential (MO)",
    content: [
      { type: "text", value: "MO 1% Market to 100% Market" },
      {
        type: "text",
        value: "6-12 + Higher Ed Market, Freemium Users Only @0.1$/m",
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "supporting",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(45),
    slideNumber: 45,
    title: "Scale: Yearly Profit Potential (MO) - Detailed",
    content: [
      {
        type: "text",
        value: "Assumes User Counts of 60k in Higher Ed and 936,697 in K-12",
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "supporting",
    audiences: ["investor"],
    estimatedTime: 20,
    sensitive: true,
  },
  {
    id: slideId(46),
    slideNumber: 46,
    title: "Scale: Yearly Profit Potential (US) - Updated",
    content: [
      { type: "text", value: "Earning options vary, can adapt as we learn." },
      { type: "text", value: "US 10% Market to 100% Market projections" },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "important",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(47),
    slideNumber: 47,
    title: "Scale: Yearly Profit Potential (Global) - Updated",
    content: [
      { type: "text", value: "Earning options vary, can adapt as we learn." },
      { type: "text", value: "Global 10% Market to 100% Market projections" },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "important",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(48),
    slideNumber: 48,
    title: "Software & Integration Costs Yearly",
    content: [
      { type: "text", value: "Cost breakdown for 0-5000 students and scaling" },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "important",
    audiences: ["investor", "technical"],
    estimatedTime: 45,
    sensitive: true,
  },
  {
    id: slideId(49),
    slideNumber: 49,
    title: "Similar Apps",
    content: [
      {
        type: "text",
        value: "Nope, not really. But I'll give you what I know of.",
      },
      {
        type: "bullets",
        value: [
          "ClassDojo: Social seems to be the primary feature, but PBIS Points as well - 10m+ Downloads",
        ],
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 30,
  },
  {
    id: slideId(50),
    slideNumber: 50,
    title: "Other Relevant Apps",
    content: [
      { type: "text", value: "Not that similar but somewhat:" },
      {
        type: "bullets",
        value: [
          "Kahoot - 50M Downloads, 24m Active users, 11 billion unique participations, Targets gamified learning",
        ],
      },
    ],
    notes: "",
    section: "market",
    assets: [],
    priority: "supporting",
    audiences: ["general", "investor"],
    estimatedTime: 25,
  },

  // ============================================================================
  // GROWTH & MARKETING (Slides 51-58)
  // ============================================================================
  {
    id: slideId(51),
    slideNumber: 51,
    title: "How: Growth Plan & Marketing",
    subtitle: "Strategy for reaching educators and students",
    layout: "section-header",
    content: [
      {
        type: "bullets",
        value: [
          "Development Roadmap",
          "Go-to-Market Strategy",
          "Partner Channels",
          "Scaling Approach",
        ],
      },
    ],
    notes: "",
    section: "growth",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 5,
  },
  {
    id: slideId(52),
    slideNumber: 52,
    title: "Getting Started",
    subtitle: "Development Roadmap & Milestones",
    content: [
      {
        type: "text",
        value:
          "Development Roadmap varies based on funding. Priority is delivering quality features as quickly as possible.",
      },
      {
        type: "bullets",
        value: [
          "Milestone 1: Independent Development – Technology foundation, MVP build",
          "Milestone 2: Team + Validation – Onboard team members, gather feedback, iterate on product",
          "Milestone 3: Marketing Begins – Podcasts, presentations, B2B outreach",
          "Milestone 4: First Schools – Onboard pilot schools, collect real-world data, refine",
          "Milestone 5: Scale – Expand to districts, regions, and beyond",
        ],
      },
    ],
    notes:
      "Roadmap from marketing/roadmap.md - phases designed for iterative validation and growth",
    section: "growth",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 30,
  },
  {
    id: slideId(53),
    slideNumber: 53,
    title: "Go-to-Market Channels",
    subtitle: "Multi-channel approach for maximum reach",
    content: [
      {
        type: "text",
        value: "Scalable distribution through multiple validated channels:",
      },
      {
        type: "bullets",
        value: [
          "Conferences – Educational conferences for direct educator engagement",
          "Online – Podcasts, influencers, video interviews, social media campaigns",
          "Local – Conversations, validation sessions, direct feedback loops",
          "B2B Outreach – Direct outreach to K-12 schools and college campuses",
          "App Marketplaces – Educational app marketplaces for organic discovery",
          "Partner Networks – LMS integrations (Canvas, Blackboard, Google Classroom, Moodle)",
        ],
      },
    ],
    notes:
      "From go-to-market-strategy.md - LMS integration enables global scale across schools using popular learning management systems",
    section: "growth",
    assets: [],
    priority: "important",
    audiences: ["investor"],
    estimatedTime: 30,
  },
  {
    id: slideId(54),
    slideNumber: 54,
    title: "Revenue Model",
    subtitle: "Multiple revenue streams for sustainable growth",
    content: [
      {
        type: "text",
        value:
          "Initially free for districts – focus on families and teachers for early revenue:",
      },
      {
        type: "bullets",
        value: [
          "Subscriptions – Premium features for families, teachers, and schools",
          "Personalization Sales – Character customization, profile upgrades, cosmetic items",
          "Digital Collectibles – AI-generated art, NFTs, and tradeable rewards",
          "Sponsorships – In-game branded items and sponsored rewards",
          "Battle Passes – Additional competitive features and seasonal content",
          "Scholarship Fees – Transaction fees on micro-scholarship disbursements",
        ],
      },
    ],
    notes: "",
    section: "growth",
    assets: [],
    priority: "important",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(55),
    slideNumber: 55,
    title: "Core Product Pillars",
    subtitle: "Five interconnected systems that drive engagement",
    content: [
      {
        type: "bullets",
        value: [
          "Rewardable Events – Assignments, quests, attendance, and achievements trigger rewards",
          "Growth & Progression – XP systems, leveling, skill progression, and milestone tracking",
          "Loot & Rewards – Loot boxes, classroom/school stores, scholarship opportunities",
          "Achievements & Social – Badges, titles, leaderboards, peer recognition",
          "Digital Art & Collectibles – AI-generated art, customizable profiles, tradeable items",
        ],
      },
    ],
    notes:
      "Product pillars designed to work together - each pillar reinforces the others for maximum engagement",
    section: "growth",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 40,
  },
  {
    id: slideId(56),
    slideNumber: 56,
    title: "MVP Starter Version",
    subtitle: "Core features for initial launch and validation",
    content: [
      {
        type: "text",
        value:
          "Phase 1 MVP focuses on core engagement mechanics with room to expand:",
      },
      {
        type: "bullets",
        value: [
          "LMS Integration – Connect to existing Canvas, Blackboard, Google Classroom",
          "Basic Rewards – Loot boxes from assignment completion",
          "Progress Bar – Visual progression toward milestone rewards",
          "Teacher Recognition – Simple acknowledgment system",
          "Parent Portal – Visibility into student achievements",
        ],
      },
    ],
    notes:
      "Iterative release schedule - validate core features before expanding",
    section: "growth",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(57),
    slideNumber: 57,
    title: "Proof of Capability Demo",
    subtitle: "Working prototype demonstrating core technology",
    content: [
      {
        type: "bullets",
        value: [
          "Live LMS integration pulling real assignment data",
          "Reward system triggered by grade submissions",
          "AI-generated art creation from student achievements",
          "Real-time progress tracking and notifications",
        ],
      },
    ],
    notes:
      "Demo showcases technology foundation that can scale to full product",
    section: "growth",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 10,
  },
  {
    id: slideId(58),
    slideNumber: 58,
    title: "Let's Dive In",
    subtitle: "Exploring the world of possibilities",
    content: [
      {
        type: "text",
        value:
          "What does this look like in practice? What can we build on this foundation? What options exist?",
      },
      {
        type: "bullets",
        value: [
          "Reward ecosystems – Multiple sources (teachers, schools, parents, sponsors)",
          "Competition systems – Battles, tournaments, leaderboards",
          "Social features – Profiles, recognition, peer connections",
          "Financial rewards – Micro-scholarships, sponsored prizes",
        ],
      },
      {
        type: "text",
        value: "First, let's open your mind to the world of possibilities.",
      },
    ],
    notes: "Transition slide to deep-dive into specific product features",
    section: "growth",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 15,
  },

  // ============================================================================
  // PRODUCT DEEP DIVE (Slides 59-76)
  // ============================================================================
  {
    id: slideId(59),
    slideNumber: 59,
    title: "Reward Sources",
    subtitle: "Multiple stakeholders providing value to students",
    content: [
      {
        type: "bullets",
        value: [
          "Teacher/Classroom – Custom stores, classroom rewards, recognition points",
          "School/District – School-wide milestones, events, activities, cafeteria perks",
          "Parent/Family – Custom family rewards, allowance integration, goal-setting",
          "Expanse – Digital art, scholarships, lottery tickets, system achievements",
          "Sponsors – Branded rewards, gift cards, real-world prizes",
        ],
      },
    ],
    notes:
      "Each reward source has unique value - teachers drive daily engagement, parents connect home/school, Expanse provides scalable digital rewards",
    section: "product",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(60),
    slideNumber: 60,
    title: "Rewards Earning Concepts",
    subtitle: "Three core reward earning mechanics",
    content: [
      {
        type: "bullets",
        value: [
          "Repeatable Rewards – Loot boxes from each assignment, daily login bonuses",
          "Milestone Rewards – Guaranteed items at progress bar checkpoints (like Starbucks rewards)",
          "Store Purchases – Spend earned currency on classroom, school, or family stores",
        ],
      },
      {
        type: "text",
        value: "Rarity system: Common → Uncommon → Rare → Epic → Legendary",
      },
    ],
    notes:
      "Rarity system creates excitement and surprise - higher grades have better odds of rare rewards",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 25,
  },
  {
    id: slideId(61),
    slideNumber: 61,
    title: "Rewards Redeeming Concepts",
    content: [
      {
        type: "text",
        value:
          'Are You Sure You want to redeem "Cookies!" from "Family"? Yes! -> Confirmation number #30239',
      },
    ],
    notes: "",
    section: "product",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(62),
    slideNumber: 62,
    title: "Teacher To Student Recognition",
    subtitle: "Powerful tool for positive reinforcement",
    content: [
      {
        type: "text",
        value:
          "Teachers can acknowledge and reward students individually or as an entire class:",
      },
      {
        type: "bullets",
        value: [
          "Instant Acknowledgment – Quick recognition during class with digital rewards",
          "Social Display – Recognition shown on student profiles and class feeds",
          "Bonus XP – Recognition events contribute to leveling and progress",
          "Achievement Unlocks – 'Received 5/50/100 teacher recognitions' achievements",
        ],
      },
      {
        type: "text",
        value:
          "Focus on positive reinforcement over punishment - research shows it's more effective.",
      },
    ],
    notes:
      "Teachers frustrated with punishment-only systems get a powerful alternative - replaces 'positive home notes' with scalable digital recognition",
    section: "product",
    assets: [],
    priority: "critical",
    audiences: ["general", "educator"],
    estimatedTime: 35,
  },
  {
    id: slideId(63),
    slideNumber: 63,
    title: "Classroom Milestone Rewards",
    subtitle: "Collaborative goals that unite the classroom",
    content: [
      {
        type: "text",
        value:
          "Classes work together toward shared goals with visible progress:",
      },
      {
        type: "bullets",
        value: [
          "Progress Bar – Fills as students complete assignments and earn high grades",
          "Checkpoint Rewards – Guaranteed rewards at 25%, 50%, 75%, 100%",
          "Class Events – Movie time, game day, pizza party, extra recess",
          "Peer Motivation – Students encourage each other to hit targets",
        ],
      },
    ],
    notes:
      "Classroom rewards create group cohesion and positive peer pressure - the more students participate, the faster rewards unlock",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general", "educator"],
    estimatedTime: 30,
  },
  {
    id: slideId(64),
    slideNumber: 64,
    title: "Classroom Store",
    subtitle: "Teacher-configured reward marketplace",
    content: [
      {
        type: "text",
        value:
          "Teachers set up custom offerings students can purchase with earned currency:",
      },
      {
        type: "bullets",
        value: [
          "Choose Your Seat – Pick seating arrangement for a day",
          "Homework Pass – Skip one homework assignment",
          "Lunch with Teacher – Special meal time",
          "Music Choice – Pick classroom music for the day",
          "Extra Credit Opportunity – Bonus assignment option",
          "Custom Rewards – Teachers add their own ideas",
        ],
      },
    ],
    notes:
      "Teachers can create whatever rewards work for their classroom - system provides suggestions but full customization available",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general", "educator"],
    estimatedTime: 25,
  },
  {
    id: slideId(65),
    slideNumber: 65,
    title: "School-Wide Rewards",
    subtitle: "Building school culture through shared goals",
    content: [
      {
        type: "text",
        value:
          "Schools configure milestones and stores that the entire student body works toward:",
      },
      {
        type: "bullets",
        value: [
          "Free Snacks in Cafeteria – Milestone reward for school-wide completion",
          "Game Tickets – Sports event access as school store item",
          "Movie in Auditorium – Special assembly reward",
          "School Events – Pep rallies, spirit days, special activities",
          "Student of the Week – Wall of fame, honors recognition",
          "Visual Recognition – Hallway screens displaying top achievers",
        ],
      },
    ],
    notes:
      "School rewards scale the concept to the entire institution - creates school-wide culture around achievement",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general", "administrator"],
    estimatedTime: 25,
  },
  {
    id: slideId(66),
    slideNumber: 66,
    title: "Parent & Family Rewards",
    subtitle: "Connecting home and school motivation",
    content: [
      {
        type: "text",
        value:
          "Parents join when students invite them, enabling custom home-based rewards:",
      },
      {
        type: "bullets",
        value: [
          "Custom Goals – Students request goals, parents approve",
          "Family Store – Screen time, gaming, snacks, outings",
          "Allowance Integration – Connect academic performance to spending money",
          "Visibility – Parents see achievements, grades, and teacher recognition",
          "Donations – Parents can contribute to classroom/school reward pools",
        ],
      },
    ],
    notes:
      "Parents prefer donating to help their specific child rather than school-wide - family rewards enable personal investment",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 25,
  },
  {
    id: slideId(67),
    slideNumber: 67,
    title: "Quests & Missions",
    subtitle: "Clear goals with guaranteed rewards",
    content: [
      {
        type: "text",
        value:
          "Quests: Clear, specific goals with defined rewards upon completion.",
      },
      {
        type: "bullets",
        value: [
          "Daily Quests – Login, check grades, complete 1 assignment",
          "Weekly Quests – Complete 5 assignments, earn 3 recognitions",
          "Challenge Quests – Score >90% on 3 assignments in a row",
          "Seasonal Quests – Special limited-time goals with rare rewards",
        ],
      },
      {
        type: "text",
        value:
          "Quests provide guidance and structure while gamifying the learning journey.",
      },
    ],
    notes:
      "Quest system borrowed from gaming - provides constant goals and a reason to log in daily",
    section: "product",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(68),
    slideNumber: 68,
    title: "Quest Examples",
    subtitle: "Sample goals across categories",
    content: [
      {
        type: "bullets",
        value: [
          "📚 Academic: Complete 10 assignments, score >90% on 5 tests",
          "✅ Attendance: Attend 5 days in a row, perfect week attendance",
          "🌟 Recognition: Receive teacher recognition 3 times this week",
          "🏆 Competition: Win a class battle, rank top 10 in your grade",
          "🔄 Consistency: Submit homework on time for 2 weeks straight",
          "📈 Improvement: Raise grade by 10% in any subject",
        ],
      },
    ],
    notes:
      "Quests span multiple engagement areas - not just grades but attendance, participation, and improvement",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(69),
    slideNumber: 69,
    title: "Achievements & Badges",
    subtitle: "Long-term goals that celebrate accomplishment",
    content: [
      {
        type: "text",
        value:
          "Achievements: Milestone accomplishments that unlock badges, titles, and rewards.",
      },
      {
        type: "bullets",
        value: [
          "Tiered Achievements – Complete 10/100/1000 assignments",
          "Speed Achievements – Complete 10 assignments in one week",
          "Streak Achievements – 7/30/100 day login streak",
          "Recognition Achievements – Receive 5/50/500 teacher recognitions",
          "Competition Achievements – Win 10/50/100 battles",
        ],
      },
    ],
    notes:
      "Achievements provide long-term goals and a sense of accumulating progress - also serve as guidance for what students can work toward",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 25,
  },
  {
    id: slideId(70),
    slideNumber: 70,
    title: "The Problem with Annual Progress",
    subtitle: "Why current systems fail to motivate",
    content: [
      {
        type: "text",
        value:
          "Reaching the next grade level once per year is not enough. Humans need faster feedback loops.",
      },
      {
        type: "bullets",
        value: [
          "Video games level up players every 15-60 minutes",
          "Social media provides instant likes and validation",
          "Starbucks rewards after every few purchases",
          "School? One promotion per year, grades weeks later",
        ],
      },
      {
        type: "text",
        value: "We bridge this gap with continuous progression systems.",
      },
    ],
    notes:
      "Core insight: school feedback loops are too slow for modern attention spans - we need to compress the reward cycle",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 25,
  },
  {
    id: slideId(71),
    slideNumber: 71,
    title: "Progress Bar System",
    subtitle: "Visual progression with checkpoint rewards",
    content: [
      {
        type: "text",
        value:
          "Phase 1: Repeatable Progress Bar (similar to Starbucks/Panera rewards)",
      },
      {
        type: "bullets",
        value: [
          "Assignment completion fills the progress bar",
          "Checkpoints at 25%/50%/75%/100% provide guaranteed rewards",
          "Bar resets after completion for repeatable engagement",
          "Higher grades fill bar faster (incentivize quality)",
        ],
      },
      {
        type: "text",
        value:
          "Students always know exactly how close they are to their next reward.",
      },
    ],
    notes:
      "Progress bars create constant forward momentum - students can see exactly how much effort until next reward",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(72),
    slideNumber: 72,
    title: "Experience & Leveling System",
    subtitle: "RPG-style progression tracking",
    content: [
      {
        type: "text",
        value: "Example: Level 17 — Experience: 62/66 XP",
      },
      {
        type: "bullets",
        value: [
          "Overall Level – Total experience across all activities",
          "Subject Levels – Math, Science, English, etc. (like skill trees)",
          "Class Levels – Groups earn XP together",
          "Evolution Points – Major milestones unlock new abilities/content",
        ],
      },
      {
        type: "text",
        value:
          "Teachers and classrooms also level up – everyone grows together.",
      },
    ],
    notes:
      "From progression-and-leveling.md - multiple progression dimensions keep engagement high across different activities",
    section: "product",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(73),
    slideNumber: 73,
    title: "Extended Functionality and Expansions",
    content: [{ type: "text", value: "Transition to extended features" }],
    notes: "",
    section: "product",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 5,
  },
  {
    id: slideId(74),
    slideNumber: 74,
    title: "Digital Art & Collectibles",
    subtitle: "AI-generated rewards that students own",
    content: [
      {
        type: "text",
        value:
          "AI-generated art with unique titles and descriptions as loot box rewards:",
      },
      {
        type: "bullets",
        value: [
          "Unique Artwork – AI generates one-of-a-kind images",
          "Rarity Tiers – Common to Legendary with visual distinctions",
          "Collectible Albums – Organize and display collections",
          "Trading System – Students can trade with each other",
          "Profile Display – Showcase favorite pieces on profile",
          "NFT Option – Premium items can be minted as blockchain tokens",
        ],
      },
    ],
    notes:
      "Digital art creates lasting value students own - can be traded, displayed, and collected over their academic career",
    section: "product",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(75),
    slideNumber: 75,
    title: "Competition Philosophy",
    subtitle: "Healthy competition designed for mental health",
    content: [
      {
        type: "text",
        value: "Competition designed to support, not harm, mental health:",
      },
      {
        type: "bullets",
        value: [
          "Team-Based Focus – Highlight teams, not just individuals",
          "Rotating Teams – Mix high and low performers so everyone wins",
          "Participation Rewards – Everyone earns something for competing",
          "Anonymous Options – Usernames instead of real names",
          "Failure Is Safe – Losing doesn't cost progression or rewards",
        ],
      },
      {
        type: "text",
        value:
          "Goal: Create the thrill of competition without the damage of constant comparison.",
      },
    ],
    notes:
      "Research shows small risk exposure develops tolerance - key is designing competition that doesn't create 'if you're not #1 you're worthless' mentality",
    section: "product",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(76),
    slideNumber: 76,
    title: "Battle & Competition Types",
    subtitle: "Multiple ways to engage competitive spirits",
    content: [
      {
        type: "text",
        value:
          "People love competition. Sports are popular for a reason. Let's harness that energy:",
      },
      {
        type: "bullets",
        value: [
          "PvP – Student vs Student (individual grade comparison)",
          "Class vs Class – Period 1 vs Period 7 completion rates",
          "School vs School – Regional and national competitions",
          "PvE – Classes battle AI 'bosses' through collective performance",
          "Team Dungeons – Small groups explore challenges together",
          "Tournaments – Seasonal events with scholarship prizes",
        ],
      },
    ],
    notes:
      "From battles-and-competition.md - multiple competition types appeal to different student preferences and comfort levels",
    section: "product",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 35,
  },

  // ============================================================================
  // EXTENDED FEATURES (Slides 77-92)
  // ============================================================================
  {
    id: slideId(77),
    slideNumber: 77,
    title: "Micro-Scholarships & Essence System",
    subtitle: "Real financial rewards for academic achievement",
    content: [
      {
        type: "text",
        value:
          "Expanse rewards students with scholarship funding to acknowledge achievement:",
      },
      {
        type: "bullets",
        value: [
          "Micro-Scholarships – Small frequent rewards ($5-50) for consistent performance",
          "Competition Prizes – Larger amounts for tournament winners",
          "University Partnerships – Colleges offer admission advantages and funding",
          "Lottery System – Performance earns 'essence' for scholarship drawings",
          "Sponsorship Pools – Corporate sponsors fund student rewards",
        ],
      },
      {
        type: "text",
        value:
          "Higher ELO/ranking = better odds, but opportunities exist for all students.",
      },
    ],
    notes:
      "From scholarships.md - even limited early scholarship opportunities provide powerful marketing and motivation",
    section: "features",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 35,
  },
  {
    id: slideId(78),
    slideNumber: 78,
    title: "Teacher & Staff Rewards",
    subtitle: "Schools can reward educators too",
    content: [
      {
        type: "text",
        value: "Districts configure reward systems for teachers and staff:",
      },
      {
        type: "bullets",
        value: [
          "Recognition Programs – Public acknowledgment of great teaching",
          "Performance Bonuses – Tied to student engagement metrics",
          "Professional Development – Free courses and conference access",
          "Classroom Budgets – Extra funding for supplies and activities",
          "Peer Recognition – Teachers acknowledge each other",
        ],
      },
    ],
    notes:
      "Teachers also earn XP and level up - the system rewards educators, not just students",
    section: "features",
    assets: [],
    priority: "important",
    audiences: ["general", "administrator"],
    estimatedTime: 25,
  },
  {
    id: slideId(79),
    slideNumber: 79,
    title: "Social Features Overview",
    subtitle: "Recognition and acknowledgment systems",
    content: [
      {
        type: "text",
        value: "Safe social features with appropriate privacy controls:",
      },
      {
        type: "bullets",
        value: [
          "Screen Names – Content-appropriate usernames (not real names)",
          "Visibility Options – Students control what's public/private",
          "Teacher Recognition – Acknowledge good work with rewards",
          "Peer Recognition – Students can congratulate classmates",
          "Achievement Feeds – Classroom activity streams",
        ],
      },
      {
        type: "text",
        value:
          "Students can even request recognition from teachers for participation.",
      },
    ],
    notes:
      "From feedback-recognition-acknowledgement.md - multiple recognition sources create a culture of positive reinforcement",
    section: "features",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(80),
    slideNumber: 80,
    title: "Student Profiles",
    subtitle: "Personalized digital identity",
    content: [
      {
        type: "text",
        value:
          "Students build a personal profile they customize and optionally share:",
      },
      {
        type: "bullets",
        value: [
          "Character/Avatar – Customizable appearance with earned equipment",
          "Achievement Wall – Display earned badges and titles",
          "Statistics Dashboard – Grades, completion rates, win/loss records",
          "Art Gallery – Showcase collected digital art and NFTs",
          "Titles & Badges – Earned titles displayed next to username",
          "Activity Feed – Recent accomplishments and milestones",
        ],
      },
    ],
    notes:
      "Profiles give students ownership of their academic journey - a permanent record of achievements they control",
    section: "features",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(81),
    slideNumber: 81,
    title: "Leaderboards & Spotlight",
    subtitle: "Celebrating top performers",
    content: [
      {
        type: "text",
        value:
          "Multiple leaderboard categories highlighting different strengths:",
      },
      {
        type: "bullets",
        value: [
          "Battle Rankings – Top competitors by win rate and ELO",
          "Subject Leaders – Best performers in Math, Science, English, etc.",
          "Recognition Leaders – Most teacher acknowledgments received",
          "Completion Champions – Highest assignment completion rates",
          "Improvement Stars – Biggest grade improvements this week/month",
          "Level Leaders – Highest XP and fastest levelers",
        ],
      },
    ],
    notes:
      "Multiple leaderboards mean multiple ways to 'win' - every student can find a category where they excel",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 25,
  },
  {
    id: slideId(82),
    slideNumber: 82,
    title: "Rethinking Assessment",
    subtitle: "Beyond flat GPA scores",
    content: [
      {
        type: "text",
        value:
          "What if assessment focused on growth and comparison rather than fixed grades?",
      },
      {
        type: "bullets",
        value: [
          "Relative Performance – How do you compare to similar students?",
          "Growth Metrics – How much have you improved this semester?",
          "Skill Mastery – What specific competencies have you demonstrated?",
          "Effort Recognition – Completion and participation, not just correctness",
        ],
      },
      {
        type: "text",
        value:
          "This approach empowers teachers to focus on helping students grow.",
      },
    ],
    notes:
      "Alternative to pure GPA-based assessment - gives more nuanced view of student progress and potential",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general", "educator"],
    estimatedTime: 25,
  },
  {
    id: slideId(83),
    slideNumber: 83,
    title: "Consequences (Optional)",
    subtitle: "Gentle negative reinforcement when needed",
    content: [
      {
        type: "text",
        value:
          "Focus is on positive reinforcement, but optional consequences for teachers who need them:",
      },
      {
        type: "bullets",
        value: [
          "Reduced Earnings – Lower coin multiplier for missed assignments",
          "Store Cooldown – Can't purchase rewards for a period",
          "Limited Options – Fewer reward choices available",
          "Team Impact – Reduced contribution to class progress bar",
          "Never Loss – Students don't lose what they've already earned",
        ],
      },
      {
        type: "text",
        value: "Goal: Reduce opportunity cost, not take away achievements.",
      },
    ],
    notes:
      "Research shows positive reinforcement works better than punishment - these are last-resort options for frustrated teachers",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general", "educator"],
    estimatedTime: 25,
  },
  {
    id: slideId(84),
    slideNumber: 84,
    title: "Chat & Announcements",
    subtitle: "Safe classroom communication",
    content: [
      {
        type: "text",
        value:
          "Interactive communication channels with appropriate safety controls:",
      },
      {
        type: "bullets",
        value: [
          "Classroom Feeds – Achievement announcements, milestones, recognitions",
          "School Announcements – District-wide news and events",
          "Event Notifications – Battle results, tournament updates",
          "Moderated Chat – Teacher-controlled discussion options",
          "Celebration Moments – Auto-posted rare loot drops, achievements",
        ],
      },
    ],
    notes:
      "Communication features enable community building while maintaining appropriate safety controls",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(85),
    slideNumber: 85,
    title: "Social Sharing",
    subtitle: "Celebrate achievements beyond the app",
    content: [
      {
        type: "text",
        value: "Optional sharing of achievements to external platforms:",
      },
      {
        type: "bullets",
        value: [
          "Achievement Cards – Shareable graphics for milestones",
          "Profile Badges – Embed-ready badges for college applications",
          "Art Showcase – Share collected digital art to social media",
          "Certificates – Downloadable/printable achievement certificates",
          "Parent Sharing – Parents can share child's accomplishments",
        ],
      },
    ],
    notes:
      "Social sharing creates organic marketing while letting students celebrate achievements publicly",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 15,
  },
  {
    id: slideId(86),
    slideNumber: 86,
    title: "Rarity & Powerups System",
    subtitle: "Collectible items with real benefits",
    content: [
      {
        type: "text",
        value: "Rewards come with rarity tiers and provide in-game benefits:",
      },
      {
        type: "bullets",
        value: [
          "Common → Uncommon → Rare → Epic → Legendary",
          "XP Boosters – +10% experience for 7 days",
          "Scholarship Odds – +1-3% chance to win scholarship drawings",
          "Cosmetic Upgrades – Rare profile customizations",
          "Battle Buffs – Temporary competitive advantages",
        ],
      },
      {
        type: "text",
        value: "Higher grades = better odds of rare drops.",
      },
    ],
    notes:
      "Rarity system creates excitement around loot - the variable reward schedule is highly engaging",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(87),
    slideNumber: 87,
    title: "Skills & Attributes",
    subtitle: "RPG-style character stats from academics",
    content: [
      {
        type: "text",
        value: "Academic performance translates to leveled skill attributes:",
      },
      {
        type: "bullets",
        value: [
          "Level 41: Writing – English class performance",
          "Level 99: Problem Solving – Math and logic courses",
          "Level 99: Creativity – Art and creative projects",
          "Level 4: Reading Comprehension – Reading assessments",
          "Level 41: Knowledge – Science and history",
          "Level 1: Memory – Retention and recall exercises",
        ],
      },
      {
        type: "text",
        value:
          "Skills visualize strengths and growth areas like a character sheet.",
      },
    ],
    notes:
      "Skill attributes make abstract 'learning' concrete and visible - students can see themselves grow",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 25,
  },
  {
    id: slideId(88),
    slideNumber: 88,
    title: "Possible Extensions",
    subtitle: "Future opportunities and additional features",
    layout: "section-header",
    content: [
      {
        type: "bullets",
        value: [
          "Reward System Expansions",
          "Advanced Analytics",
          "Partner Integrations",
          "Community Features",
        ],
      },
    ],
    notes: "",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 5,
  },
  {
    id: slideId(89),
    slideNumber: 89,
    title: "Riskier/More Complex Options",
    content: [
      {
        type: "text",
        value:
          "But additional value and motivation. Lots of options exist for offering rewards, and I want to maximize value to students.",
      },
    ],
    notes: "",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(90),
    slideNumber: 90,
    title: "Additional Reward Options",
    content: [
      { type: "text", value: "Local/Global Sponsors" },
      {
        type: "bullets",
        value: [
          "Obtained by: Purchasing with Expanse Currency",
          "Purchasable and auto redeemable through chests",
          "Examples include local business gift cards and prizes",
        ],
      },
    ],
    notes: "",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general", "investor"],
    estimatedTime: 30,
  },
  {
    id: slideId(91),
    slideNumber: 91,
    title: "Lotteries",
    content: [
      {
        type: "text",
        value:
          "Can have lottery wheels and drawings for winning in game items, art, scholarships, or other fun things.",
      },
    ],
    notes: "",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 20,
  },
  {
    id: slideId(92),
    slideNumber: 92,
    title: "Additional Reward Options: Educational Content",
    content: [
      {
        type: "bullets",
        value: [
          "Difficulty: Medium-Hard",
          "Scale: Global or Localized",
          "Risk: Medium-High",
          "Value: Medium-High",
          "Potential Audience: All",
        ],
      },
    ],
    notes: "",
    section: "features",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 25,
  },

  // ============================================================================
  // EXTENSIONS & FUTURE (Slides 93-100)
  // ============================================================================
  {
    id: slideId(93),
    slideNumber: 93,
    title: "Statistics & Analytics",
    content: [
      {
        type: "bullets",
        value: [
          "Grades / Performance against other students",
          "Relative to classes students are in instead of straight GPA",
          "Growth tracking and insights",
        ],
      },
    ],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "supporting",
    audiences: ["general", "educator", "administrator"],
    estimatedTime: 30,
  },
  {
    id: slideId(94),
    slideNumber: 94,
    title: "Sneak Peak: Early Mockups",
    content: [{ type: "text", value: "Visual mockups of the application" }],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(95),
    slideNumber: 95,
    title: "Competitors",
    content: [{ type: "text", value: "<15-25 min pitch>, WIP" }],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "supporting",
    audiences: ["general", "investor"],
    estimatedTime: 60,
  },
  {
    id: slideId(96),
    slideNumber: 96,
    title: "Demo",
    content: [{ type: "text", value: "Live demonstration" }],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 120,
  },
  {
    id: slideId(97),
    slideNumber: 97,
    title: "Recap 100",
    content: [{ type: "text", value: "Summary and key takeaways" }],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 45,
  },
  {
    id: slideId(98),
    slideNumber: 98,
    title: "Explore Further: More Gamification, Value, and Engagement",
    content: [
      { type: "text", value: "Interested in Learning More? Let's talk." },
    ],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 15,
  },
  {
    id: slideId(99),
    slideNumber: 99,
    title: "Competition",
    content: [
      { type: "text", value: "Little to no competition, but high demand." },
      {
        type: "text",
        value:
          "Class Dojo is used by 1 in 5 families in the US targeting K-8 students. Their primary feature set is social.",
      },
    ],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "important",
    audiences: ["general", "investor"],
    estimatedTime: 30,
  },
  {
    id: slideId(100),
    slideNumber: 100,
    title: "Questions?",
    content: [{ type: "text", value: "Q&A Session" }],
    notes: "",
    section: "extensions",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 300,
  },

  // ============================================================================
  // CLOSING (Slides 101-112)
  // ============================================================================
  {
    id: slideId(101),
    slideNumber: 101,
    title: "Sources: Student Engagement",
    content: [
      {
        type: "bullets",
        value: [
          "https://www.gallup.com/education/244022/school-engagement-talk.aspx",
          "Mental health: https://www.ncbi.nlm.nih.gov/books/NBK587174/",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "appendix",
    audiences: ["general"],
    estimatedTime: 15,
  },
  {
    id: slideId(102),
    slideNumber: 102,
    title: "Sources Continued",
    content: [
      {
        type: "bullets",
        value: [
          "Google Classroom Usage Statistics: https://blog.google/outreach-initiatives/education/classroom-roadmap/",
          "Canvas Usage Statistics",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "appendix",
    audiences: ["general"],
    estimatedTime: 15,
  },
  {
    id: slideId(103),
    slideNumber: 103,
    title: "Sources",
    content: [
      {
        type: "bullets",
        value: [
          "Entertainment Software Industry gaming statistics https://www.theesa.com/resources/essential-facts-about-the-us-video-game-industry/2024-data/",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "appendix",
    audiences: ["general"],
    estimatedTime: 15,
  },
  {
    id: slideId(104),
    slideNumber: 104,
    title: "Reward Flow Diagram 1",
    content: [
      {
        type: "bullets",
        value: [
          "Rewardable Event or Level Up",
          "Scholarship Opportunities",
          "Loot & Sponsorships",
          "Achievements & Recognition",
          "NFTs & Digital Art",
          "Competition & Perks",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(105),
    slideNumber: 105,
    title: "Reward Flow Diagram 2",
    content: [
      {
        type: "bullets",
        value: [
          "Rewardable Event or Level Up",
          "Scholarship Opportunities",
          "Loot & Sponsorships",
          "Achievements & Recognition",
          "NFTs & Digital Art",
          "Competition & Perks",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(106),
    slideNumber: 106,
    title: "Complete Reward Flow",
    content: [
      {
        type: "bullets",
        value: [
          "Level Up or Rewardable Event",
          "Experience + Coins + Gems",
          "Scholarship Opportunities",
          "Recognition",
          "Rewards & Swag",
          "Achievements",
          "NFTs & Digital Art",
          "Personalization & Gaming",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "important",
    audiences: ["general"],
    estimatedTime: 45,
  },
  {
    id: slideId(107),
    slideNumber: 107,
    title: "Simplified Reward Flow",
    content: [
      {
        type: "bullets",
        value: [
          "Level Up or Rewardable Event",
          "Scholarship Opportunities",
          "Rewards & Swag",
          "Achievements & Recognition",
          "NFTs & Digital Art",
          "Personalization & Gaming",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "supporting",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(108),
    slideNumber: 108,
    title: "Scale: Profit Potential (Starting with HS Age)",
    content: [
      { type: "text", value: "15 Million US Students on LMS" },
      {
        type: "bullets",
        value: [
          "10% @ $1/m = $18m/year",
          "@$10/m = $180m/year",
          "30% @ $1/m = $54m/year",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "important",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(109),
    slideNumber: 109,
    title: "Scale: Profit Potential (All)",
    content: [
      { type: "text", value: "15 Million US Students on LMS - All segments" },
      {
        type: "bullets",
        value: [
          "10% @ $1/m = $18m/year",
          "@$10/m = $180m/year",
          "30% @ $1/m = $54m/year",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "important",
    audiences: ["investor"],
    estimatedTime: 30,
    sensitive: true,
  },
  {
    id: slideId(110),
    slideNumber: 110,
    title: "Thank You",
    content: [{ type: "text", value: "Closing remarks" }],
    notes: "",
    section: "closing",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 30,
  },
  {
    id: slideId(111),
    slideNumber: 111,
    title: "Contact Information",
    content: [
      {
        type: "bullets",
        value: [
          "Matthew McKeller",
          "https://www.expanseservices.com",
          "/in/MattMckeller",
        ],
      },
    ],
    notes: "",
    section: "closing",
    assets: [],
    priority: "critical",
    audiences: ["general"],
    estimatedTime: 15,
  },
  {
    id: slideId(112),
    slideNumber: 112,
    title: "Appendix",
    content: [{ type: "text", value: "Additional materials and references" }],
    notes: "",
    section: "closing",
    assets: [],
    priority: "appendix",
    audiences: ["general"],
    estimatedTime: 10,
  },
]

export const getSlideById = (id: string): Slide | undefined => {
  return slides.find((slide) => slide.id === id)
}

export const getSlideByNumber = (num: number): Slide | undefined => {
  return slides.find((slide) => slide.slideNumber === num)
}

export const getSlidesBySection = (section: SectionType): Slide[] => {
  return slides.filter((slide) => slide.section === section)
}

export const getCriticalSlides = (): Slide[] => {
  return slides.filter((slide) => slide.priority === "critical")
}

export const getNonSensitiveSlides = (): Slide[] => {
  return slides.filter((slide) => !slide.sensitive)
}

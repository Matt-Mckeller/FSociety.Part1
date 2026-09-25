import { Quiz } from "@/types"

export const communicationQuiz: Quiz = {
  id: "session-quiz-1",
  title: "Understanding Check",
  description:
    "Test your understanding of the key concepts from this communication session. Each question links back to the relevant content for review.",
  passingScore: 70,
  questions: [
    // M1: Reality Reframe Questions (4 questions)
    {
      id: "q1",
      type: "multiple-choice",
      question:
        "What mindset causes feelings of urgency, fear, and self-doubt about being unmarried at 27?",
      options: [
        { id: "q1-a", text: "Growth mindset", isCorrect: false },
        { id: "q1-b", text: "Scarcity mindset", isCorrect: true },
        { id: "q1-c", text: "Fixed mindset", isCorrect: false },
        { id: "q1-d", text: "Competitive mindset", isCorrect: false },
      ],
      explanation:
        "The scarcity mindset creates beliefs like 'I'm behind,' 'my clock is running out,' and 'I wasted my 20s.' The reframe shifts to an ABUNDANCE mindset: 'No kids = freedom to choose,' 'Not trapped in a wrong marriage,' and '27 is prime.'",
      relatedMessageId: "m1",
      relatedBlockId: "m1-b3",
      psychApproachStep: 1,
      difficulty: "easy",
    },
    {
      id: "q2",
      type: "multiple-choice",
      question:
        "Why are gamer/developer women considered valuable in the dating market?",
      options: [
        { id: "q2-a", text: "They make more money than average", isCorrect: false },
        { id: "q2-b", text: "They're rare - supply is limited while demand is high", isCorrect: true },
        { id: "q2-c", text: "They're always available to date", isCorrect: false },
        { id: "q2-d", text: "Gaming skills transfer to relationships", isCorrect: false },
      ],
      explanation:
        "Developers and gamers love other developers and gamers, but women in this space are rare. It's basic supply and demand - limited supply + high interest = high value. This rarity is a superpower in the dating market.",
      relatedMessageId: "m1",
      relatedBlockId: "m1-b5",
      psychApproachStep: 2,
      difficulty: "medium",
    },
    {
      id: "q3",
      type: "multiple-choice",
      question:
        "What cognitive pattern do developers often develop from their work that affects self-perception?",
      options: [
        { id: "q3-a", text: "Optimism bias - seeing everything positively", isCorrect: false },
        { id: "q3-b", text: "Confirmation bias - only seeing what they expect", isCorrect: false },
        { id: "q3-c", text: "Negativity bias - trained to find bugs and problems", isCorrect: true },
        { id: "q3-d", text: "Anchoring bias - fixating on first impressions", isCorrect: false },
      ],
      explanation:
        "Developers are trained to find bugs, errors, and problems in code. This 'find the flaw' mindset bleeds into self-perception, resulting in lower confidence and constantly seeing negatives rather than positives. It's a occupational hazard of problem-solving professions.",
      relatedMessageId: "m1",
      relatedBlockId: "m1-b5a",
      psychApproachStep: 1,
      difficulty: "medium",
    },
    {
      id: "q4",
      type: "true-false",
      question:
        "Getting married early usually leads to better long-term relationship outcomes.",
      correctAnswer: false,
      explanation:
        "Many people who marry too early get stuck in relationships that make them miserable. They don't yet understand themselves or what they want. The 'ape temptation' to marry and have kids ASAP often results in complications: arguments, financial struggle, and 'what if' regrets. Intentional timing leads to better outcomes.",
      relatedMessageId: "m1",
      relatedBlockId: "m1-b6",
      psychApproachStep: 3,
      difficulty: "easy",
    },

    // M2: Assessment Summary Questions (3 questions)
    {
      id: "q5",
      type: "multiple-choice",
      question:
        "What communication approach works best for people who process information visually/associatively?",
      options: [
        { id: "q5-a", text: "Long verbal explanations with detailed reasoning", isCorrect: false },
        { id: "q5-b", text: "Bullet points and numbered lists only", isCorrect: false },
        { id: "q5-c", text: "Storytelling, visual metaphors, and imagery that can be pictured", isCorrect: true },
        { id: "q5-d", text: "Direct emotional questions", isCorrect: false },
      ],
      explanation:
        "The storytelling method uses a product design and creative approach to help visualize concepts using a different part of the brain than standard verbal (purely linguistic) approaches. It focuses on communication that can be turned into images in your head, playing to trained developer strengths.",
      relatedMessageId: "m2",
      relatedBlockId: "m2-b0",
      psychApproachStep: 4,
      difficulty: "medium",
    },
    {
      id: "q6",
      type: "multiple-choice",
      question: "How can dissociation be reframed from a defense mechanism?",
      options: [
        { id: "q6-a", text: "As a personality flaw to overcome", isCorrect: false },
        { id: "q6-b", text: "As a superpower for focus and protection", isCorrect: true },
        { id: "q6-c", text: "As a sign of weakness", isCorrect: false },
        { id: "q6-d", text: "As something to suppress entirely", isCorrect: false },
      ],
      explanation:
        "Being good at association/dissociation can be reframed as a superpower. It's a skill that protects you and can be channeled productively. The goal isn't to eliminate defense mechanisms but to understand them and choose when to use them consciously.",
      relatedMessageId: "m2",
      relatedBlockId: "m2-b2",
      psychApproachStep: 4,
      difficulty: "medium",
    },
    {
      id: "q7",
      type: "true-false",
      question:
        "Being reserved about sharing personal trauma with new people is unusual and indicates a problem.",
      correctAnswer: false,
      explanation:
        "While many people open up quickly and share their trauma, being more reserved isn't problematic - it can indicate healthy boundaries or past experiences that taught caution. It's not unusual; it's a different response pattern that may relate to personality traits or protective mechanisms.",
      relatedMessageId: "m2",
      relatedBlockId: "m2-b0b",
      psychApproachStep: 4,
      difficulty: "easy",
    },

    // M3: Wealth & Goals Questions (3 questions)
    {
      id: "q8",
      type: "multiple-choice",
      question: "What are the three types of wealth mentioned in the session?",
      options: [
        { id: "q8-a", text: "Cash, assets, and investments", isCorrect: false },
        { id: "q8-b", text: "Health, happiness, and relationships", isCorrect: false },
        { id: "q8-c", text: "Financial wealth, knowledge/information, and time", isCorrect: true },
        { id: "q8-d", text: "Income, savings, and property", isCorrect: false },
      ],
      explanation:
        "There are multiple types of wealth beyond money: 1) Financial wealth, 2) Knowledge and information (which can be quite valuable), and 3) Time (another incredibly valuable currency). Focusing only on money misses the full picture of what makes someone 'wealthy.'",
      relatedMessageId: "m3",
      relatedBlockId: "m3-b1",
      psychApproachStep: 1,
      difficulty: "easy",
    },
    {
      id: "q9",
      type: "multiple-choice",
      question:
        "According to the session, what is the 'easiest and most straightforward' way to become wealthy?",
      options: [
        { id: "q9-a", text: "Starting a business", isCorrect: false },
        { id: "q9-b", text: "Investing in stocks", isCorrect: false },
        { id: "q9-c", text: "Getting a high-paying job", isCorrect: false },
        { id: "q9-d", text: "Not wasting money", isCorrect: true },
      ],
      explanation:
        "The simplest path to wealth is often overlooked: don't waste money. Before focusing on earning more, focus on keeping what you have. This is the most straightforward and attainable approach, available to anyone regardless of income level.",
      relatedMessageId: "m3",
      relatedBlockId: "m3-b1",
      psychApproachStep: 1,
      difficulty: "hard",
    },
    {
      id: "q10",
      type: "multiple-choice",
      question:
        "Which described outcome involves helping with product design and potentially joining business ventures?",
      options: [
        { id: "q10-a", text: "The 'Friendship' scenario - wealthy supportive friend", isCorrect: false },
        { id: "q10-b", text: "The 'Business' scenario - product design input and team membership", isCorrect: true },
        { id: "q10-c", text: "The 'Romantic' scenario - life partner possibility", isCorrect: false },
        { id: "q10-d", text: "The 'Nothing' scenario - paths diverge", isCorrect: false },
      ],
      explanation:
        "The business outcome involves: signing on and joining in, contributing product design work, and potentially being named on funding submissions. It's distinct from the friendship (support/connection), romantic (life partner), or nothing (paths diverge) outcomes.",
      relatedMessageId: "m3",
      relatedBlockId: "m3-b2",
      psychApproachStep: 2,
      difficulty: "medium",
    },
  ],
}

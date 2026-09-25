export type HomeContentSchema = {
  intro: {
    title: string
    body: string
  }
  problemSolutionStory: {
    title: string
    paragraphs: string[]
  }[]
  purpose: { title: string; body: { label: string; description: string }[] }
  advantages: { title: string; body: { label: string; description: string }[] }
  audience: { title: string; body: string }
  additionalGoals: {
    title: string
    details: { label: string; body: string }[]
  }
  gamificationEngagement: {
    title: string
    body: string
    animation: { left: string; right: string; center: string[] }
  }
  curtains: {
    title: string
    body: string
  }
  contact: {
    title: string
    buttonText: string
  }
  thankYou: {
    text: string
  }
}

export const HomeContent: {
  [key: string]: HomeContentSchema
} = {
  en: {
    intro: {
      title: "Unlocking learning potential",
      // body: "Expanse empower’s our students, teachers, and families giving them modern tools and technology to enrich the educational journey.",
      body: "Expanse empower’s our students, teachers, and families giving them modern tools and technology to take education to the next level.",
    },
    purpose: {
      title: "Our Purpose",
      body: [
        {
          label: "Ignite a passion for learning",
          description:
            "Making education fun and engaging so students are excited to come to school every day.",
        },
        {
          label: "Amplify Engagement",
          description:
            "Make the existing classroom environment more engaging through gamification.",
        },
        {
          label: "Boost Academic Performance",
          description:
            "Unlocking learning potential and motivating students to be all they can be while improving learning comprehension and information retention.",
        },
        {
          label: "Improve Attendance",
          description:
            "Create a learning environment students love while encouraging regular attendance.",
        },
        {
          label: "Maximize Learning",
          description:
            "Expanse boosts motivation and engagement, leading to deeper learning and retention.",
        },
        {
          label: "Enhance Student Well-being",
          description:
            "Cultivate positive and supportive environments for all.",
        },
      ],
    },
    problemSolutionStory: [
      {
        title: "Engagement, Boosted.",
        paragraphs: [
          `**In a world of instant gratification, the rewards of education can seem distant and abstract.** We are competing with the allure of immediate pleasure, the dopamine rush of likes and modern entertainment.`,
          `**Expanse gives you the tools to fight back.**`,
        ],
      },
      {
        title: "Fulfillment, Achieved.",
        paragraphs: [
          `**Empty desks tell a story of unmet needs.** When students struggle to focus, lack a sense of purpose, or face challenges with their mental, emotional, or physical well-being school becomes a battleground, not a place of learning.`,
          `**Expanse empowers students to focus their attention, discover their purpose, and rediscover the joy of learning.**`,
        ],
      },
      {
        title: "Progress & Potential, Visualized.",
        paragraphs: [
          `**A mind clouded by doubt cannot soar.** Negative beliefs about oneself, clip the wings of potential. We must nurture self-belief and empower our students to see the incredible possibilities that lie within them.`,
          `**Expanse helps students recognize their growth and potential, and believe in their ability to succeed.**`,
        ],
      },
    ],
    advantages: {
      title: "Key Advantages",
      body: [
        {
          label: "Seamless Integration",
          description: "Expanse enhances your existing workflows and tools.",
        },
        {
          label: "Simple Setup, Lasting Impact",
          description:
            "Get started quickly and let Expanse do the heavy lifting.",
        },
        {
          label: "Adaptable to your needs",
          description: "Expanse is designed to be flexible and customizable.",
        },
        {
          label: "Easy to Use",
          description:
            "Expanse aims to maximize the user experience with simple and intuitive interfaces.",
        },
      ],
    },
    audience: {
      title: "Who is this for?",
      body: "Grades K-12 and Higher Education, starting with in the U.S. and expanding worldwide. All Students and their families, teachers, and schools.",
    },
    additionalGoals: {
      title: "Targets",
      details: [
        {
          label: "Teaching purpose",
          body: "Connecting education to real-world and personal relevance to improve engagement and perception.",
        },
        // {
        //   label: "Healthy Competition",
        //   body: "Encourage healthy competition to build teamwork, fuel continuous improvement, and maximize potential.",
        // },
        {
          label: "Equipping Students for Success",
          body: "Providing the motivation and support students need to achieve their academic goals, build confidence, and take their educational game to the next level.",
        },
        {
          label: "Cultivate a growth mindset",
          body: "Helping students develop the belief that they can learn and grow, that challenges can be a fun part of learning, and that growth is pleasurable.",
        },
        {
          label: "Create positive and supportive environments",
          body: "Implementing PBIS and positive reinforcement to elevate mental health, guide behavior, build confidence and self-efficacy, and foster a sense of belonging and respect for all.",
        },
      ],
    },
    gamificationEngagement: {
      title: "Improved Educational Engagement with Gamification",
      body: "Through the intersection of science and technology, we're turning learning into a gamified journey, making education more fun and effective. We believe school to feel more like a game than a chore.",
      animation: {
        left: "Education",
        right: "Gamification",
        center: ["Enhanced Motivation", "Focused Attention", "Deeper Purpose"],
      },
    },
    curtains: {
      title: "Expanse is actively being developed!",
      body: "We're working hard to bring Expanse to schools near you. Contact us to be the first to know when we launch.",
    },
    contact: {
      title: "Get in Touch!",
      buttonText: "Contact Us",
    },
    thankYou: {
      text: "Thanks for visiting Expanse EDU!",
    },
  },
}

/*
{
          label: "Empower Students",
          body: "To believe in themselves, their potential, and their ability to succeed.",
        },
        {
          label: "Focus Attention",
          body: "On learning, discovery, and growth, rather than distractions.",
        },
        {
          label: "Discover Purpose",
          body: "To find meaning and relevance in their education and lives.",
        },
*/

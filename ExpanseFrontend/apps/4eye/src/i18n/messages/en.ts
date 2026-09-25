import type { Translations } from "../types"

const en: Translations = {
  common: {
    navigation: {
      home: "Home",
      contact: "Contact",
      terms: "Terms of Service",
      privacyPolicy: "Privacy Policy",
    },
    actions: {
      submit: "Submit",
      cancel: "Cancel",
      learnMore: "Learn More",
      getStarted: "Get Started",
      contactUs: "Contact Us",
    },
    footer: {
      copyright: "© {year} Expanse EDU",
      allRightsReserved: "All rights reserved.",
    },
  },
  home: {
    intro: {
      title: "Unlocking student potential",
      body: "Expanse empowers our students, teachers, and families giving them modern tools and technology to take education to the next level.",
    },
    purpose: {
      title: "Our Purpose",
      items: [
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
            "Unlocking student potential and motivating students to be all they can be while improving learning comprehension and information retention.",
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
          "**In a world of instant gratification, the rewards of education can seem distant and abstract.** We are competing with the allure of immediate pleasure, the dopamine rush of likes and modern entertainment.",
          "**Expanse gives you the tools to fight back.**",
        ],
      },
      {
        title: "Fulfillment, Achieved.",
        paragraphs: [
          "**Empty desks tell a story of unmet needs.** When students struggle to focus, lack a sense of purpose, or face challenges with their mental, emotional, or physical well-being school becomes a battleground, not a place of learning.",
          "**Expanse empowers students to focus their attention, discover their purpose, and rediscover the joy of learning.**",
        ],
      },
      {
        title: "Progress & Potential, Visualized.",
        paragraphs: [
          "**A mind clouded by doubt cannot soar.** Negative beliefs about oneself, clip the wings of potential. We must nurture self-belief and empower our students to see the incredible possibilities that lie within them.",
          "**Expanse helps students recognize their growth and potential, and believe in their ability to succeed.**",
        ],
      },
    ],
    advantages: {
      title: "What Sets Us Apart",
      items: [
        {
          label: "Universal Engagement",
          description:
            "Our gamification strategies are designed to engage all students regardless of background or skill level.",
        },
        {
          label: "Teacher Empowerment",
          description:
            "We provide teachers with tools to easily integrate gamification into their existing curriculum.",
        },
        {
          label: "Data-Driven Insights",
          description:
            "Real-time analytics help educators understand student engagement and adjust strategies accordingly.",
        },
        {
          label: "Seamless Integration",
          description:
            "Our platform integrates with existing school management systems for easy adoption.",
        },
      ],
    },
    audience: {
      title: "Who We Serve",
      body: "We partner with K-12 schools, districts, and educational institutions committed to improving student engagement and outcomes through innovative technology solutions.",
    },
    additionalGoals: {
      title: "Our Goals",
      details: [
        {
          label: "Increase Student Engagement",
          body: "Boost classroom participation and enthusiasm for learning through game-based incentives.",
        },
        {
          label: "Improve Academic Outcomes",
          body: "Drive measurable improvements in grades, test scores, and learning retention.",
        },
        {
          label: "Support Educator Success",
          body: "Provide teachers with powerful tools that enhance, not complicate, their teaching experience.",
        },
      ],
    },
    gamificationEngagement: {
      title: "Gamification That Works",
      body: "Transform your classroom into an engaging adventure where every achievement matters.",
      animation: {
        left: "Learn",
        right: "Grow",
        center: ["Play", "Earn", "Level Up"],
      },
    },
    curtains: {
      title: "Ready to Transform Education?",
      body: "Join the schools already seeing results with Expanse EDU.",
    },
    contact: {
      title: "Get in Touch",
      buttonText: "Contact Us",
    },
    thankYou: {
      text: "Thank you for your interest in Expanse EDU!",
    },
  },
  contact: {
    pageTitle: "Get in Touch",
    form: {
      name: "Your Name",
      email: "Email Address",
      message: "Your Message",
      submit: "Send Message",
    },
    success: {
      title: "Message Sent!",
      message: "We'll get back to you as soon as possible.",
    },
    error: {
      title: "Something went wrong",
      message: "Please try again or email us directly.",
    },
  },
}

export default en

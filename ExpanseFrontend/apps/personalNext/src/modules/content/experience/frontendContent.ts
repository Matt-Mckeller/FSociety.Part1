export type FrontendContentSchema = {
  sections: {
    heading: { line1: string; line2: string }
    introduction: {
      label: string
      text: string
      cardSectionTitle: string
      cards: {
        card1Items: string[]
        card2Items: string[]
      }
      ctaLabel: string
    }
    benefits: {
      label: string
      text: string
      list1: {
        title: string
        entries: Array<{ label: string; description: string }>
      }
      list2: {
        title: string
        entries: Array<{ label: string; description: string }>
      }
    }
    passion: { label: string; paragraphs: string[] }
    professionalExperience: { label: string; text: string }
    specializedSkills: { label: string; text: string }
    technology: { label: string; text: string }
    designPrincipals: { label: string; text: string }
    comprehensiveSolutions: { label: string; paragraphs: string[] }
  }
}
export const FrontendContent: { [key: string]: FrontendContentSchema } = {
  en: {
    sections: {
      heading: {
        line1: "Frontend Development",
        line2: "for Web Applications",
      },
      introduction: {
        label: "Expert UI Development for Modern Applications",
        text: "With a decade of experience in software engineering, my professional journey in UI development has evolved from jQuery and basic JavaScript to mastering advanced frameworks like React and Angular. This evolution ignited my passion for creating modern web applications, leveraging the full potential of these powerful tools to help businesses grow and build best-in-class software.",
        cardSectionTitle: "Frontend Technology",
        cards: {
          card1Items: ["React", "Angular", "TypeScript"],
          card2Items: ["JavaScript", "HTML", "CSS"],
        },
        ctaLabel: "Get In Touch",
      },
      benefits: {
        label: "Advantages of Modern Frontend Technologies",
        text: "Investing in frontend web application development offers companies a significant competitive advantage by enhancing user experience, improving customer engagement, and boosting overall satisfaction. The addition of modern frontend technologies like React and Angular enhance reusability, enable modular architecture, and facilitate clean code, providing efficient and maintainable development processes. These technologies empower developers to create responsive, interactive, and visually appealing interfaces faster and more effectively than ever, resulting in higher quality applications.",

        list1: {
          title: "Efficiency and Quality",
          entries: [
            {
              label: "Trust Enhancement",
              description:
                "A modern look and feel build user trust and confidence in your application.",
            },
            {
              label: "Improved Efficiency",
              description:
                "Streamlined workflows and clean code enhance developer productivity.",
            },
            {
              label: "Time Savings",
              description:
                "Reusable components and efficient code reduce development time.",
            },
            {
              label: "Reduced Errors",
              description:
                "Modular architecture and clean code minimize bugs, making the software easier to maintain and update in the future.",
            },
          ],
        },
        list2: {
          title: "Scalability and Customization",
          entries: [
            {
              label: "Scalability and Innovation",
              description:
                "Custom solutions are designed to scale with your business and foster innovation.",
            },
            {
              label: "Elimination of Repetitive Tasks",
              description:
                "Automation and reusable modules cut down on redundant coding efforts.",
            },
            {
              label: "Enhanced Communication",
              description:
                "Interactive and intuitive UIs improve user interaction and information flow.",
            },
            {
              label: "Custom Branding",
              description:
                "Tailored interfaces that reflect your brand identity, create unique user experience, and enhance user trust and loyalty.",
            },
          ],
        },
      },
      passion: {
        label: "Passion for Frontend",
        paragraphs: [
          "I love to code; each line and function written brings a satisfying sense of accomplishment. The variety of ways to write code fascinates me. Building frontends through component-based development is like assembling a mosaic, where each component is a tile that forms a cohesive and beautiful design.",
          "Coding is like architecting a bridge; it can be fragile and temporary or custom-built to stand the test of time. My aim is to build sturdy and enduring solutions that precisely meet the requirements at hand.",
        ],
      },
      professionalExperience: {
        label: "Professional Experience",
        text: "Throughout my career, I have extensively worked with web forms, displaying data in list and detail pages, and added interactivity and custom actions. I have creating software that allows for exploration of data in intuitive user friendly ways that support use cases and meet user requirements. My software solutions have removed the need for spreadsheets, boosting business scalability, and facilitating improved communication and branding. I've built solutions targeting pain points, automating business processes, and enhancing both employee and customer experiences while providing insights for stakeholders.",
      },
      specializedSkills: {
        label: "Specialized skills",
        text: "In addition to form development, data reporting, and detail views I have created charts and custom interactive data visualizations components, worked with pdfs, collected user data, and monitored user activity. My experience includes extensive work with creating, reading, updating, and deleting data in web applications and websites. I have implemented automations and business process enhancements, and developed custom implementations for web application dashboards. ",
      },
      technology: {
        label: "Tools and Frameworks",
        text: 'I have utilized a variety of technology and frameworks to help build web applications with best practices. I have built projects in all of 3 of the most popular frontend frameworks: React, Angular, Vue.js. Additionally, I have employed various tools for templating, css and styling, including "frameworks" and libraries such as Bootstrap, Styled Components, Tailwind, and MUI. I am also well veresd in state management tools like Redux or React Context, as well as service oriented and observable structures common in Angular. My expertise extends to foundational building blocks for web applications including sessions, cookies, requests and responses, authentication, access control, web sockets, caching, error handling, local storage, validation, etc. ',
      },
      designPrincipals: {
        label: "Design Principals and Turning Mockups into code",
        text: "Though experience and study, I have honed my understanding of design concepts such as alignment, size, responsiveness, typography, color, spacing, and accessibility. Although I am still learning to design myself, I recognize the important aspects of good design. I'm also comfortable doing mock ups and designs in Figma or Sketch and performing edits and content creation in Illustrator and Photoshop, or utilizing generative AI. I have a strong track record of turning mockups into functional, interactive, and responsive user interfaces. ",
      },
      comprehensiveSolutions: {
        label: "Comprehensive Frontend Development Solutions",
        paragraphs: [
          "For potential clients lacking in-house expertise or looking to bolster their existing team, my custom frontend development solutions can be a game-changer, enabling you to gain a competitive edge and achieve your business goals.",
          "With extensive experience in building intuitive frontend user interfaces and writing clean, maintainable code, I'm here to help with all your development needs. Whether you're looking for new features, updates to existing ones, API integrations, open-source library integrations, or something completely custom, I have the skills to assist you. Need help with frontend web application development? Let's schedule a time to talk. I'm excited to help take your project to the next level.",
        ],
      },
    },
  },
}

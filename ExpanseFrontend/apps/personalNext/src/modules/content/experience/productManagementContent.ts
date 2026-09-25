export type ProductManagementContentSchema = {
  sections: {
    heading: { line1: string; line2: string }
    bridgingWorlds: {
      title: string
      paragraphs: string[]
      benefits: {
        label: string
        items: string[]
      }
    }
    navigatingWebDevelopment: {
      title: string
      paragraphs: string[]
      overTheYears: {
        label: string
        items: string[]
      }
      foundationEnables: {
        label: string
        items: string[]
      }
    }
    buildingSystems: {
      title: string
      paragraphs: string[]
    }
  }
}
export const ProductManagementContent: {
  [key: string]: ProductManagementContentSchema
} = {
  en: {
    sections: {
      heading: {
        line1: "Product Management",
        line2: "Experience",
      },
      bridgingWorlds: {
        title:
          "Bridging Worlds: Project Management Rooted in Technical Expertise",
        paragraphs: [
          "I am comfortable working in high tech areas and bring a solid, deeply rooted foundation of **technical knowledge**. This foundation enables me to adapt, adjust, and navigate any environment, maintaining my footing even when faced with new challenges. Years of practice and an expansive foundation come in handy.",
          "I've had the privilege of learning from diverse environments, big and small. I've consistently played key roles, interacting with a variety of people while delivering impactful results and fulfill my responsibilities.",
          "Through my career I've cultivated a dual focus – one eye on the realm of **business** and the other on the **technical side**. This dual perspective is like wearing a pair of 3D glasses, allowing me to see challenges and opportunities with greater depth and clarity.",
          "While consulting at MDU Resources and working at Real Equity Management, I **engaged with customers and employees** across various roles to **understand their processes, procedures, and pain points**. Simultaneously I worked with the stakeholders to grasp the broader picture, including financial considerations and business priorities. These experiences sharpened my ability to **synthesize technical and business insights** into requirements, priorities, and actionable strategies, enhancing my product management lens and solidifying my dual perspective.",
          "By combining these insights, I develop and present technical solutions tailored to organizational needs. My approaches included written requirements, technical specifications, detailed examples, compelling presentations, designs, and actual code—all adapted to the specific situation. Formal project management exposure and practice has further strengthened my ability to bridge the technical and business worlds, ensuring solutions are effective, innovative, and aligned with organizational goals.",
        ],
        benefits: {
          label: "Benefits of a Dual Perspective:",
          items: [
            "Unlocks opportunities for innovation by bridging business priorities with technical capabilities.",
            "Provides clarity in navigating the interplay between business and technology.",
            "Improves communication between the realms, fostering mutual understanding.",
            "Mitigates the risk of misunderstandings between technical and non-technical individuals and teams.",
            "Reduces communication bottlenecks in determining the feasibility of technical implementations.",
            "Enhances the process of decision making by offering a balanced lens through which to assess quick solutions versus long term investments and when to implement safeguards for future changes.",
          ],
        },
      },
      navigatingWebDevelopment: {
        title: "Navigating the Web Development Frontier",
        paragraphs: [
          "Web-wise, I have climbed to the top of a challenging and winding mountain, gaining valuable insights from every twist, turn, and steep slope along the way. At the summit, armed with a fantastic pair of binoculars, I now have a crystal-clear perspective on the vast landscape of web development—its intricate ecosystems, evolving technologies, and endless opportunities for innovation.",
          "Web development isn't just about writing code—it's about building solutions that align with business goals, adapt to change, and unlock innovation. Let’s connect and discuss how we can shape the future of technology together!",
        ],
        overTheYears: {
          label: "Over the years, I’ve:",
          items: [
            "Gained proficiency in a wide range of languages, frameworks, project management environments, and modern development tools.",
            "I’ve worked on projects that demand both low-level precision and high-level architectural thinking.",
            "Learned not only the 'what' and 'why' behind decisions but also the critical 'when'—ensuring that choices aligns with timing, resource constraints, and its overall cost-effectiveness.",
          ],
        },
        foundationEnables: {
          label: "This foundation enables me to:",
          items: [
            "Navigate diverse technologies, from legacy systems and modern frameworks to monolithic architectures, and microservices.",
            "Drive seamless transitions for digital transformation, scalable growth",
            "Facilitate application modernization and support integration, expansion, adaption in an ever-evolving technological landscape.",
          ],
        },
      },
      buildingSystems: {
        title:
          "Building Systems That Scale: Modular Design, Integration, and Innovation",
        paragraphs: [
          "With deep expertise in system integration and the software development lifecycle, I approach projects with adaptability while typically prioritizing a modular methodology. This approach focuses on creating reusable, scalable, and maintainable components.",
          "By modular, I refer to building separate, isolated modules or blocks that can be independently developed, tested, and maintained. Imagine a set of colorful building blocks (like LEGOs) fitting together to form a larger structure and complete system. Each block represents a module with a specific function (also each block can be copied infinitely). Ideally, you can easily add, remove, or rearrange blocks without affecting the others.",
          "i.e.",
          "This modularity allows for individual inspection, cleaning, and updating of each block, provided the connection points remain consistent. Does this make sense?",
          "For software and web applications, I enjoy employing larger-scale design patterns such as Microservices on the backend and Component- or Feature-based development on the frontend.",
        ],
      },
    },
  },
}

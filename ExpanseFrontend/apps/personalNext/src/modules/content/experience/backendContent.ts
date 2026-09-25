export type BackendContentSchema = {
  sections: {
    heading: { line1: string; line2: string }
    comprehensiveExpertise: { label: string; paragraphs: string[] }
    cta: { label: string; text: string }
  }
}
export const BackendContent: { [key: string]: BackendContentSchema } = {
  en: {
    sections: {
      heading: {
        line1: "Backend Development",
        line2: "for Web Applications",
      },
      comprehensiveExpertise: {
        label: "Comprehensive Backend Development Expertise",
        paragraphs: [
          "I have extensive experience in backend development, starting with the PHP and the popular MVC framework Laravel, now also utilizing Node.js. My expertise includes working with ORMs and database interactions, creating endpoints, and handling document generation, editing, and storage. I have also performed numerous regex operations, mathematical computations, data transformations, extractions, and aggregations. I have performed numerous regex operations, mathematical computations, data transformations, extractions, and aggregations. Additionally, I am proficient in API development, business logic implementation, and integrations.",
          "I am comfortable with object-oriented development and enjoy utilizing SOLID principles. I'm well versed in design patterns including queues and events/listeners, cron job scheduling, observers, repositories, database seeding, database migrations, query optimization, indexing, providers, validations, etc.",
          "I've worked with various types of databases and have experience with database management including schema design, normalization, data modeling and entity-relationship diagrams, migrations, seeding, data access control, encryption, sql, nosql, oracle, and APIs ( Rest/GraphQL/Soap ). I'm familiar with pagination and have a pretty good sense for performance and complexity. If you're looking for serverless function solutions that can scale to any level, I have the expertise to deliver!",
          "In addition, I have experience with Google Cloud and AWS for hosting, storage, database management, and CI/CD. ",
        ],
      },
      cta: {
        label: "Ready to Expand your backend?",
        text: "With my extensive experience in backend development and data management, I am well-equipped to handle complex and diverse project requirements. If you need reliable, efficient, and scalable backend solutions, let's schedule a time to discuss how I can contribute to your project's success. I would love to help drive your project forward.",
      },
    },
  },
}

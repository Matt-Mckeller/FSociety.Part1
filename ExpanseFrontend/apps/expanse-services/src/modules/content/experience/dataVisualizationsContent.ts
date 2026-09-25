export type DataVisualizationsContentSchema = {
  sections: {
    heading: {
      line1: string
      line2: string
    }
    dataVisualizationsForWebApplications: {
      label: string
      paragraphs: string[]
    }
    cta: { label: string; text: string; boldFinalSentence: string }
  }
}
export const DataVisualizationsContent: {
  [key: string]: DataVisualizationsContentSchema
} = {
  en: {
    sections: {
      heading: {
        line1: "Data Visualization Development",
        line2: "for Web Applications",
      },
      dataVisualizationsForWebApplications: {
        label: "Crafting Intuitive Data Visualizations for Web Applications",
        paragraphs: [
          "I have extensive experience building data visualizations for analytics and review in my career. The most prominent was when I was working with LexisNexis Risk Solutions. There I developed a data analytics and data visualization platform for U.S. Government agencies utilizing a data visualization library built on top of d3. This platform featured interactive and highly customized charts to get the desired effects, along with dynamic widgets and filters that allowed users to dive deep down into their data and generate detailed reports. These data visualizations simplified the complexities of analytics into an intuitive, user-friendly interface, empowering users to navigate data with relative ease, extract insights, and make informed decisions from actionable intelligence.",
          "Additionally, I have created financial and event log visualizations using Highcharts and Chart.js, incorporating filters for location, time, and other criteria. My work also involves proficiency with SVGs and familiarity with Canvas, including animating elements to enhance user interaction. Working closely with cross-functional teams ensures that visualizations meet user needs and provide actionable insights.",
        ],
      },
      cta: {
        label: "Ready to transform your data into actionable insights?",
        text: "With my extensive experience in developing intuitive and powerful data visualizations, I can help your organization unlock the full potential of its data. Whether it's for analytics, financial reporting, or event log tracking, my expertise ensures that your visualizations will be both user-friendly and impactful. Let's collaborate to create compelling visual narratives that drive informed decision-making and enhance your data-driven strategies.",
        boldFinalSentence:
          "Contact me today to elevate your data visualization capabilities and turn complexity into clarity.",
      },
    },
  },
}

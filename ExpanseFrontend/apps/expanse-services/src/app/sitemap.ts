import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.expanseservices.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.expanseservices.com/software-development-samples",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://www.expanseservices.com/api-explorer",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://www.expanseservices.com/authentication",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://www.expanseservices.com/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.expanseservices.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.expanseservices.com/terms-of-services",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.expanseservices.com/experience/resume",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.expanseservices.com/experience/frontend-web-application-development",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.expanseservices.com/experience/backend-web-application-development",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.expanseservices.com/experience/data-visualization-development-for-web-applications",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.expanseservices.com/experience/product-management-for-web-application-development",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // {
    //   url: "https://www.expanseservices.com/process",
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ]
}

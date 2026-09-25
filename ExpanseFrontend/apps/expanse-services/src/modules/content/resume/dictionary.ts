export type ResumeDictionaryHeaderContent = {
  devPageTitle: string
  productPageTitle: string
  contactAndProfiles: string
  location: string
  phoneNumber: string
  email: string
  githubUrl: string
  githubLabel: string
  linkedInUrl: string
  linkedInLabel: string
  mailto: string
}
export type ResumeDictionary = {
  headerContent: ResumeDictionaryHeaderContent
}
export const Dictionary: { [key: string]: ResumeDictionary } = {
  en: {
    headerContent: {
      devPageTitle: "Matthew Mckeller's Development Resume",
      productPageTitle: "Matthew Mckeller's Product Resume",
      contactAndProfiles: "Contact & Online Profiles",
      location: "Remote | Kansas City, MO",
      phoneNumber: "(816) 739-9473",
      email: "matt@expanseservices.com",
      githubUrl: "https://www.github.com/matt-mckeller",
      githubLabel: "Github Samples",
      linkedInUrl: "https://www.linkedin.com/in/mattmckeller",
      linkedInLabel: "Linkedin",
      mailto:
        "mailto:matt@expanseservices.com?subject=Hello%20Matthew&body=I%20saw%20your%20resume%20and%20wanted%20to%20get%20in%20touch%20with%20you!",
    },
  },
}

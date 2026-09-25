"use client"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export function ProfessionalSummary() {
  return (
    <Box>
      <Box mb={2}>
        <Typography variant="body1" component="h3" fontWeight="500">
          Level 1: Software Engineer Expanding Local Business
        </Typography>
        <Typography variant="body1">
          <span role="img" aria-label="rocket">
            🚀
          </span>{" "}
          Joined an 8-figure student housing company as its first software
          engineer, spearheading the development of web applications from the
          ground up.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1" component="h3" fontWeight="500">
          Level 2: Gaining Agile Experience with Global Enterprise
        </Typography>
        <Typography variant="body1">
          <span role="img" aria-label="building">
            🏢
          </span>{" "}
          Partnered with a team of more than 12 technology professionals in an
          agile scrum environment, we developed a high-priority fraud analytics
          platform for U.S. Government Agencies.
        </Typography>
      </Box>
      <Box mb={8}>
        <Typography variant="body1" component="h3" fontWeight="500">
          Level 3: Driving Business Impact
        </Typography>
        <Typography variant="body1">
          <span role="img" aria-label="alien">
            👾
          </span>{" "}
          Led cross-functional teams in developing modern software solutions.
          Skilled in crafting exceptional user experiences and robust APIs, I
          drive business growth through innovative technology.
        </Typography>
      </Box>
      <Box mb={8}>
        <Typography variant="body1" mb={2}>
          Driven by a lifelong fascination with the transformative power of the
          digital world, I've dedicated my career to crafting software
          solutions. Computers and technology served as my gateway to
          exploration, unlocking a world of possibilities and igniting a passion
          for learning and self-improvement that has guided me throughout my
          journey.
        </Typography>

        <Typography variant="body1" mb={2}>
          Starting as a sole engineer, I fearlessly tackled real-world
          challenges, fostering team growth and honing my skills in web
          application development. This foundation launched me into roles within
          large enterprises, where I collaborated with experts in across many
          facets of web application development to deliver cutting edge
          solutions
        </Typography>

        <Typography variant="body1">
          With 10 years of experience in software development, my journey has
          cultivated not only professional expertise but also a profound love of
          software and computers. I have worked with a diverse range of
          organizations, from global enterprises to startup environments,
          gaining a deep understanding of the software development lifecycle
          from inception through deployment and beyond. I'm passionate about
          creating innovative solutions, solving complex challenges, driving
          continuous improvement, and enhancing the user experience.
        </Typography>
      </Box>
    </Box>
  )
}

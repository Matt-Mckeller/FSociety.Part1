import React, { useEffect, useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"

// Hook implementation for Storybook
function useScrollAnimation(threshold = 0.1, rootMargin = "50px") {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}

// Component implementation
interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
}

function Section({ id, title, children }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <Box
      id={id}
      ref={ref}
      sx={{
        mb: 4,
        scrollMarginTop: "80px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          pb: 1,
          fontWeight: 600,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}

const meta: Meta<typeof Section> = {
  title: "QuickWinsGuide/Section",
  component: Section,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A section wrapper component that provides scroll-triggered animations and consistent styling. Used to organize content in the Quick Wins Guide.",
      },
    },
  },
  argTypes: {
    id: {
      description: "Unique identifier for scroll-to navigation",
      control: "text",
    },
    title: {
      description: "Section heading text",
      control: "text",
    },
    children: {
      description: "Section content",
    },
  },
}

export default meta
type Story = StoryObj<typeof Section>

export const Default: Story = {
  args: {
    id: "overview",
    title: "Overview",
    children: (
      <Typography>
        This is a sample section with content that demonstrates the Section
        component with fade-in animation on scroll.
      </Typography>
    ),
  },
}

export const WithMultipleParagraphs: Story = {
  args: {
    id: "detailed-section",
    title: "Detailed Section",
    children: (
      <Box>
        <Typography paragraph>
          First paragraph of content explaining the section topic in detail.
        </Typography>
        <Typography paragraph>
          Second paragraph with additional information and context about the
          subject matter.
        </Typography>
        <Typography>
          Final paragraph concluding the section with key takeaways.
        </Typography>
      </Box>
    ),
  },
}

export const ScrollDemo: Story = {
  render: () => (
    <Box sx={{ height: "150vh", pt: 4 }}>
      <Typography sx={{ mb: 4 }}>
        Scroll down to see the section animate in...
      </Typography>
      <Box sx={{ height: "50vh" }} />
      <Section id="scroll-demo" title="Animated Section">
        <Typography>
          This section fades in when it enters the viewport!
        </Typography>
      </Section>
    </Box>
  ),
}

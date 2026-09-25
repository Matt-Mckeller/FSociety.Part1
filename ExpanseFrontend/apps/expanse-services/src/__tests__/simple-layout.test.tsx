import { render, screen } from '@testing-library/react'
import SimpleLayout from '../app/simple-layout'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('SimpleLayout', () => {
  it('renders children correctly', () => {
    render(
      <SimpleLayout>
        <div data-testid="child">Test Child</div>
      </SimpleLayout>
    )
    
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('renders the header with title', () => {
    render(
      <SimpleLayout>
        <div>Content</div>
      </SimpleLayout>
    )
    
    expect(screen.getByText('Expanse Services')).toBeInTheDocument()
  })

  it('renders the footer with copyright', () => {
    render(
      <SimpleLayout>
        <div>Content</div>
      </SimpleLayout>
    )
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })
})

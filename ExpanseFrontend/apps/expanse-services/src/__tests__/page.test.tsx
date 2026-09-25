import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Expanse Services')
  })

  it('renders the welcome message', () => {
    render(<Home />)
    
    expect(screen.getByText('Welcome to Expanse Services')).toBeInTheDocument()
  })

  it('renders the development notice', () => {
    render(<Home />)
    
    expect(screen.getByText(/under development/i)).toBeInTheDocument()
  })
})

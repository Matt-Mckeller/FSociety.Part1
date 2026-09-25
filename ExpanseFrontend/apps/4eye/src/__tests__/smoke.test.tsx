import { render, screen } from "@testing-library/react"

// Simple smoke test to verify Jest is configured correctly
describe("Jest Configuration", () => {
  it("should render a simple component", () => {
    const TestComponent = () => <div data-testid="test">Hello</div>
    render(<TestComponent />)
    expect(screen.getByTestId("test")).toBeInTheDocument()
  })

  it("should run basic assertions", () => {
    expect(1 + 1).toBe(2)
    expect("hello").toContain("ell")
    expect([1, 2, 3]).toHaveLength(3)
  })
})

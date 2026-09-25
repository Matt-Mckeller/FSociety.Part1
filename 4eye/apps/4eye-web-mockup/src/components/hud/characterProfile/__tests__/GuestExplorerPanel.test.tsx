import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MapDirectionFocusProvider } from "@expanse/hud"
import { ThemeProvider } from "@expanse/theme";
import { GuestExplorerPanel } from "../GuestExplorerPanel";

function renderPanel(props: React.ComponentProps<typeof GuestExplorerPanel> = {}) {
  return render(
    <ThemeProvider>
      <MapDirectionFocusProvider>
        <GuestExplorerPanel {...props} />
      </MapDirectionFocusProvider>
    </ThemeProvider>,
  );
}

describe("GuestExplorerPanel", () => {
  it("renders default identity (Guest · Lv.1 · Guest Explorer)", () => {
    renderPanel();
    expect(screen.getByText("Guest")).toBeInTheDocument();
    expect(screen.getByText("Guest Explorer")).toBeInTheDocument();
    expect(screen.getByText("Lv.1")).toBeInTheDocument();
  });

  it("renders custom name, role, and level", () => {
    renderPanel({ name: "Pilot", roleLabel: "Cartographer", level: 12 });
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Cartographer")).toBeInTheDocument();
    expect(screen.getByText("Lv.12")).toBeInTheDocument();
  });

  it("renders the XP fraction with thousands separators", () => {
    renderPanel({ xpCurrent: 1234, xpNext: 5000 });
    expect(screen.getByText("1,234 / 5,000")).toBeInTheDocument();
  });

  it("renders the three stat-chip score numbers", () => {
    renderPanel({ learnScore: 42, earnScore: 88, competeScore: 17 });
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("88")).toBeInTheDocument();
    expect(screen.getByText("17")).toBeInTheDocument();
  });

  it("renders the focus area text", () => {
    renderPanel({ focus: "Mapping the inner ring" });
    expect(screen.getByText("Mapping the inner ring")).toBeInTheDocument();
  });

  it("opens the customize accordion when toggled", () => {
    renderPanel();
    const toggle = screen.getByTestId("customize-toggle");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles the See-Demo CTA when the character figure is clicked", () => {
    renderPanel();
    expect(screen.queryByTestId("see-demo-button")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("character-figure-lean"));
    expect(screen.getByTestId("see-demo-button")).toBeInTheDocument();
  });

  it("forwards onSeeDemo when the CTA is clicked", () => {
    const onSeeDemo = vi.fn();
    renderPanel({ onSeeDemo });
    fireEvent.click(screen.getByTestId("character-figure-lean"));
    fireEvent.click(screen.getByTestId("see-demo-button"));
    expect(onSeeDemo).toHaveBeenCalledTimes(1);
  });
});

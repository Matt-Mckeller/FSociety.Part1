import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterCompass } from "../CharacterCompass";
import { CharacterProfileProvider } from "../context/CharacterProfileContext";
import { RING_SCHEDULE } from "../rings";

function renderCompass(props: React.ComponentProps<typeof CharacterCompass> = {}, initial?: Record<string, unknown>) {
  return render(
    <CharacterProfileProvider initial={initial as never}>
      <CharacterCompass {...props} />
    </CharacterProfileProvider>,
  );
}

describe("CharacterCompass", () => {
  it("renders the explore icon and rings in the idle state", () => {
    renderCompass();
    expect(screen.getByTestId("character-compass")).toBeInTheDocument();
    expect(screen.getByTestId("character-compass-icon")).toBeInTheDocument();
    expect(screen.getByTestId("character-compass-rings")).toBeInTheDocument();
    expect(screen.queryByTestId("see-demo-button")).not.toBeInTheDocument();
  });

  it("pins the ring variant when `pinRing` is provided", () => {
    renderCompass({ pinRing: "comet" });
    const rings = screen.getByTestId("character-compass-rings");
    expect(rings).toHaveAttribute("data-ring-variant", "comet");
  });

  it("falls back to the first scheduled ring on mount when not pinned", () => {
    renderCompass();
    const rings = screen.getByTestId("character-compass-rings");
    expect(rings).toHaveAttribute("data-ring-variant", RING_SCHEDULE[0].id);
  });

  it("shows the See-Demo button when `showDemoCta` is true in context", () => {
    renderCompass({}, { showDemoCta: true });
    expect(screen.getByTestId("see-demo-button")).toBeInTheDocument();
    expect(screen.queryByTestId("character-compass-icon")).not.toBeInTheDocument();
  });

  it("fires `onSeeDemo` and dismisses the CTA on click", () => {
    const onSeeDemo = vi.fn();
    renderCompass({ onSeeDemo }, { showDemoCta: true });
    fireEvent.click(screen.getByTestId("see-demo-button"));
    expect(onSeeDemo).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("see-demo-button")).not.toBeInTheDocument();
  });

  it("stops click propagation when the CTA is clicked", () => {
    const onSeeDemo = vi.fn();
    const onParentClick = vi.fn();
    render(
      <div onClick={onParentClick}>
        <CharacterProfileProvider initial={{ showDemoCta: true } as never}>
          <CharacterCompass onSeeDemo={onSeeDemo} />
        </CharacterProfileProvider>
      </div>,
    );
    fireEvent.click(screen.getByTestId("see-demo-button"));
    expect(onSeeDemo).toHaveBeenCalledTimes(1);
    expect(onParentClick).not.toHaveBeenCalled();
  });
});

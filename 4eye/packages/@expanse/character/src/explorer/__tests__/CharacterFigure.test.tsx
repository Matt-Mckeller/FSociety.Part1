import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CharacterFigure } from "../CharacterFigure";
import { CharacterProfileProvider } from "../context/CharacterProfileContext";
import { DIRECTION_TRANSFORMS } from "../config";

function renderFigure(
  opts: { direction?: "up" | "down" | "left" | "right"; onClick?: () => void } = {},
) {
  return render(
    <CharacterProfileProvider>
      <CharacterFigure
        leanTransform={DIRECTION_TRANSFORMS[opts.direction ?? "up"]}
        onClick={opts.onClick}
      />
    </CharacterProfileProvider>,
  );
}

describe("CharacterFigure", () => {
  it("renders the float wrapper", () => {
    renderFigure();
    expect(screen.getByTestId("character-figure-float")).toBeInTheDocument();
  });

  it("applies the up direction transform by default", () => {
    renderFigure({ direction: "up" });
    const lean = screen.getByTestId("character-figure-lean");
    expect(lean).toHaveStyle({ transform: DIRECTION_TRANSFORMS.up });
  });

  it.each(["down", "left", "right"] as const)(
    "applies the %s direction transform",
    (dir) => {
      renderFigure({ direction: dir });
      const lean = screen.getByTestId("character-figure-lean");
      expect(lean).toHaveStyle({ transform: DIRECTION_TRANSFORMS[dir] });
    },
  );

  it("throws when rendered outside a CharacterProfileProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(<CharacterFigure />),
    ).toThrow(/CharacterProfileProvider/);
    spy.mockRestore();
  });
});

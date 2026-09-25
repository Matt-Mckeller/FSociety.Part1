import { ImageResponse } from "next/og";

/*
  Generated rather than committed as a binary, so the mark stays editable in the
  same place as everything else and there is no .png to keep in sync.
*/

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#fafaf9",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        y
      </div>
    ),
    size,
  );
}

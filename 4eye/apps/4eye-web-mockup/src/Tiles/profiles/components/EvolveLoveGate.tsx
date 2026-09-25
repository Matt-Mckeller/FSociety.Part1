"use client";

/**
 * Password gate for Heart.Evolve / evolve.love on the personal profile.
 * Children stay unmounted until the server cookie is valid.
 */

import * as React from "react";
import { Box, Button, Stack, TextField, Typography, alpha } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

type GateState = "loading" | "locked" | "unlocked";

export function EvolveLoveGate({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  const [state, setState] = React.useState<GateState>("loading");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/evolve-love", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : { unlocked: false }))
      .then((data: { unlocked?: boolean }) => {
        if (!cancelled) setState(data.unlocked ? "unlocked" : "locked");
      })
      .catch(() => {
        if (!cancelled) setState("locked");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/evolve-love", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setPassword("");
        setState("unlocked");
        return;
      }
      if (res.status === 503) {
        setError("Not configured — set EVOLVE_LOVE_PASSWORD on the server.");
      } else {
        setError("Wrong password.");
      }
    } catch {
      setError("Could not reach the unlock service.");
    } finally {
      setBusy(false);
    }
  };

  const lock = async () => {
    setBusy(true);
    try {
      await fetch("/api/evolve-love", { method: "DELETE", credentials: "same-origin" });
    } finally {
      setBusy(false);
      setState("locked");
    }
  };

  if (state === "loading") {
    return (
      <Box
        id="heart-evolve-media"
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          px: 2,
          py: 3,
          color: "text.secondary",
          fontSize: 13,
          scrollMarginTop: 96,
        }}
      >
        Checking access…
      </Box>
    );
  }

  if (state === "locked") {
    return (
      <Box
        id="heart-evolve-media"
        component="form"
        onSubmit={unlock}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(accent, 0.35),
          overflow: "hidden",
          bgcolor: "background.paper",
          scrollMarginTop: 96,
        }}
      >
        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            px: 1.5,
            py: 1.1,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: alpha(accent, 0.06),
            alignItems: "center",
          }}
        >
          <LockRoundedIcon sx={{ fontSize: 16, color: accent }} />
          <Box>
            <Typography
              sx={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 12,
                fontWeight: 800,
                color: accent,
              }}
            >
              Heart.Evolve();
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: "text.secondary" }}>
              Private · password required
            </Typography>
          </Box>
        </Stack>
        <Stack sx={{ p: 1.75, gap: 1.25 }}>
          <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.5 }}>
            This album lives on the personal profile, not on yen Vision.
          </Typography>
          <TextField
            type="password"
            size="small"
            autoComplete="current-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={busy || !password}
            sx={{ alignSelf: "flex-start", bgcolor: accent, "&:hover": { bgcolor: accent } }}
          >
            Unlock
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
        <Button size="small" onClick={lock} disabled={busy} sx={{ color: "text.secondary", fontSize: 12 }}>
          Lock
        </Button>
      </Stack>
      {children}
    </Box>
  );
}

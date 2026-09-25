"use client"

import React, { useRef, useState } from "react"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import { ActionButton } from "../../action-button"
import { useHudContextBar } from "../HudContextBarProvider"
import { OptionsPopover } from "../OptionsPopover"

export function GoalsButton() {
  const { goal, setGoal, goals } = useHudContextBar()
  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <div ref={anchorRef} style={{ display: "inline-flex" }}>
        <ActionButton
          icon={<TrackChangesIcon />}
          label="Goals"
          active={open || goal != null}
          onClick={() => setOpen((v) => !v)}
        />
      </div>
      <OptionsPopover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        title="Goals"
        emptyMessage="No goals for this domain yet"
        items={goals.map((g) => ({
          id: g.id,
          label: g.label,
          description: g.description,
        }))}
        selectedId={goal}
        onSelect={(id) => setGoal(id)}
      />
    </>
  )
}

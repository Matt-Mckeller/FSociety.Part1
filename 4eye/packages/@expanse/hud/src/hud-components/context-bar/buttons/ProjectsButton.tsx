"use client"

import React, { useRef, useState } from "react"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
import { ActionButton } from "../../action-button"
import { useHudContextBar } from "../HudContextBarProvider"
import { OptionsPopover } from "../OptionsPopover"

export function ProjectsButton() {
  const { project, setProject, projects } = useHudContextBar()
  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <div ref={anchorRef} style={{ display: "inline-flex" }}>
        <ActionButton
          icon={<FolderSpecialIcon />}
          label="Projects"
          active={open || project != null}
          onClick={() => setOpen((v) => !v)}
        />
      </div>
      <OptionsPopover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        title="Project"
        emptyMessage="No projects yet"
        items={projects.map((p) => ({
          id: p.id,
          label: p.label,
          description: p.description,
        }))}
        selectedId={project}
        onSelect={(id) => setProject(id)}
      />
    </>
  )
}

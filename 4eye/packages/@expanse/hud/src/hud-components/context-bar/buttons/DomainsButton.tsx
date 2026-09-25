"use client"

import React, { useRef, useState } from "react"
import HubIcon from "@mui/icons-material/Hub"
import SchoolIcon from "@mui/icons-material/School"
import WorkIcon from "@mui/icons-material/Work"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { ActionButton } from "../../action-button"
import { useHudContextBar, type DomainId } from "../HudContextBarProvider"
import { OptionsPopover } from "../OptionsPopover"

const DOMAIN_ICONS: Record<DomainId, React.ReactElement> = {
  learn: <SchoolIcon fontSize="small" />,
  work: <WorkIcon fontSize="small" />,
  life: <FavoriteIcon fontSize="small" />,
}

export function DomainsButton() {
  const { domain, setDomain, domains } = useHudContextBar()
  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <div ref={anchorRef} style={{ display: "inline-flex" }}>
        <ActionButton
          icon={<HubIcon />}
          label="Domains"
          active={open || domain != null}
          onClick={() => setOpen((v) => !v)}
        />
      </div>
      <OptionsPopover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        title="Domain"
        items={domains.map((d) => ({
          id: d.id,
          label: d.label,
          description: d.description,
          icon: DOMAIN_ICONS[d.id],
        }))}
        selectedId={domain}
        onSelect={(id) => setDomain(id as DomainId)}
      />
    </>
  )
}

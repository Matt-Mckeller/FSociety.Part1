"use client";

import * as React from "react";
import type { Photo } from "@/components/media/PhotoBrowse";

export function PhotoLightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const photo = photos[index];
  const total = photos.length;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % total);
      if (e.key === "ArrowLeft") onIndex((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, total, onClose, onIndex]);

  if (!photo) return null;

  return (
    <div
      className="ph-lb"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      onClick={onClose}
    >
      <div className="ph-lb-inner" onClick={(e) => e.stopPropagation()}>
        <div className="ph-lb-top">
          <p className="ph-lb-meta">
            {index + 1} / {total}
            <span className="ph-lb-title">{photo.title}</span>
          </p>
          <div className="ph-lb-actions">
            <a className="ph-lb-link" href={photo.src} target="_blank" rel="noreferrer">
              Open file
            </a>
            <button type="button" className="ph-lb-close" onClick={onClose} aria-label="Close">
              Close
            </button>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ph-lb-img" src={photo.src} alt={photo.description || photo.title} />
        {photo.description && <p className="ph-lb-desc">{photo.description}</p>}
        <div className="ph-lb-nav">
          <button type="button" className="ph-lb-btn" onClick={() => onIndex((index - 1 + total) % total)}>
            ← Prev
          </button>
          <button type="button" className="ph-lb-btn" onClick={() => onIndex((index + 1) % total)}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

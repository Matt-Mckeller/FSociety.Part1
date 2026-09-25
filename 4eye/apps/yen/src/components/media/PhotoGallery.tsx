import { Suspense } from "react";
import manifest from "@/generated/photos.json";
import { PhotoBrowse, type Album } from "@/components/media/PhotoBrowse";
import { PresentationProvider } from "@/components/media/PresentationMode";
import "./photos.css";

/*
  Server entry → client browse shell (modes · density · nests · exports).
  Manifest is allowlisted at build time via scripts/build-photo-manifest.mjs.
*/
export function PhotoGallery() {
  return (
    <PresentationProvider>
      <Suspense fallback={<p className="ph-empty">Loading gallery…</p>}>
        <PhotoBrowse albums={manifest.albums as Album[]} />
      </Suspense>
    </PresentationProvider>
  );
}

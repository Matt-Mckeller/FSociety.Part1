import { existsSync } from "node:fs";
import { join } from "node:path";

/*
  Frames an application that was built with its own toolchain and served from
  `public/mounted/<id>/`.

  A frame rather than a port. These apps have their own React tree, their own
  MUI major version and their own router; rendering them inside yen's tree would
  mean reconciling all three. Framed, each one runs exactly as it does
  standalone, and none of its weight lands in a yen bundle — the frame is a few
  hundred bytes whatever the app costs.
*/
export interface MountedAppProps {
  id: string;
  title: string;
  /**
   * Request `index.html` rather than the directory.
   *
   * Next serves `/mounted/<id>/` by redirecting the trailing slash away, and an
   * app whose assets are referenced relatively then resolves them one level too
   * high and renders nothing. Naming the document fixes the base — but it only
   * suits apps that do not route on the path, since the router would otherwise
   * have to match "/index.html".
   */
  entryFile?: boolean;
}

export function MountedApp({ id, title, entryFile = false }: MountedAppProps) {
  /*
    Asked of the filesystem rather than a generated manifest. `npm run apps` is
    a separate, slow step that depends on sibling repos, so the site is often
    built without it — and the docs indexer clears `src/generated` on every run,
    which would take a manifest with it. The built app either is on disk or is
    not; that is the only thing worth checking.
  */
  const available = existsSync(join(process.cwd(), "public/mounted", id, "index.html"));

  if (!available) {
    return (
      <div
        style={{
          padding: 24,
          border: "1px dashed",
          borderColor: "#e7e5e4",
          borderRadius: 8,
          color: "#78716c",
          fontSize: 15,
          lineHeight: 1.6,
          maxWidth: "70ch",
        }}
      >
        This application is built from its own repository and was not produced by
        the last site build — usually because its dependencies are not installed
        here. Run <code>npm run apps</code> from <code>apps/yen</code> to build it.
      </div>
    );
  }

  return (
    <iframe
      src={`/mounted/${id}/${entryFile ? "index.html" : ""}`}
      title={title}
      style={{
        display: "block",
        width: "100%",
        height: "calc(100dvh - 120px)",
        minHeight: 560,
        border: "1px solid #e7e5e4",
        borderRadius: 8,
        background: "#fff",
      }}
    />
  );
}

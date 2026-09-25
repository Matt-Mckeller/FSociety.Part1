import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import withBundleAnalyzer from "@next/bundle-analyzer";

/*
  Zones: applications that cannot be imported into this build.

  @4eye/web is imported directly because it shares yen's stack. 4up does not —
  it runs Next 16 / React 19 / MUI 7 against yen's Next 14 / React 18 / MUI 9,
  and a React tree admits exactly one React. Rather than force a migration on
  either side, it is federated: yen proxies its path to the app's own origin, so
  both keep their stacks and the user sees one site.

  Each zone is opt-in. With no origin set, no rewrite is registered and the path
  keeps serving whatever yen renders there today — so a zone being down or not
  yet deployed degrades to yen's own page rather than a 502.
*/
const ZONES = [{ path: "4up", origin: process.env.FOURUP_ORIGIN }];

const activeZones = ZONES.filter((z) => Boolean(z.origin));

const SPA_MOUNTS = ["command-center", "storybook", "storybook-expanse"];

/*
  Next does not serve a directory URL as that directory's index.html.

  SPA mounts: every nested path is the same document; the app's own router
  owns the rest. MPA mounts (Next static export): `/messages/m1` is a real
  page at `messages/m1/index.html`. A catch-all to the mount root made every
  nested link reopen the home screen.

  Exact directory → index.html rules are generated from disk so a param
  glob cannot mis-substitute a catch-all into the wrong document. A
  generic glob remains as a fallback for mounts added after this config
  was loaded.
*/
function mountedAppRewrites() {
  const root = join(process.cwd(), "public/mounted");
  const rules = [];
  if (!existsSync(root)) return rules;

  for (const id of readdirSync(root)) {
    const dir = join(root, id);
    if (!statSync(dir).isDirectory()) continue;

    if (SPA_MOUNTS.includes(id)) {
      rules.push(
        { source: `/mounted/${id}`, destination: `/mounted/${id}/index.html` },
        {
          source: `/mounted/${id}/:path*`,
          destination: `/mounted/${id}/index.html`,
        },
      );
      continue;
    }

    rules.push({
      source: `/mounted/${id}`,
      destination: `/mounted/${id}/index.html`,
    });
    walkMpaIndexes(dir, `/mounted/${id}`, rules);
  }
  return rules;
}

function walkMpaIndexes(abs, url, rules) {
  for (const name of readdirSync(abs)) {
    const full = join(abs, name);
    if (!statSync(full).isDirectory()) continue;
    const nested = `${url}/${name}`;
    if (existsSync(join(full, "index.html"))) {
      rules.push({ source: nested, destination: `${nested}/index.html` });
    }
    walkMpaIndexes(full, nested, rules);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 8,
  },
  /*
    Standalone output for the Cloud Run image: traced node_modules + server.js
    under .next/standalone, so the runtime stage does not ship the whole store.
  */
  output: "standalone",

  async rewrites() {
    return [
      /*
        Applications built by `npm run apps` and served from `public/mounted/`.
        These are `afterFiles` rewrites: real assets under the mount miss them.
      */
      ...mountedAppRewrites(),
      { source: "/mounted/:app", destination: "/mounted/:app/index.html" },
      {
        source: "/mounted/:app/:path*",
        destination: "/mounted/:app/:path*/index.html",
      },

      ...activeZones.flatMap((zone) => [
      // The zone's own root, and everything beneath it.
      { source: `/${zone.path}`, destination: `${zone.origin}/${zone.path}` },
      {
        source: `/${zone.path}/:path*`,
        destination: `${zone.origin}/${zone.path}/:path*`,
      },
      /*
        Zone apps request their own static chunks from /_next/*, which would
        otherwise hit yen and 404. Each zone must set `assetPrefix` to
        `/<path>-static` so those requests are distinguishable here.
      */
      {
        source: `/${zone.path}-static/_next/:path*`,
        destination: `${zone.origin}/_next/:path*`,
      },
      ]),
    ];
  },

  env: {
    /*
      Where the @4eye/web app is mounted in this host. The package builds every
      internal route through `route()` in its lib/routes.ts, so this single
      value is what makes the same source serve `/` on its own dev server and
      `/4eye` here.

      It lives in next.config rather than a shell prefix on the npm script:
      `VAR=x cmd1 && cmd2` applies only to cmd1, which shipped a build with
      unprefixed nav links that all 404'd.
    */
    NEXT_PUBLIC_4EYE_BASE_PATH: "/4eye",
  },
  transpilePackages: [
    "@expanse/theme",
    "@expanse/ui",
    "@expanse/brand-core",
    "@expanse/character",
    "@expanse/hud",
    "@expanse/shell",
    "@expanse/lens",
    "@expanse/scoring",
    "@expanse/map",
    "@4eye/features",
    "@4eye/icons",
    "@4eye/types",
    "@4eye/ai-sdk",
    "@4eye/web",
    "@yen/content",
  ],
  typescript: {
    /*
      The @4eye/web package carries 53 pre-existing type errors — mostly MUI v9
      overload mismatches that do not reflect runtime behaviour, which is why
      that app has always run with this same flag.

      yen's own code is NOT covered by this exemption: `pnpm typecheck` uses
      tsconfig.strict.json, which excludes the imported app and must stay clean.
      Run `pnpm typecheck:all` to see the inherited errors.
    */
    ignoreBuildErrors: true,
  },
  experimental: {
    /*
      Webpack reads yen's tsconfig `paths`. Turbopack does not, so the
      brand-core TaskCard import of a package that does not exist in this
      repo 404s unless the stub is named here too.
    */
    turbo: {
      resolveAlias: {
        "expanse.ui/points":
          "../../packages/@expanse/brand-core/src/game/points/_stub/points.ts",
        "expanse.ui/points/components":
          "../../packages/@expanse/brand-core/src/game/points/_stub/components.ts",
      },
    },
    /*
      Without this, `import { Box } from "@mui/material"` pulls the whole
      barrel into every route that touches it, which alone overruns the
      first-load budget documented in the plan.
    */
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
};

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;

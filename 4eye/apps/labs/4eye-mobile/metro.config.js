// Metro config for the 4eye pnpm monorepo.
// Watches the repo root so symlinked workspace packages (e.g.
// @expanse/character) resolve, and enables package `exports` so subpath
// entries like `@expanse/character/3d` (which map to TypeScript source) load.
const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, "../..")

const config = getDefaultConfig(projectRoot)

// 1. Watch all files in the monorepo so source changes in packages hot-reload.
config.watchFolders = [workspaceRoot]

// 2. Resolve modules from the app first, then the workspace root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
]

// 3. pnpm symlinks + package `exports` (needed for @expanse/character subpaths).
config.resolver.unstable_enableSymlinks = true
config.resolver.unstable_enablePackageExports = true

module.exports = config

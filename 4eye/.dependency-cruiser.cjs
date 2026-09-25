/**
 * Dependency-cruiser configuration (P6).
 *
 * Enforces the layered package architecture after the @expanse/layout
 * dissolution (P8). Tokens and presentation primitives are the bottom of the
 * graph; the map engine sits above them; the app shell composes the map; the
 * HUD sits on top:
 *
 *     @expanse/hud
 *        →  @expanse/shell
 *        →  @expanse/map
 *        →  @expanse/theme, @expanse/ui
 *
 * Dependencies may only point "downward". Any upward edge (a back-edge, e.g.
 * map importing shell, or theme importing map) is a build break and fails CI.
 *
 * Note: @expanse/shell → @expanse/map IS allowed — page scaffolding and
 * layout validation legitimately consume map Position/TileConfig contracts.
 *
 * Tests, stories, and Storybook config are excluded from the source graph:
 * they legitimately import from any layer to exercise/showcase components.
 * (This also keeps the dev-only hud↔shell story dependency out of the cycle
 * check.)
 *
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: 'no-map-to-shell',
      comment:
        '@expanse/map is a pure navigation/tile engine and must not depend on ' +
        '@expanse/shell (back-edge). Shell composes map, not the other way round.',
      severity: 'error',
      from: { path: '^packages/@expanse/map/src' },
      to: { path: '^packages/@expanse/shell/src' },
    },
    {
      name: 'no-map-to-hud',
      comment:
        '@expanse/map must not depend on @expanse/hud (back-edge). ' +
        'Map sits below both the shell and the HUD.',
      severity: 'error',
      from: { path: '^packages/@expanse/map/src' },
      to: { path: '^packages/@expanse/hud/src' },
    },
    {
      name: 'no-shell-to-hud',
      comment:
        '@expanse/shell must not depend on @expanse/hud in source (back-edge). ' +
        'HUD chrome sits above the shell. (Story-only deps are excluded.)',
      severity: 'error',
      from: { path: '^packages/@expanse/shell/src' },
      to: { path: '^packages/@expanse/hud/src' },
    },
    {
      name: 'no-theme-upward',
      comment:
        '@expanse/theme is the bottom token layer and must not depend on ' +
        'map/shell/hud/ui. Tokens have no knowledge of consumers.',
      severity: 'error',
      from: { path: '^packages/@expanse/theme/src' },
      to: { path: '^packages/@expanse/(map|shell|hud|ui)/src' },
    },
    {
      name: 'no-ui-upward',
      comment:
        '@expanse/ui holds presentation primitives and must not depend on ' +
        'map/shell/hud. Primitives are consumed by, not aware of, those layers.',
      severity: 'error',
      from: { path: '^packages/@expanse/ui/src' },
      to: { path: '^packages/@expanse/(map|shell|hud)/src' },
    },
    {
      name: 'no-circular',
      comment:
        'Circular dependencies make the module graph fragile; break the cycle. ' +
        'Reported as a warning: the codebase has pre-existing intra-package ' +
        'barrel re-export cycles (a module importing its own package index) that ' +
        'predate the layout dissolution and are tracked for separate cleanup. ' +
        'The hard layering guarantees are the cross-package back-edge rules above.',
      severity: 'warn',
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: {
      path: [
        '\\.stories\\.[jt]sx?$',
        '\\.test\\.[jt]sx?$',
        '/__tests__/',
        '/__mocks__/',
        '\\.storybook/',
      ],
    },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.base.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      mainFields: ['module', 'main', 'types'],
    },
  },
};

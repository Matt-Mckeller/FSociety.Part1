/**
 * Integration-layer model.
 *
 * The model itself now lives in `@yen/content` so the yen site and this app
 * describe the same eight layers rather than two copies that drift. This file
 * stays as the import path the tiles and panels already use.
 */

export * from "@yen/content/layers";

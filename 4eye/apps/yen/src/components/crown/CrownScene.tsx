"use client";

/**
 * The crown, rendered.
 *
 * Loaded only when crown mode is actually entered — `three` is roughly three
 * hundred kilobytes and the home route has a first-load budget that the rest of
 * the site is held to. Everything here sits behind `next/dynamic` in
 * `CrownStage`, so a visitor who never presses the button never pays for it.
 *
 * ── The transform ─────────────────────────────────────────────────────────
 * The entrance *is* the transform. At t=0 the rig lies flat and its spires have
 * no height, so what is on screen is a ring of five coloured points at the same
 * radius and the same angles the compass draws them at. Over the next second
 * the ring tips up and the points grow into spires. Nothing fades into anything
 * — the pillars stand up, which is the whole idea.
 */

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  DoubleSide,
  MathUtils,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  type PerspectiveCamera,
} from "three";

import { BANDS, CREST_BAND, CROWN_COLORS, SPIRES } from "./crownModel";

/** Seconds the rig takes to stand up. */
const MORPH_SECONDS = 1.15;
/**
 * Where the spires stand, in world units.
 *
 * Deliberately wide against the spire height below. The first pass had tall
 * thin spikes on a narrow ring and the thing read as a set of traffic cones —
 * a crown is a broad band with short points, not a circle of spears.
 */
const R = 1.05;
/** The floor of the band stack. */
const BASE_Y = -0.62;
/** How far the band stack rises. Kept under the spire height so points show. */
const STACK_H = 0.62;

/** World-space height of one band. */
const bandY = (rise: number) => BASE_Y + rise * STACK_H;

export interface CrownSceneProps {
  /** Product id whose spire is lit, or null. */
  focusedAppId?: string | null;
  /** Group id whose band is lit, or null. */
  focusedBandId?: string | null;
  /** Slow continuous turn. Used in the full-screen view, not in the header. */
  spin?: boolean;
  /** Skip the stand-up animation, the flicker and the spin. */
  reducedMotion?: boolean;
  /**
   * Half-extent, in world units, the camera must keep in frame.
   *
   * Raise it to leave more air around the crown. The distance itself is
   * computed, not passed: the header panel is square and the full-screen stage
   * is a tall column, and a fixed distance that frames one crops the other —
   * which is exactly what happened before this existed.
   */
  fit?: number;
}

/* --------------------------------------------------------------- the pieces */

/**
 * One point of the crown, and the flame on it.
 *
 * The spike is a four-sided cylinder rather than a cone: a cone reads as a
 * traffic bollard at this size, and four facets catch the two lights
 * differently enough to give the amethyst some depth without a reflection map.
 */
function Spire({
  angle,
  height,
  accent,
  lit,
  reducedMotion,
}: {
  angle: number;
  height: number;
  accent: string;
  lit: boolean;
  reducedMotion: boolean;
}) {
  const flame = React.useRef<Mesh>(null);
  const body = React.useRef<MeshStandardMaterial>(null);
  /* Per-spire phase, so the five flames never pulse together. */
  const phase = React.useMemo(() => angle * 1.7, [angle]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (flame.current) {
      const flicker = reducedMotion ? 1 : 1 + Math.sin(t * 3.1 + phase) * 0.14;
      flame.current.scale.set(flicker, 1 + (flicker - 1) * 2.2, flicker);
    }
    if (body.current) {
      /*
        The focused product's own accent bleeds into the emissive, so hovering a
        tile in the picker is answered on the crown itself rather than only in
        the list. Lerped rather than set, or the swap snaps.
      */
      body.current.emissiveIntensity = MathUtils.lerp(
        body.current.emissiveIntensity,
        lit ? 1.4 : 0.22,
        0.12,
      );
    }
  });

  /*
    Short and broad. The first pass gave each point a height near the crown's
    own radius and the object read as a crown of thorns — five spears round a
    hoop. A coronet's points are a third of the band's width, not equal to it.
  */
  const h = 0.24 + height * 0.28;
  /* Standing on the crest band, at its radius — the points grow out of it. */
  const ring = R * CREST_BAND.radius;
  const x = Math.sin(angle) * ring;
  const z = Math.cos(angle) * ring;

  return (
    /* Seated a hair into the band, so its bottom cap never shows below the ring. */
    <group position={[x, bandY(CREST_BAND.rise) - 0.02, z]}>
      {/*
        The spike, turned so a flat face points outward rather than a corner.
        Square-on, the base corner reaches further from the axis than the band
        it stands on and pokes through the front of the ring.
      */}
      <mesh position={[0, h / 2, 0]} rotation={[0, -angle + Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.012, 0.12, h, 4]} />
        <meshStandardMaterial
          ref={body}
          color={CROWN_COLORS.black}
          emissive={lit ? accent : CROWN_COLORS.stone}
          emissiveIntensity={0.22}
          roughness={0.28}
          metalness={0.75}
          flatShading
        />
      </mesh>

      {/*
        The flame, in two shells. The amethyst one is additive and wide; the
        black one is opaque, narrower and sits inside it. Order matters — the
        dark shell has to be drawn over the glow, because a black flame is the
        absence in the middle of a light, not a dark shape beside one.
      */}
      <mesh ref={flame} position={[0, h + 0.17, 0]}>
        <coneGeometry args={[0.055, 0.34, 6, 1, true]} />
        <meshBasicMaterial
          color={CROWN_COLORS.flameEdge}
          transparent
          opacity={0.7}
          blending={AdditiveBlending}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, h + 0.14, 0]}>
        <coneGeometry args={[0.03, 0.26, 6, 1, true]} />
        <meshBasicMaterial color={CROWN_COLORS.black} transparent opacity={0.92} side={DoubleSide} />
      </mesh>

      {/* the tip jewel */}
      <mesh position={[0, h, 0]}>
        <octahedronGeometry args={[0.05, 0]} />
        <meshStandardMaterial
          color={CROWN_COLORS.led}
          emissive={accent}
          emissiveIntensity={lit ? 2.4 : 1}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

/** One band of the stack — a group of the application grid, as a ring. */
function Band({
  band,
  lit,
}: {
  band: (typeof BANDS)[number];
  lit: boolean;
}) {
  const mat = React.useRef<MeshStandardMaterial>(null);

  /*
    Quiet until asked. Lit at rest, five saturated rings turned the object into
    a stack of neon hoops and buried the amethyst the crown is actually made of.
    Held down, each band is a dark inlay that states its hue without shouting
    it — and lighting up becomes something the band does rather than its
    permanent condition, which is what makes focusing a group legible at all.
  */
  useFrame(() => {
    if (mat.current) {
      mat.current.emissiveIntensity = MathUtils.lerp(
        mat.current.emissiveIntensity,
        lit ? 3.2 : 0.5,
        0.12,
      );
    }
  });

  const radius = R * band.radius;

  return (
    <group position={[0, bandY(band.rise), 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/*
        One ring, in the group's own colour.
        A first pass wrapped each band in a thicker black torus to make it read
        as an inlay. Against the dark stage it read as nothing at all: the
        backing was the same value as the ground and simply ate the accent. The
        ground is the contrast; the band only has to be the band.
      */}
      <mesh>
        <torusGeometry args={[radius, 0.036, 10, 80]} />
        {/*
          Black metal carrying a coloured light, not coloured plastic. The
          diffuse colour is what the amethyst point lights hit, so leaving the
          accent there made every band a fully saturated hoop no matter how far
          the emissive was turned down. Black diffuse + accent emissive gives a
          dark band with the group's hue in it, and leaves the emissive free to
          mean one thing only: this is the group you are on.
        */}
        <meshStandardMaterial
          ref={mat}
          color={CROWN_COLORS.black}
          emissive={band.accent}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

/**
 * The coronet body — the metal the bands are set into.
 *
 * Without it the five rings hang in space with daylight between them and the
 * object reads as a stack of hoops rather than as a crown. It is an open-ended
 * tapered shell, dark and slightly transparent, so the bands still sit proud of
 * it and the flame behind the far side still shows through.
 */
function CoronetBody() {
  const top = BANDS[0];
  const bottom = BANDS[BANDS.length - 1];
  const height = (top.rise - bottom.rise) * STACK_H;

  return (
    <mesh position={[0, bandY((top.rise + bottom.rise) / 2), 0]}>
      <cylinderGeometry args={[R * top.radius, R * bottom.radius, height, 64, 1, true]} />
      <meshStandardMaterial
        color={CROWN_COLORS.stoneDeep}
        emissive={CROWN_COLORS.flameCore}
        emissiveIntensity={0.16}
        roughness={0.35}
        metalness={0.85}
        transparent
        opacity={0.82}
        side={DoubleSide}
      />
    </mesh>
  );
}

/**
 * The LED bead.
 *
 * A single bright point travelling the base band. One bead rather than a
 * chasing dash pattern: at this scale a dashed ring reads as a loading spinner,
 * and a single travelling light reads as current in a circuit — which is the
 * intended impression.
 */
function LedBead({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = React.useRef<Mesh>(null);
  const radius = R * CREST_BAND.radius;
  const y = bandY(CREST_BAND.rise);

  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return;
    const a = clock.getElapsedTime() * 1.35;
    ref.current.position.set(Math.sin(a) * radius, y, Math.cos(a) * radius);
  });

  return (
    <mesh ref={ref} position={[0, y, radius]}>
      <sphereGeometry args={[0.038, 12, 12]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

/**
 * The mounted stone, centre front.
 *
 * Distinct from the tip jewels: those belong to the products, this one belongs
 * to the crown. It sits where a real crown puts its principal stone — dead
 * centre of the front band, under the tallest point.
 */
function CentreStone() {
  const ref = React.useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.6;
  });

  return (
    <mesh ref={ref} position={[0, bandY(CREST_BAND.rise), R * CREST_BAND.radius * 0.99]}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial
        color={CROWN_COLORS.diamond}
        emissive={CROWN_COLORS.flameEdge}
        emissiveIntensity={1.7}
        roughness={0.05}
        metalness={0.35}
        flatShading
      />
    </mesh>
  );
}

/**
 * Pulls the camera back until the crown fits, whatever shape its container is.
 *
 * `fov` in three.js is the *vertical* angle, so a tall narrow viewport shows
 * less width, not more — the full-screen column cropped the crown at the sides
 * while the square header panel framed it perfectly at the same distance. The
 * horizontal case is the one that has to be solved for, so both are, and the
 * larger distance wins.
 */
function FitCamera({ fit }: { fit: number }) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);

  React.useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const halfFov = (camera.fov * Math.PI) / 360;
    const distance = fit / (Math.tan(halfFov) * Math.min(1, aspect));
    camera.position.set(0, distance * 0.17, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, fit]);

  return null;
}

/* ------------------------------------------------------------------ the rig */

function CrownRig({ focusedAppId, focusedBandId, spin, reducedMotion }: CrownSceneProps) {
  const rig = React.useRef<Group>(null);
  const start = React.useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!rig.current) return;
    if (start.current === null) start.current = clock.getElapsedTime();

    const elapsed = clock.getElapsedTime() - start.current;
    const raw = reducedMotion ? 1 : Math.min(1, elapsed / MORPH_SECONDS);
    /* Ease out cubic — fast off the plane, settling rather than arriving. */
    const t = 1 - Math.pow(1 - raw, 3);

    /*
      Flat to upright. At t=0 the rig is face-on to the camera, which puts the
      five spire bases exactly where the compass draws its five points; by t=1 it
      has tipped back to a shallow display angle.
    */
    rig.current.rotation.x = MathUtils.lerp(-Math.PI / 2, 0.16, t);
    rig.current.scale.setScalar(MathUtils.lerp(0.82, 1, t));

    if (spin && !reducedMotion) {
      rig.current.rotation.y = (clock.getElapsedTime() - (start.current ?? 0)) * 0.22;
    } else {
      /* A slight, fixed three-quarter turn reads better than dead-on. */
      rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, 0.24, 0.08);
    }
  });

  return (
    <group ref={rig}>
      <CoronetBody />
      {BANDS.map((band) => (
        <Band key={band.id} band={band} lit={focusedBandId === band.id} />
      ))}
      {SPIRES.map((spire) => (
        <Spire
          key={spire.app.id}
          angle={spire.angle}
          height={spire.height}
          accent={spire.app.accent}
          lit={focusedAppId === spire.app.id}
          reducedMotion={Boolean(reducedMotion)}
        />
      ))}
      <LedBead reducedMotion={Boolean(reducedMotion)} />
      <CentreStone />
    </group>
  );
}

/* --------------------------------------------------------------- the canvas */

export default function CrownScene({ fit = 1.45, ...props }: CrownSceneProps) {
  return (
    <Canvas
      /*
        Capped at 2. Uncapped, a 3× phone renders nine times the pixels for a
        300px ornament and drops frames doing it.
      */
      dpr={[1, 2]}
      /* Position is overridden by FitCamera on mount and on every resize. */
      camera={{ position: [0, 0.62, 3.7], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Low ambient so the emissives carry the image and the body stays dark. */}
      <FitCamera fit={fit} />
      <ambientLight intensity={0.28} />
      <pointLight position={[2.2, 2.4, 2.6]} intensity={26} color={CROWN_COLORS.flameEdge} />
      <pointLight position={[-2.4, 1.2, 1.8]} intensity={16} color={CROWN_COLORS.stoneLight} />
      <pointLight position={[0, -1.6, 2.2]} intensity={11} color={CROWN_COLORS.flameCore} />
      <CrownRig {...props} />
    </Canvas>
  );
}

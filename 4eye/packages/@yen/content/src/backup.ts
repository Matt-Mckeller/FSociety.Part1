/**
 * Backup & encrypt — tools you run. Not Ion.
 *
 * Same exhibit shape as the home profile band: one frame, two captures.
 * The panel binds to localhost and reads a real disk, so yen shows pictures
 * with stand-in data. A screenshot of a backup tool is a map of the machine.
 */

export type BackupShotId = "overview" | "encrypt";

export interface BackupShot {
  id: BackupShotId;
  src: string;
  alt: string;
  caption: string;
}

export const BACKUP_PREVIEW = {
  host: "localhost · backup",
  handle: "not Ion",
  accent: "#0f766e",
  shots: [
    {
      id: "overview",
      src: "/media/preview/backup-overview.png",
      alt: "Backup control: disk, readiness, and estimated job size — stand-in data, not a real machine.",
      caption: "Backup — see the disk, then run an encrypted archive",
    },
    {
      id: "encrypt",
      src: "/media/preview/backup-encrypt.png",
      alt: "Password encrypt: lock a file with OpenPGP, decrypt beside it — mock path, password masked.",
      caption: "Encrypt — a password, a file; unlock anywhere GPG runs",
    },
  ] satisfies BackupShot[],
  dataNote:
    "The interface is real. The machine in the pictures is not — paths, sizes and names are invented.",
  privacyHref: "/apps/sample-privacy",
} as const;

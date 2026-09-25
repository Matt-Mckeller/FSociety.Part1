const STORAGE_KEY = "4eye:ai-permissions:v1";

function toBase64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function fromBase64(str: string): ArrayBuffer {
  const bin = atob(str);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer as ArrayBuffer;
}

async function deriveKey(passphrase: string, salt: ArrayBuffer): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptPermissions(plaintext: string, passphrase: string): Promise<void> {
  const saltBuf = crypto.getRandomValues(new Uint8Array(16));
  const ivBuf = crypto.getRandomValues(new Uint8Array(12));
  const salt = saltBuf.buffer as ArrayBuffer;
  const iv = ivBuf.buffer as ArrayBuffer;
  const key = await deriveKey(passphrase, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ salt: toBase64(salt), iv: toBase64(iv), ciphertext: toBase64(ciphertext) })
  );
}

export async function decryptPermissions(passphrase: string): Promise<string | null> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const { salt, iv, ciphertext } = JSON.parse(raw) as {
      salt: string;
      iv: string;
      ciphertext: string;
    };
    const key = await deriveKey(passphrase, fromBase64(salt));
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromBase64(iv) },
      key,
      fromBase64(ciphertext)
    );
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}

export function hasStoredPermissions(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function clearStoredPermissions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

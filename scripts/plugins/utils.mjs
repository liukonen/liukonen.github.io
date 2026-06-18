import fs from "node:fs";
import crypto from "node:crypto";

export function getHash(str) {
  return crypto.createHash("md5").update(str).digest("hex")
}

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

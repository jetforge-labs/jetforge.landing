// Generates public/apps/checkmate-ios-qr.svg (QR for the Checkmate App Store page, with the app icon in the centre).
//
// Going live = change CHECKMATE_APP_STORE_URL in src/app/[locale]/_components/apps.ts, then run:
//   node scripts/gen-checkmate-qr.mjs            (URL read from apps.ts)
//   node scripts/gen-checkmate-qr.mjs <url>      (override, e.g. for a one-off test)
// The script rasterizes the result at 240px and 120px, decodes both with jsqr and exits non-zero unless
// both decode to the exact URL.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import jsQR from "jsqr";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function urlFromApps() {
  const src = readFileSync(resolve(root, "src/app/[locale]/_components/apps.ts"), "utf8");
  const m = src.match(/CHECKMATE_APP_STORE_URL\s*=\s*"([^"]+)"/);
  if (!m) throw new Error("CHECKMATE_APP_STORE_URL not found in apps.ts");
  return m[1];
}

const url = process.argv[2] ?? urlFromApps();
const INK = "#0B2E2D";
const QUIET = 4;

const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
const n = qr.modules.size;
const data = qr.modules.data;
const total = n + QUIET * 2;

// Logo: 20% of symbol width, plate = icon + 1 module each side, snapped to whole modules (odd count to centre).
let icon = Math.round(n * 0.2);
if ((n - icon) % 2) icon += 1;
const plate = icon + 2;
const plateStart = QUIET + (n - plate) / 2;
const iconStart = plateStart + 1;

const inLogo = (x, y) => {
  const px = x + QUIET, py = y + QUIET;
  return px >= plateStart && px < plateStart + plate && py >= plateStart && py < plateStart + plate;
};

let d = "";
for (let y = 0; y < n; y++) {
  for (let x = 0; x < n; x++) {
    if (data[y * n + x] && !inLogo(x, y)) d += `M${x + QUIET} ${y + QUIET}h1v1h-1z`;
  }
}

const iconPng = await sharp(resolve(root, "public/apps/checkmate-icon.png")).resize(96, 96).png({ palette: true, quality: 80, effort: 10 }).toBuffer();
const b64 = iconPng.toString("base64");

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${total} ${total}" width="120" height="120">` +
  `<rect width="${total}" height="${total}" fill="#FFFFFF"/>` +
  `<path d="${d}" fill="${INK}" shape-rendering="crispEdges"/>` +
  `<rect x="${plateStart}" y="${plateStart}" width="${plate}" height="${plate}" rx="${(plate * 0.22).toFixed(2)}" fill="#FFFFFF"/>` +
  `<image x="${iconStart}" y="${iconStart}" width="${icon}" height="${icon}" href="data:image/png;base64,${b64}"/>` +
  `</svg>\n`;

const out = resolve(root, "public/apps/checkmate-ios-qr.svg");
writeFileSync(out, svg);

let ok = true;
for (const px of [240, 120]) {
  const { data: rgba, info } = await sharp(Buffer.from(svg), { density: (72 * px) / 120 })
    .resize(px, px)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const res = jsQR(new Uint8ClampedArray(rgba), info.width, info.height);
  const pass = res?.data === url;
  ok &&= pass;
  console.log(`${px}px decode: ${pass ? "OK" : "FAIL"} (${res?.data ?? "no result"})`);
}
console.log(`version ${qr.version}, ${n} modules, logo ${icon} modules, ${(svg.length / 1024).toFixed(1)} KB -> ${out}`);
if (!ok) process.exit(1);

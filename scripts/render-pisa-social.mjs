import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const html = path.join(root, "pisa-social-cards.html");
const outDir = path.join(root, "../public/social/pisa-2025");

const shots = [
  ["principal", "pisa-2025-instagram-principal.png"],
  ["quote", "pisa-2025-quote-democracia.png"],
  ["ia", "pisa-2025-ia-estudio.png"],
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
});
await page.goto(`file://${html}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

for (const [id, file] of shots) {
  const dest = path.join(outDir, file);
  await page.locator(`#${id}`).screenshot({ path: dest, type: "png" });
  console.log(dest);
}

await browser.close();

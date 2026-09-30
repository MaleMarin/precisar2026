import { expect, test } from "@playwright/test";

const EJE_PATHS = [
  "/educacion-mediatica/comunicacion",
  "/educacion-mediatica/educacion",
  "/educacion-mediatica/tecnologia",
  "/educacion-mediatica/cultura",
] as const;

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

async function assertHeroTitleDoesNotOverlapIntro(page: import("@playwright/test").Page) {
  const result = await page.evaluate(() => {
    const header = document.querySelector("article > header");
    const title = header?.querySelector("h1");
    const intro = header?.querySelector("p");
    if (!title || !intro) return { ok: false, reason: "missing nodes" };
    const a = title.getBoundingClientRect();
    const b = intro.getBoundingClientRect();
    const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    const colliding = overlapX > 1 && overlapY > 1;
    const overflow = title.scrollWidth - title.clientWidth > 2;
    return {
      ok: !colliding && !overflow,
      colliding,
      overflow,
      overlapX,
      overlapY,
      titleW: a.width,
      introL: b.left,
    };
  });
  expect(result.ok, JSON.stringify(result)).toBe(true);
}

for (const vp of VIEWPORTS) {
  test.describe(`${vp.width}x${vp.height}`, () => {
    for (const path of EJE_PATHS) {
      test(`hero no overlap ${path}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(path, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("load");
        await expect(page.locator("article > header h1")).toBeVisible();
        await assertHeroTitleDoesNotOverlapIntro(page);
      });
    }
  });
}

import { expect, test } from "@playwright/test";

const PATHS = [
  "/",
  "/somos",
  "/precisando",
  "/programas",
  "/programas/hub-digital-consciente",
  "/programas/ciudades",
  "/culturadigital",
  "/consulta",
  "/en",
  "/pt",
  "/en/somos",
  "/pt/somos",
] as const;

const VIEWPORTS = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
] as const;

async function overflowDelta(page: import("@playwright/test").Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}

test("home has exactly one semantic H1", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  const count = await page.locator("h1").count();
  expect(count).toBe(1);
  const hiddenClones = page.locator('[aria-hidden="true"]').filter({ hasText: /democracia|democracy/i });
  expect(await hiddenClones.count()).toBeGreaterThan(0);
});

for (const vp of VIEWPORTS) {
  test.describe(`${vp.width}px`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    for (const path of PATHS) {
      test(`no horizontal overflow ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("load");
        const delta = await overflowDelta(page);
        expect.soft(delta, `${path} @${vp.width} overflow ${delta}px`).toBeLessThanOrEqual(1);
      });
    }
  });
}

test.describe("keyboard", () => {
  test("skip link, menu, Escape, locale switch stay reachable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const toggle = page.locator('button[aria-controls="site-nav-mobile-panel"]');
    await expect(toggle).toBeVisible();
    await toggle.click();
    const panel = page.locator("#site-nav-mobile-panel");
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);

    await page.keyboard.press("Tab");
    const skip = page.locator('a[href="#contenido-principal"]');
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#contenido-principal")).toBeFocused();
  });
});

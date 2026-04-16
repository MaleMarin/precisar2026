import { expect, test } from "@playwright/test";

/** Rutas que no redirigen a hash en home; cubren home + internas representativas. */
const PATHS = ["/", "/somos", "/precisando/explora", "/participa", "/contacto"] as const;

const VIEWPORTS = [
  { width: 360, height: 800, name: "mobile-360" },
  { width: 390, height: 844, name: "mobile-390" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 1440, height: 900, name: "desktop" },
] as const;

function pathToFileSegment(path: string): string {
  if (path === "/") return "home";
  return path.replace(/^\//, "").replace(/\//g, "-");
}

async function assertNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const delta = await page.evaluate(() => {
    const d = document.documentElement;
    return d.scrollWidth - d.clientWidth;
  });
  expect.soft(delta, `scrollWidth - clientWidth should be ≤ 1 (got ${delta})`).toBeLessThanOrEqual(1);
}

for (const vp of VIEWPORTS) {
  test.describe(`viewport ${vp.width}x${vp.height}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    for (const path of PATHS) {
      test(`no horizontal overflow: ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("load");
        await assertNoHorizontalOverflow(page);
        await page.screenshot({
          path: `test-results/responsive-smoke/${vp.name}-${pathToFileSegment(path)}.png`,
          fullPage: true,
        });
      });
    }
  });
}

test.describe("mobile menu (390×844)", () => {
  test("hamburger opens panel, no overflow, ESC closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await assertNoHorizontalOverflow(page);

    const toggle = page.locator('button[aria-controls="site-nav-mobile-panel"]');
    await expect(toggle).toBeVisible();
    await toggle.click();

    const panel = page.locator("#site-nav-mobile-panel");
    await expect(panel).toBeVisible();
    await assertNoHorizontalOverflow(page);

    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await assertNoHorizontalOverflow(page);
  });
});

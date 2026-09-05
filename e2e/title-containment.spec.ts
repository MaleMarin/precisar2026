import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { width: 1920, height: 1080 },
  { width: 1680, height: 1050 },
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 820, height: 1180 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 375, height: 667 },
  { width: 360, height: 800 },
  { width: 320, height: 568 },
] as const;

const PATHS = [
  "/",
  "/somos",
  "/educacion-mediatica/comunicacion",
  "/educacion-mediatica/educacion",
  "/programas/ciudades",
  "/en",
  "/pt",
] as const;

async function assertNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const delta = await page.evaluate(() => {
    const d = document.documentElement;
    return d.scrollWidth - d.clientWidth;
  });
  expect.soft(delta, `horizontal overflow ${delta}px`).toBeLessThanOrEqual(1);
}

async function assertTitleDoesNotOverlapAside(page: import("@playwright/test").Page) {
  const result = await page.evaluate(() => {
    const section = document.querySelector("#educacion-mediatica");
    if (!section) return { skip: true, gap: 999 };
    const title = section.querySelector("h2");
    const grid = title?.closest("[class*='grid']") ?? section;
    const children = grid ? Array.from(grid.children) : [];
    const aside = children.find((el) => el !== title?.parentElement && el.querySelector("a, ol, ul"));
    if (!title || !aside) return { skip: true, gap: 999 };
    const a = title.getBoundingClientRect();
    const b = aside.getBoundingClientRect();
    if (b.top - a.bottom > 8) return { skip: true, gap: 999 };
    return { skip: false, gap: b.left - a.right };
  });
  if (!result.skip) {
    expect.soft(result.gap, "title must stay left of the aside card").toBeGreaterThanOrEqual(16);
  }
}

for (const vp of VIEWPORTS) {
  test.describe(`${vp.width}x${vp.height}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    for (const path of PATHS) {
      test(`overflow ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("load");
        await assertNoHorizontalOverflow(page);
      });
    }

    test("educacion mediatica title vs card", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("load");
      const section = page.locator("#educacion-mediatica");
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await assertTitleDoesNotOverlapAside(page);
      await assertNoHorizontalOverflow(page);
    });
  });
}

import { expect, test } from "@playwright/test";

function locationPath(header: string | undefined): string {
  if (!header) return "";
  try {
    const u = new URL(header, "http://127.0.0.1:3000");
    const path = u.pathname.replace(/\/+$/, "") || "/";
    return `${path}${u.hash}`;
  } catch {
    return header.split("?")[0] || "";
  }
}

test.describe("locale routing", () => {
  test("/es/somos → /somos and never /en/somos", async ({ request }) => {
    const first = await request.get("/es/somos", { maxRedirects: 0 });
    expect(first.status()).toBe(308);
    const dest = locationPath(first.headers().location);
    expect(dest).toBe("/somos");
    expect(dest).not.toBe("/en/somos");

    const final = await request.get("/es/somos");
    expect(final.status()).toBe(200);
    expect(new URL(final.url()).pathname.replace(/\/+$/, "") || "/").toBe("/somos");
  });

  test("/es/somos with NEXT_LOCALE=en still lands on Spanish /somos", async ({ request }) => {
    const first = await request.get("/es/somos", {
      maxRedirects: 0,
      headers: { Cookie: "NEXT_LOCALE=en", "Accept-Language": "en-US,en;q=0.9" },
    });
    expect(first.status()).toBe(308);
    expect(locationPath(first.headers().location)).toBe("/somos");

    const final = await request.get("/es/somos", {
      headers: { Cookie: "NEXT_LOCALE=en", "Accept-Language": "en-US,en;q=0.9" },
    });
    expect(final.status()).toBe(200);
    expect(new URL(final.url()).pathname.replace(/\/+$/, "") || "/").toBe("/somos");
  });

  test("/en/somos stays English", async ({ request }) => {
    const res = await request.get("/en/somos", { maxRedirects: 0 });
    expect(res.status()).toBe(200);
    expect(new URL(res.url()).pathname.replace(/\/+$/, "") || "/").toBe("/en/somos");
  });

  test("/pt/somos stays Portuguese", async ({ request }) => {
    const res = await request.get("/pt/somos", { maxRedirects: 0 });
    expect(res.status()).toBe(200);
    expect(new URL(res.url()).pathname.replace(/\/+$/, "") || "/").toBe("/pt/somos");
  });

  test("legacy URLs go to the modern path in one hop", async ({ request }) => {
    const cases = [
      { from: "/quienes-somos", to: "/somos" },
      { from: "/es/quienes-somos", to: "/somos" },
      { from: "/blog", to: "/#precisando" },
      { from: "/es/blog", to: "/#precisando" },
      { from: "/hubdigitaconsciente", to: "/programas/hub-digital-consciente" },
      { from: "/es/hubdigitaconsciente", to: "/programas/hub-digital-consciente" },
    ] as const;

    for (const { from, to } of cases) {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status(), from).toBe(308);
      expect(locationPath(res.headers().location), from).toBe(to);
    }
  });
});

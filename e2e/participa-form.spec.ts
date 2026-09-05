import { expect, test, type Page, type Route } from "@playwright/test";

const ERROR_ES = "No pudimos completar el envío. Inténtalo nuevamente.";

async function mockParticipaContact(page: Page, handler: (route: Route) => Promise<void>) {
  await page.route("**/api/participa-contact", handler);
}

async function mockNewsletter(page: Page, handler: (route: Route) => Promise<void>) {
  await page.route("**/api/newsletter/subscribe", handler);
}

function contactForm(page: Page) {
  return page.locator("#participa-contact-email").locator("xpath=ancestor::form");
}

function newsletterForm(page: Page) {
  return page.locator("form").filter({ has: page.locator('input[name="consent"]') });
}

async function fillContact(page: Page) {
  await page.locator("#participa-contact-nombre").fill("Ada");
  await page.locator("#participa-contact-email").fill("ada@example.com");
  await page.locator("#participa-contact-mensaje").fill("hola");
}

async function openParticipa(page: Page) {
  await page.goto("/participa", { waitUntil: "domcontentloaded" });
}

test.describe("/participa contacto", () => {
  test("Resend correcto: redirige a /participa/gracias", async ({ page }) => {
    await mockParticipaContact(page, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await openParticipa(page);
    await fillContact(page);
    await contactForm(page).locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/participa\/gracias\/?$/);
  });

  test("Resend 500: no redirige, conserva valores, foco y aria-live", async ({ page }) => {
    await mockParticipaContact(page, async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, reason: "resend" }),
      });
    });
    await openParticipa(page);
    await fillContact(page);
    await contactForm(page).locator('button[type="submit"]').click();
    await expect(page).not.toHaveURL(/\/participa\/gracias/);
    const alert = contactForm(page).getByRole("alert");
    await expect(alert).toHaveText(ERROR_ES);
    await expect(alert).toHaveAttribute("aria-live", "assertive");
    await expect(alert).toBeFocused();
    await expect(page.locator("#participa-contact-nombre")).toHaveValue("Ada");
    await expect(page.locator("#participa-contact-email")).toHaveValue("ada@example.com");
    await expect(page.locator("#participa-contact-mensaje")).toHaveValue("hola");
  });

  test("configuración ausente: no redirige", async ({ page }) => {
    await mockParticipaContact(page, async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, reason: "config" }),
      });
    });
    await openParticipa(page);
    await fillContact(page);
    await contactForm(page).locator('button[type="submit"]').click();
    await expect(page).not.toHaveURL(/\/participa\/gracias/);
    await expect(contactForm(page).getByRole("alert")).toHaveText(ERROR_ES);
  });

  test("error de red: no redirige y conserva datos", async ({ page }) => {
    await mockParticipaContact(page, async (route) => {
      await route.abort("failed");
    });
    await openParticipa(page);
    await fillContact(page);
    await contactForm(page).locator('button[type="submit"]').click();
    await expect(page).not.toHaveURL(/\/participa\/gracias/);
    await expect(contactForm(page).getByRole("alert")).toHaveText(ERROR_ES);
    await expect(page.locator("#participa-contact-email")).toHaveValue("ada@example.com");
  });

  test("doble clic: un solo envío", async ({ page }) => {
    let hits = 0;
    await mockParticipaContact(page, async (route) => {
      hits += 1;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await openParticipa(page);
    await fillContact(page);
    const button = contactForm(page).locator('button[type="submit"]');
    await button.click();
    await button.click({ force: true }).catch(() => undefined);
    await expect(page).toHaveURL(/\/participa\/gracias\/?$/);
    expect(hits).toBe(1);
  });

  test("Enter envía solo con email válido", async ({ page }) => {
    await mockParticipaContact(page, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await openParticipa(page);
    await fillContact(page);
    await page.locator("#participa-contact-email").press("Enter");
    await expect(page).toHaveURL(/\/participa\/gracias\/?$/);
  });

  test("validación: no llama al servidor sin email", async ({ page }) => {
    let hits = 0;
    await mockParticipaContact(page, async (route) => {
      hits += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await openParticipa(page);
    await page.locator("#participa-contact-nombre").fill("Ada");
    await contactForm(page).locator('button[type="submit"]').click();
    await expect(page).not.toHaveURL(/\/participa\/gracias/);
    expect(hits).toBe(0);
  });
});

test.describe("/participa newsletter", () => {
  test("consentimiento no marcado: no envía", async ({ page }) => {
    let hits = 0;
    await mockNewsletter(page, async (route) => {
      hits += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await openParticipa(page);
    const form = newsletterForm(page);
    await form.locator('input[name="email"]').fill("ada@example.com");
    await form.locator('button[type="submit"]').click();
    expect(hits).toBe(0);
    await expect(form.locator('input[name="email"]')).toHaveValue("ada@example.com");
    await expect(form.locator('input[name="consent"]')).not.toBeChecked();
  });

  test("validación de correo: no envía", async ({ page }) => {
    let hits = 0;
    await mockNewsletter(page, async (route) => {
      hits += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await openParticipa(page);
    const form = newsletterForm(page);
    await form.locator('input[name="email"]').fill("no-es-correo");
    await form.locator('input[name="consent"]').check();
    await form.locator('button[type="submit"]').click();
    expect(hits).toBe(0);
  });

  test("error de red: conserva datos, foco y aria-live", async ({ page }) => {
    await mockNewsletter(page, async (route) => {
      await route.abort("failed");
    });
    await openParticipa(page);
    const form = newsletterForm(page);
    await form.locator('input[name="email"]').fill("ada@example.com");
    await form.locator('input[name="consent"]').check();
    await form.locator('button[type="submit"]').click();
    const alert = form.getByRole("alert");
    await expect(alert).toHaveText(ERROR_ES);
    await expect(alert).toHaveAttribute("aria-live", "assertive");
    await expect(alert).toBeFocused();
    await expect(form.locator('input[name="email"]')).toHaveValue("ada@example.com");
    await expect(form.locator('input[name="consent"]')).toBeChecked();
  });
});

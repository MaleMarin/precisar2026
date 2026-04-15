import { defineConfig, devices } from "@playwright/test";

const skipWebServer = Boolean(process.env.PLAYWRIGHT_SKIP_WEBSERVER);

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://127.0.0.1:3000",
    ...devices["Desktop Chrome"],
    trace: "on-first-retry",
  },
  ...(skipWebServer
    ? {}
    : {
        webServer: {
          command: "npx next dev -H 127.0.0.1 -p 3000",
          url: "http://127.0.0.1:3000",
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
        },
      }),
});

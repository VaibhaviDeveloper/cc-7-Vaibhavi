import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: "http://localhost:4173",
    headless: true,
  },

  webServer: {
    command: "npm run build && npm run preview -- --host 0.0.0.0 --port 4173",
    url: "http://localhost:4173",
    timeout: 180000,
    reuseExistingServer: false,
  },
});

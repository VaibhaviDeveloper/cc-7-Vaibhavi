import { test, expect } from "@playwright/test";

const APP_URL = "http://localhost:4173";

test.describe("Post Browser App", () => {
  test("initial load shows first post", async ({ page }) => {
    await page.goto(APP_URL);

    const title = page.locator("#post-title");

    await expect(title).toBeVisible();
    await expect(title).not.toHaveText("");
    await expect(page.locator("#post-meta")).toHaveText("Post #1 of 100");
  });

  test("next button loads next post", async ({ page }) => {
    await page.goto(APP_URL);

    const firstPost = await page.locator("#post-title").textContent();

    await page.click("#next-btn");

    await expect(page.locator("#post-meta")).toHaveText("Post #2 of 100");

    const secondPost = await page.locator("#post-title").textContent();

    expect(secondPost).not.toBe(firstPost);
  });

  test("prev button returns to previous post", async ({ page }) => {
    await page.goto(APP_URL);
    const title = page.locator("#post-title");
    await expect(title).not.toHaveText("");
    const firstPost = await title.textContent();
    await page.click("#next-btn");
    await expect(title).not.toHaveText(firstPost!);
    await page.click("#prev-btn");
    await expect(title).toHaveText(firstPost!);
  });

  test("next button is disabled on last post", async ({ page }) => {
    await page.goto(`${APP_URL}?id=100`);
    await expect(page.locator("#post-meta")).toHaveText("Post #100 of 100");
    await expect(page.locator("#next-btn")).toBeDisabled();
  });

  test("prev button is disabled on first post", async ({ page }) => {
    await page.goto(APP_URL);

    await expect(page.locator("#prev-btn")).toBeDisabled();
  });

  test("refresh button reloads first post", async ({ page }) => {
    await page.goto(APP_URL);

    await page.click("#next-btn");
    await page.click("#refresh-btn");

    await expect(page.locator("#post-meta")).toHaveText("Post #1 of 100");
  });

  test("comments toggle shows and hides comments", async ({ page }) => {
    await page.goto(APP_URL);

    await page.click("#comments-btn");

    await expect(page.locator("#comments-section")).not.toBeEmpty();

    await page.click("#comments-btn");

    await expect(page.locator("#comments-section")).toBeEmpty();
  });

  test("shows error when post fetch fails", async ({ page }) => {
    await page.route("**/posts/**", (route) =>
      route.fulfill({
        status: 500,
        body: "Server Error",
      }),
    );

    await page.goto(APP_URL);

    await expect(page.locator("#post-title")).toHaveText("Error");
    await expect(page.locator("#post-body")).toHaveText(
      "Could not load the post.",
    );
  });
});

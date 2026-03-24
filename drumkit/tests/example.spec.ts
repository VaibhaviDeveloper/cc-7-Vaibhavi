import { test, expect } from '@playwright/test';

test.describe('A drummer using the app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.click('body'); // Focus the page
  });

  test('can record a performance with a pause and play it back', async ({ page }) => {
    const recordBtn = page.locator('#record');
    const pauseBtn = page.locator('#pause');
    const resumeBtn = page.locator('#resume');
    const playBtn = page.locator('#play');
    await recordBtn.click();
    await expect(recordBtn).toHaveText(/stop/i);
    await page.keyboard.press('a');
    await pauseBtn.click();
    await expect(resumeBtn).toBeVisible();
    await page.waitForTimeout(200);
    await resumeBtn.click();
    await page.keyboard.press('s');
    await recordBtn.click();
    await expect(recordBtn).toHaveText(/record/i);
    await expect(async () => {
      const state = await page.evaluate(() => (window as any).state);
      expect(state.recording).not.toBeNull();
      expect(state.recording.beats).toHaveLength(3); // A, PAUSE, S
    }).toPass({ timeout: 3000 });
    await playBtn.click();
    await expect(async () => {
      const progress = await page.locator('#seek-bar').inputValue();
      expect(Number(progress)).toBeGreaterThan(0);
    }).toPass();
    const keyS = page.locator('.key[data-key="83"]');
    await expect(async () => {
      await expect(keyS).toHaveClass(/playing/);
    }).toPass({ intervals: [50] });
  });

  test('sees keys light up instantly when typing', async ({ page }) => {
    const kickKey = page.locator('.key[data-key="68"]'); // 'D'
    await page.keyboard.press('d');
    await expect(kickKey).toHaveClass(/playing/);
    await expect(kickKey).not.toHaveClass(/playing/);
  });

  test('can clear the session to start fresh', async ({ page }) => {
    await page.locator('#record').click();
    await page.keyboard.press('a');
    await page.locator('#record').click();

    await page.locator('#clear').click();

    await expect(page.locator('#play')).toBeDisabled();

    const state = await page.evaluate(() => (window as any).state);
    expect(state.recording).toBeNull();
  });
});

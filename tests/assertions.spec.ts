import { test, expect } from '@playwright/test';


test("Login page assertions", async ({ page }) => {
    // Navigate to the page
    await page.goto("https://the-internet.herokuapp.com/login");

    // 1. Auto-retrying assertion (default behavior, will retry until timeout)
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();

    // 2. Non-auto-retrying assertion (will not retry, will fail immediately if not met)
    const headingText = await page.locator('h2').textContent();
    expect(headingText).toBe('Login Page');

    // 3. Negating matchers
    await expect(page.locator('#flash')).not.toBeVisible();

    // 4 Soft assertion
    await expect.soft(page).toHaveURL(/login/);

    // 5. Last assertion
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
})


test("Multiple soft assertions with final hard assertion", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");

    // Multiple soft assertions
    await expect.soft(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    await expect.soft(page).toHaveURL(/logins/);
    await expect.soft(page.locator('#flash')).not.toBeVisible();

    // Final hard assertion
    const errors = test.info().errors;
    expect(errors.length, `There where ${errors.length} soft assertion errors`).toBe(0);
});

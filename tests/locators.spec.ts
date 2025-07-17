import { test, expect } from '@playwright/test';

test('Examples of playwright locators', async ({ page }) => {


    // Navigate to the page
    await page.goto("https://the-internet.herokuapp.com/login");

    // Examples Of Built-in Locators

    // 1. Get by Role
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();

    // 2. Get by Text
    const loginHeaderText = page.getByText('Login Page');
    await expect(loginHeaderText).toBeVisible();

    // 3. Get by Label
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');


    // CSS Selectors Examples

    // 1. Get by id CSS Selector
    await page.locator('#username').fill('selected_by_css');

    // 2. Get by tag attribute and attribute value
    await page.locator('input[name="password"]').fill('selected_by_css');

    // 3. Get by class name
    await page.locator('.radius').click();


    // XPath Selectors Examples

    // 1. Get by XPath ID
    await page.locator('//input[@id="username"]').fill('selected_by_xpath');

    // 2. Get by XPath with text match using contains
    await page.locator('xpath=//button[contains(., " Login")]').click();

    // 3. Store element by text for failed login and assert it
    const errorMessage = page.locator('//div[@id="flash"]');
    await expect(errorMessage).toContainText('Your username is invalid!');
});



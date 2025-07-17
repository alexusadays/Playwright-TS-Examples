import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe.only("Intercept Requests with Playwright", () => {

    // 1. Mock a successful API response to GET a user with a local JSON file
    test('GET user - mock with local file', async ({ page }) => {
        const mockData = JSON.parse(fs.readFileSync('test-data/user_two_mocked.json', 'utf-8'));
        await page.route('**/api/users/2', async route => {
            // Mock response with local JSON file
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                // convert back to a string suitable for the HTTP response
                body: JSON.stringify(mockData)
            });
        });

        await page.goto('https://reqres.in/');
        await page.getByRole('link', { name: 'Single user', exact: true }).click();
    });


    // 2. Simulate a 404 error user is not found
    test('GET user - simulate 404 error', async ({ page }) => {

        // Intercept the request and respond with a 404 error
        await page.route('**/api/users/2', async route => {
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'User not found' })
            });
        });

        await page.goto('https://reqres.in/');
        await page.getByRole('link', { name: 'Single user', exact: true }).click();
    })

    // 3. Block image requtests to speed up page load, styles, and fonts
    test('Block all images, styles, and fonts', async ({ page }) => {
        // Intercept requests and block images, styles, and fonts
        await page.route('**/*', (route) => {
            const resourceType = route.request().resourceType();

            if (['image', 'stylesheet', 'font'].includes(resourceType)) {
                console.log("Blocking resource:", route.request().url());
                route.abort();
            } else {
                route.continue();
            }
        });
        await page.goto('https://reqres.in/');
    })

   
})
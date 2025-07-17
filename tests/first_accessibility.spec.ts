import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('General accessibility checks', async ({ page }) => {
    // Navigate to the page
    await page.goto("https://the-internet.herokuapp.com/login");

    // Run accessibility checks with default axe rules
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Log the results
    console.log('Accessibility Scan Results:', accessibilityScanResults.violations);

    // Assert that there are no violations
    expect(accessibilityScanResults.violations.length, 'Accessibility violations found').toBe(0);
})

test('Custom tags verification', async ({ page }) => {
    // Navigate to the page
    await page.goto("https://the-internet.herokuapp.com/login");

    // Run accessibility checks with default axe rules
    const axeBuilder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .withRules([
        'color-contrast',
        'image-alt',
        'link-name',
        'document-title'
    ])
    
    const accessibilityScanResults = await axeBuilder.analyze();

    // Log the results

    console.log('Accessibility Scan Results:', accessibilityScanResults.violations);

    // Assert that there are no violations
    expect(accessibilityScanResults.violations.length, 'Accessibility violations found').toBe(0);
})
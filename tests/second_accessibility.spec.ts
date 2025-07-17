import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import * as fs from 'fs';

test('Custom tags verification', async ({ page }) => {
    // Navigate to the page
    await page.goto("https://the-internet.herokuapp.com/login");

    await test.step('Run accessibility checks with custom rules', async () => {
        
    // Run accessibility checks with default axe rules
    const axeBuilder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

    // Store the results
    const accessibilityScanResults = await axeBuilder.analyze();

    // Log the results

    console.log('Accessibility Scan Results:', accessibilityScanResults.violations);

    // Store report
    const reportLines: string[] = [];

    // Log the results
    if (accessibilityScanResults.violations.length > 0) {
        reportLines.push('Accessibility Violations Found:');
        for (const violation of accessibilityScanResults.violations) {
            reportLines.push(`Violation: ${violation.id}`);
            reportLines.push(`Description: ${violation.description}`);
            reportLines.push(`Impact: ${violation.impact}`);
            for (const node of violation.nodes) {
                reportLines.push(`Node HTML: ${node.html}`);
                reportLines.push(`Failure Summary: ${node.failureSummary}`);
                reportLines.push(`Node Selector: ${node.target.join(', ')}`);
            }
        }
    } else {
        reportLines.push('No accessibility violations found.');
    }

    // Get current timestamp in format YYYY-MM-DD_HH-MM
    const timestamp = new Date().toISOString()
        .slice(0, 19)
        .replace('T', '_')
        .replace(/:/g, '-');

    const reportFilePath = `accessibility-reports/accessibility-report_${timestamp}.txt`;
    await fs.promises.writeFile(reportFilePath, reportLines.join('\n'));

    // Assert that there are no violations
    expect(accessibilityScanResults.violations.length, 'Accessibility violations found').toBe(0);

    })

})
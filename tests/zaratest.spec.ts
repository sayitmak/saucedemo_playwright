import { test, expect } from '@playwright/test';

test('zara home page', async ({page}) => {
    await page.goto('https://www.zara.com');
    await expect(page).toHaveTitle(/ZARA Official Website/);

        const privacyPopUpBox = page.getByRole('dialog', { name: 'Privacy' });          
    if (await privacyPopUpBox.isVisible) {
        page.getByRole('button', { name: 'Close' }).click;
    } else {
        console.log ("Privacy Pop Up Box did NOT show!!");
    }

});

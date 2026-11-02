import {expect, Page } from '@playwright/test';

export async function smplogin(page: Page) {
    await page.goto('https://www.saucedemo.com');

    await expect(page).toHaveTitle(/Swag Labs/);

    const username = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    const loginbttn = page.locator('[data-test="login-button"]');

    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await loginbttn.click();
}

export async function advlogin(page: Page, badUser: string, badPass: string, 
    expectedErrMsg: string) {
    await page.goto('https://www.saucedemo.com');

    await expect(page).toHaveTitle(/Swag Labs/);

    const username = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    const loginbttn = page.locator('[data-test="login-button"]');
    const errorBox = page.locator('[data-test="error"]');
    //const expectedErrMsg = 'Epic sadface: Username and password do not match any user in this service'

    await username.fill(badUser);
    await password.fill(badPass);
    await loginbttn.click();

    if (await errorBox.isVisible()) {
        const actualErr = (await errorBox.textContent())?.trim();
        if (actualErr === expectedErrMsg) {
            console.log('Expected error shown for "${badUser}" / "${badPass}". trying with valid log in.');
            await username.fill('standard_user');
            await password.fill('secret_sauce');
            await loginbttn.click();
        } else {
            console.log('wrong error is diplyed.', actualErr);
        }
    } else {
        console.log('no error after login clicked!')
    }
}
export async function confirmationPg (page: Page) {
    await page.locator('[data-test="firstName"]').fill('fname1');
    await page.locator('[data-test="lastName"]').fill('lname1');
    await page.locator('[data-test="postalCode"]').fill('10001');

    await page.locator('[data-test="continue"]').click();
}

export async function totalAmount(page: Page): Promise<number> {
    const totalLabel = page.locator('[data-test="total-label"]');
    await expect(totalLabel).toBeVisible();

    const fullText = (await totalLabel.textContent()) ?? '';
    const amount =Number(fullText.replace(/[^0-9.]/g, ''));

    console.log ('Total Dollar amount: $', amount);
    return amount;
}
import {test, expect, Page } from '@playwright/test';

import {smplogin, advlogin, confirmationPg, totalAmount} from './functions'; 

test ('check home page', async ({ page }) => {
    await advlogin(page, 'user1', 'pass1', 'Epic sadface: Username and password do not match any user in this service');
});


    const expctErrMsg='Epic sadface: Username and password do not match any user in this service';

    const badLogins = [
        {user: 'user1', pass: 'pass1', msg: expctErrMsg},
        {user: 'user2', pass: 'pass2', msg: expctErrMsg},
        {user: 'user3', pass: 'pass3', msg: expctErrMsg},
        {user: 'user4', pass: 'pass4', msg: expctErrMsg},
        {user: 'user5', pass: 'pass5', msg: expctErrMsg},
        {user: 'user6', pass: 'pass6', msg: expctErrMsg},
        {user: 'user7', pass: 'pass7', msg: expctErrMsg},
        {user: 'user8', pass: 'pass8', msg: expctErrMsg},
        {user: '', pass: 'pass9', msg: 'Epic sadface: Username is required'},
        {user: 'user10', pass: '', msg: 'Epic sadface: Passwrod is required'},
        
    ];

test('bad logins - all invalid combinations', async ({ page }) => {
        for (const row of badLogins) {    
            await advlogin(page, row.user, row.pass, row.msg);
            //await expect(page).toHaveURL(/inventory/);   // valid retry should succeed
        }
 });


test ('checkout lesss than 50 dollar', async ({ page }) => {
    await smplogin(page);


     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
     await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
     await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

     const shopCart = page.locator('[data-test="shopping-cart-link"]');
     const item = (await shopCart.textContent())?.trim()?? '0';
     const itemcount = Number(item);

     console.log('currently shopping cart has ', itemcount);

     if (itemcount >= 3) {
        await shopCart.click();
     } else {
        console.log ('there are less than 3 items so no clicking on Cart link1');
     }
     await page.locator('[data-test="checkout"]').click();

     await confirmationPg(page);

     const total = await totalAmount(page);
     if (total<100) {
        console.log ('items are less than $100 so moving ahead with check out.')
        await page.locator('[data-test="finish"]').click();
     } else {
        console.log('items are over $100 so canceling transaction.')
        await page.locator('[data-test="cancel"]').click();
     }
});


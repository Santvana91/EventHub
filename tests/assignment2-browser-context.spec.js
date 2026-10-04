const { test , expect } = require('@playwright/test');

test('EventHub Login with Page Fixture' , async ({page}) => 
{
    await page.goto('/login');

    await expect(page).toHaveTitle(/EventHub/);
    await expect(page.getByPlaceholder('you@email.com')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Sign In'})).toBeVisible();



});

test('EventHub Browser Context ' ,async ({page, browser}) =>
{

    await page.goto('/login');

    const email = page.getByPlaceholder('you@email.com');

    await email.fill('beginner@sample.com');
    await expect(email).toHaveValue('beginner@sample.com');

    const context = await browser.newContext();

    const newPage = await context.newPage();

    await newPage.goto("https://eventhub.rahulshettyacademy.com/login")

    await expect(newPage.getByRole('heading' , {name: 'Sign in to EventHub'})).toBeVisible();

    await expect(newPage.getByPlaceholder('you@email.com')).toHaveValue('')
    
    await context.close();
    



});
const {test, expect} =   require('@playwright/test');

test('EventHub Login Test', async ({page}) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login")

    await expect(page.getByRole('heading' , {name: 'Sign In to EventHub'})).toBeVisible();
    
    await expect(page.getByPlaceholder('you@email.com')).toBeVisible();

    await expect(page.getByRole('button' , {name: 'Sign In'})).toBeVisible();

});


//test.only('EventHub Smoke Test' , async ({page}) =>
test('EventHub Smoke Test' , async ({page}) =>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await expect(page.getByLabel('Password')).toBeVisible();

    await expect(page).toHaveURL( /\/login/);
    //Url contains login so used regular expression

    await expect(page.getByRole('heading', {name: 'Sign in to EventHub '})).toBeVisible();


});
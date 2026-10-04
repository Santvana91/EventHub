const { test ,expect } = require('@playwright/test');

test('Events List Locators and Text Asserations' , async ({page}) =>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    await page.getByPlaceholder('you@email.com').fill('santvanaece1991@gmail.com');
    await page.getByLabel("Password").fill("Sant@160291");
    await page.getByRole('button', {name: 'Sign In'}).click();

    await page.getByText('Browse Events' , { exact: true}).click();
    await expect(page.getByRole('heading', {name:'Upcoming Events'})).toBeVisible();
    await page.getByPlaceholder('Search events, venues…').fill("World");
    
    await page.locator('select').nth(0).selectOption('Conference');
    await page.locator('select').nth(1).selectOption('Hyderabad');

    const worldTechCard = page.locator('[data-testid="event-card"]').filter({hasText: 'World Tech Summit'});
    await expect(worldTechCard).toHaveCount(1);

    const eventTitle = await worldTechCard.locator('h3').textContent();
    //console.log(eventTitle);

    const eventPrice = await worldTechCard.locator('p.text-lg.font-bold.text-indigo-700').textContent();

    const eventSeats = await worldTechCard.getByText(/seats left!/).innerText();
    console.log('EVENT SEATS', eventSeats);

    await expect(eventTitle).toBe('World Tech Summit');
    await expect(eventPrice).toContain('$');

    const availableSeats = Number(eventSeats.replace(/\D/g, ''));
    expect(availableSeats).toBeGreaterThan(0);

    const bookNowLink = await worldTechCard.getByRole('link' , {name: 'Book Now'});
    await expect(bookNowLink).toHaveAttribute('href', /\/events\//);
    await bookNowLink.click();

    await expect(page.getByRole('heading', {name: eventTitle })).toBeVisible();
    await expect(page.getByText(eventPrice, {exact:true})).toBeVisible();

    await page.goto("https://eventhub.rahulshettyacademy.com/events");

    await page.locator('select').nth(0).selectOption({ index: 0});
    await page.locator('select').nth(1).selectOption({ index: 0});
 //await page.pause();
    
    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(eventCards).toHaveCount(3);


    const firstTitle = await eventCards.nth(0).locator('h3').textContent();
    const secondTitle = await eventCards.nth(1).locator('h3').textContent();
    const lastTitle = await eventCards.last().locator('h3').textContent();

    await expect(firstTitle?.trim()).toBeTruthy();
    await expect(secondTitle?.trim()).toBeTruthy();
    await expect(lastTitle?.trim()).toBeTruthy();
    await expect(firstTitle?.trim() === lastTitle?.trim()).toBeFalsy();


}); 

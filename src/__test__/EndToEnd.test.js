import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

    let browser;
    let page;
    beforeAll(async () => {
	browser = await puppeteer.launch();
	page = await browser.newPage();
	await page.goto('http://localhost:3000/');
	// wait for the Event component to be loaded
	await page.waitForSelector('.event');
    });

    afterAll(() => {
	browser.close();
    });
    
    test('An event element is collapsed by default', async () => {
	// note that unit, int, and acceptance tests used RTL to render & query components
	// but for end-to-end we use Puppeteer’s own API to query elements on the page.
	const eventDetails = await page.$('.event .details');
	expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
	
	await page.click('.event .details-btn');
	const eventDetails = await page.$('.event .details');
	//note toBeDefined() matcher, as in, details should exist by this time.
	expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
	await page.click('.event .details-btn');
	const eventDetails = await page.$('.event .details');
	expect(eventDetails).toBeNull();
    });
    
});

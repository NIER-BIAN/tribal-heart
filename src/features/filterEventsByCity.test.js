import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getEvents } from '../api';
import App from '../App';

// load gherkin file: note that loadFeature() expects path from root!!
const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {

    //====================================================================================
    
    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
	
	//--------------------------------------------------------------------------------
	
	given('user hasn’t searched for any city', () => {
    	});

	//--------------------------------------------------------------------------------

	// needed by not just when():
	let AppComponent;
    	when('the user opens the app', () => {
	    AppComponent = render(<App />);
    	});

	//--------------------------------------------------------------------------------

	//**NOTE**: TEST CALLBACK ASYNCHRONOUS:
	// await keyword only valid inside functions declared with the async keyword
    	then('the user should see the list of all upcoming events.', async () => {
	    
	    const AppDOM = AppComponent.container.firstChild;
	    
	    await waitFor(() => {
		const EventListDOM = AppDOM.querySelector('#event-list');
		const EventListItems = within(EventListDOM).queryAllByRole('listitem');
		expect(EventListItems.length).toBe(10);
	    });
	});

	//--------------------------------------------------------------------------------

    });
    
    //====================================================================================
    
    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {

	//--------------------------------------------------------------------------------
	
	// needed by not just given():
	let AppComponent;
	given('the main page is open', () => {
	    AppComponent = render(<App />);
    	});

	//--------------------------------------------------------------------------------

	let CitySearchDOM;
    	when('user starts typing in the city textbox', async() => {
	    
	    const user = userEvent.setup();
	    const AppDOM = AppComponent.container.firstChild;
	    CitySearchDOM = AppDOM.querySelector('#city-search');
	    
	    const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
	    
	    await user.type(citySearchInput, "Berlin");
	    
    	});

	//--------------------------------------------------------------------------------
	
    	then('the user should recieve a list of cities (suggestions) that match what they’ve typed', () => {
	    
	    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
	    // Expect only Berlin and "See all cities" in list
	    expect(suggestionListItems).toHaveLength(2);

    	});

	//--------------------------------------------------------------------------------

    });
    
    //====================================================================================
    
    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {

	//--------------------------------------------------------------------------------
	
	// all needed by not just given()
	let AppDOM; 
	let CitySearchDOM;
	let citySearchInput;
	given('user was typing “Berlin” in the city textbox', async () => {
	    
	    const user = userEvent.setup();
	    AppDOM = render(<App />).container.firstChild;
	    CitySearchDOM = AppDOM.querySelector('#city-search');
	    citySearchInput = within(CitySearchDOM).queryByRole('textbox');
	    
	    await user.type(citySearchInput, "Berlin");
    	});

	//--------------------------------------------------------------------------------

	let suggestionListItems;
    	and('the list of suggested cities is showing', () => {
	    suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
	    // Expect only Berlin and "See all cities" in list
	    expect(suggestionListItems).toHaveLength(2);
    	});

	//--------------------------------------------------------------------------------
	
    	when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
	    const user = userEvent.setup();
	    await user.click(suggestionListItems[0]);
    	});

	//--------------------------------------------------------------------------------
	
    	then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
	    expect(citySearchInput.value).toBe('Berlin, Germany');
    	});

	//--------------------------------------------------------------------------------
	
    	and('the user should receive a list of upcoming events in that city', async () => {
	    
	    // set up expected list
	    const allEvents = await getEvents();
	    const eventsOughtToBeRendered = allEvents.filter(
		// citySearchInput.value is Berlin at this point
		event => event.location === citySearchInput.value
	    ).slice(0, 10);
	    
	    const EventListDOM = AppDOM.querySelector('#event-list');
	    const eventsActuallyRendered = within(EventListDOM).queryAllByRole('listitem');

	    // tests if eventsActuallyRendered is of right length
	    expect(eventsActuallyRendered).toHaveLength(eventsOughtToBeRendered.length);
	    // tests if all eventItemsActuallyRendered is of right location
	    eventsActuallyRendered.forEach(event => {
		expect(event.textContent).toContain("Berlin, Germany");
	    });
	    
    	});

	//--------------------------------------------------------------------------------
	
    });

});

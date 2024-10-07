/* note:
   1. @testing-library/react & @testing-library/jest-dom are default installed
   when usingCRA to create a project
   2. src/setupTests.js contains line 'import '@testing-library/jest-dom'
   and is run whenever tests are run
*/

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {

    let AppDOM;
    beforeEach(() => {
	AppDOM = render(<App />).container.firstChild;
    })

    /* Note: beforeEach() is used instead of beforeAll() as React Testing Library
       automatically unmounts the mock component after each test */

    test('renders CitySearch', () => {
	expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    test('renders number of events', () => {
	expect(AppDOM.querySelector('#no-of-events')).toBeInTheDocument();
    });

});

describe('<App /> integration', () => {
    
    test('<App/> correctly renders <EventList/> with every <Event/> taking place in city selected in <CitySearch/>', async () => {

	// step 0 of 3: setup
	const user = userEvent.setup();
	
	const allEvents = await getEvents();
	const eventItemsOughtToBeRendered = allEvents.filter(
	    event => event.location === 'Berlin, Germany'
	).slice(0, 10);
	
	const AppDOM = render(<App />).container.firstChild;
	const CitySearchDOM = AppDOM.querySelector('#city-search');
	const CitySearchInputBox = within(CitySearchDOM).queryByRole('textbox');
	
	// step 1 of 3: interaction simulated
	// user types in CitySearchInputBox
	await user.type(CitySearchInputBox, "Berlin");
	// Berlin shows up as suggestion
	const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
	// user clicks on it
	await user.click(berlinSuggestionItem);
	
	// step 2 of 3: EventList initialised after user selecting Berlin simulated
	// (as this is when the the Berlin-specific event list actually appears)
	const EventListDOM = AppDOM.querySelector('#event-list');
	const eventItemsActuallyRendered = within(EventListDOM).queryAllByRole('listitem');
	
	// step 3 of 3:
	// tests if eventItemsActuallyRendered is of right length
	expect(eventItemsActuallyRendered.length).toBe(eventItemsOughtToBeRendered.length);
	// tests if all eventItemsActuallyRendered is of right location
	eventItemsActuallyRendered.forEach(event => {
	    expect(event.textContent).toContain("Berlin, Germany");
	});

    });

    test('When user selects 20 in <NumberOfEvents/>, <App/> correctly renders <EventList/> of length 20>', async () => {
	// step 0 of 3: setup
	const user = userEvent.setup();
	
	const AppDOM = render(<App />).container.firstChild;
	const NumberOfEventsDOM = AppDOM.querySelector('#no-of-events');
	const numberOfEventsBox = within(NumberOfEventsDOM).queryByRole('combobox');
	
	// step 1 of 3: interaction simulated --- user clicks numberOfEventsBox and chooses 20
	await userEvent.selectOptions(numberOfEventsBox, "20");

	// step 2 of 3: EventList initialised after user selecting Berlin simulated
	// (as this is when the the  event list of right length actually appears)
	const EventListDOM = AppDOM.querySelector('#event-list');
	const EventListItems = within(EventListDOM).queryAllByRole('listitem');

	// step 3 of 3: checks length
	expect(EventListItems.length).toBe(20);

	    
    });
    
});

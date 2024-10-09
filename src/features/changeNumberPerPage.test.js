const { loadFeature, defineFeature } = require('jest-cucumber');
const { render, within, waitFor } = require('@testing-library/react');
import userEvent from '@testing-library/user-event';

import App from '../App';

const feature = loadFeature('./src/features/changeNumberPerPage.feature');

defineFeature(feature, test => {
    
    test('Change the number of events displayed', ({ given, when, then }) => {

	//--------------------------------------------------------------------------------

	// needed by not just given():
	let AppComponent;
	given('the user is on the events page', () => {
	    AppComponent = render(<App />);
	});

	//--------------------------------------------------------------------------------

	when('the user sets the number of events to display to a specified number', async () => {
	    const user = userEvent.setup();
	    
	    const AppDOM = AppComponent.container.firstChild;
	    
	    const NumberOfEventsDOM = AppDOM.querySelector('#no-of-events');
	    const numberOfEventsBox = within(NumberOfEventsDOM).queryByRole('combobox');

	    await userEvent.selectOptions(numberOfEventsBox, "20");
	});
	
	//--------------------------------------------------------------------------------

	then('exactly that number of events is displayed.', async () => {
	    
	    const AppDOM = AppComponent.container.firstChild;
	    
	    await waitFor(() => {
		const EventListDOM = AppDOM.querySelector('#event-list');
		const EventListItems = within(EventListDOM).queryAllByRole('listitem');
		expect(EventListItems.length).toBe(20);
	    });
	});

	//--------------------------------------------------------------------------------
	
    });
});

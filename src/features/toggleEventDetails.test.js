const { loadFeature, defineFeature } = require('jest-cucumber');
const { render, within, waitFor } = require('@testing-library/react');
import userEvent from '@testing-library/user-event';

import App from '../App';

const feature = loadFeature('./src/features/toggleEventDetails.feature');

defineFeature(feature, test => {

    //====================================================================================
    
    test('Show event details', ({ given, when, then }) => {

	//--------------------------------------------------------------------------------

	// needed by not just given():
	let AppComponent;
	given('the user is viewing the list of events', () => {
	    AppComponent = render(<App />);
	});
	
	//--------------------------------------------------------------------------------

	let EventDOM;
	let eventDetails
	when('the user clicks on an event to view details where details are not shown', async () => {
	    const user = userEvent.setup();
	    
	    const AppDOM = AppComponent.container.firstChild;
	    
	    await waitFor(async () => {
		EventDOM = AppDOM.querySelector('.event');
		const toggleDetailsButton = within(EventDOM).queryByRole('button');
		await user.click(toggleDetailsButton);
		eventDetails = within(EventDOM).queryByRole('event-details');
	    });
	    
	});

	//--------------------------------------------------------------------------------
	
	then("the event\'s details are displayed.", () => {
	    expect(eventDetails).toBeInTheDocument()
	});
	
    });

    //====================================================================================
    
    test('Hide event details', ({ given, when, then }) => {
	//--------------------------------------------------------------------------------

	// needed by not just given():
	let AppComponent;
	given('the user is viewing the list of events', () => {
	    AppComponent = render(<App />);
	});
	
	//--------------------------------------------------------------------------------

	let EventDOM;
	let eventDetails
	when('the user clicks on an event where details are already shown', async () => {
	    
	    const user = userEvent.setup();
	    
	    const AppDOM = AppComponent.container.firstChild;
	    
	    await waitFor(async () => {
		EventDOM = AppDOM.querySelector('.event');
		const toggleDetailsButton = within(EventDOM).queryByRole('button');
		await user.click(toggleDetailsButton);
		await user.click(toggleDetailsButton);
		eventDetails = within(EventDOM).queryByRole('event-details');
	    });
	    
	});

	//--------------------------------------------------------------------------------
	
	then("the event\'s details are hidden.", () => {
	    expect(eventDetails).not.toBeInTheDocument()
	});

	//--------------------------------------------------------------------------------
	
    });
    
});

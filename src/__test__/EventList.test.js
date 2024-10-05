import { render, within, waitFor } from '@testing-library/react';

import EventList from '../components/EventList';
import App from "../App";

import { getEvents } from '../api';

describe('<EventList /> component', () => {

    let EventListComponent;

    // define a handler/reference to a mock EventList component
    beforeEach(() => {
	EventListComponent = render(<EventList />);
    })

    //-----------------------------------------------------------------------------------------------
    
    test('has an element with "list" role', () => {

	// test if there’s an element inside EventList component w/ ARIA role "list"
	expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
	/*
	  note that instead of adding role="list" to <div id="event-list"></div>,
	  we have changed it to <ul id="event-list"></ul>
	  as <ul> is assigned the list role by default without role="llist"
	*/
    });

    //-----------------------------------------------------------------------------------------------
    
    test('renders correct number of events', async () => {

	const eventsData = await getEvents();
	
	// rerender method: update the props of a component already rendered.
	// useful for testing how the component behaves with diff inputs w.o.
	// needing to recreate the component from scratch.
	EventListComponent.rerender(
	    // set events prop manually using mock data
		<EventList allEvents={eventsData}/>);

	// test if EventList renders all 35 events as elements with role listitem
	expect(EventListComponent.getAllByRole("listitem")).toHaveLength(eventsData.length);
	
	/*
	  note that instead of adding role="listitem" anywhere in Event.js
	  we simply have <li></li> as <li> is default assigned the list role
	*/
	
    });
    
});

describe('<EventList /> integration', () => {

    test('renders a list of 10 events when the app is mounted and rendered', async () => {
	
	const AppDOM = render(<App />).container.firstChild;
	const EventListDOM = AppDOM.querySelector('#event-list');

	// waitFor() to query elements that aren’t rendered immediately
	// wait for list of events being fetched / delayed rendering
	await waitFor(() => {
	    // within() allows RTL query functions on the passed DOM object
	    const EventListItems = within(EventListDOM).queryAllByRole('listitem');
	    expect(EventListItems.length).toBe(10);
	});
    });
});

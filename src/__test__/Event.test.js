import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Event from '../components/Event';
import { getEvents } from '../api';

describe('<CitySearch /> component', () => {

    let EventComponent;
    let toggleDetailsButton;
    
    beforeEach(async() => {
	// note it's okay to not declare allEvents beforehand as it's a const scoped to this block
	const allEvents = await getEvents();
	EventComponent = render(<Event event={allEvents[0]} />);
        toggleDetailsButton = EventComponent.getByRole('button');
    });
    
    test('renders event title', () => {
	expect(EventComponent.queryByRole('event-title')).toBeInTheDocument();
    });
    
    
    test('renders event start time', () => {
	expect(EventComponent.queryByRole('event-start-time')).toBeInTheDocument();
    });
    
    test('renders event location', () => {
	expect(EventComponent.queryByRole('event-location')).toBeInTheDocument();
    });
    
    test('renders show details button', () => {
	expect(EventComponent.queryByRole('button')).toBeInTheDocument();
    });

    test('event details not rendered by default', () => {
        expect(EventComponent.queryByRole('event-details')).not.toBeInTheDocument();
    });

    test('event details rendered when show details button clicked', async() => {
	// step 0 of 3: setup
	const user = userEvent.setup();
	// step 1 of 3: interaction simulated --- user clicks on button
	await user.click(toggleDetailsButton);
	// step 2 of 3: eventDetails is initialised after the click occurs
	// (as this is when the the element actually appears)
	const eventDetails = EventComponent.queryByRole('event-details');
	// step 3 of 3: checks if details rendered
	expect(eventDetails).toBeInTheDocument()
    });

    test('event details hidden when hide details button clicked', async() => {
	// step 0 of 3: setup
	const user = userEvent.setup();
	// step 1 of 3: interaction simulated --- user clicks on button twice
	await user.click(toggleDetailsButton);
	await user.click(toggleDetailsButton);
	// step 2 of 3: eventDetails is initialised after the click occurs
	// (as this is when the the element actually disappears)
	const eventDetails = EventComponent.queryByRole('event-details');
	// step 3 of 3: checks if details rendered
	expect(eventDetails).not.toBeInTheDocument()
    });
    
});

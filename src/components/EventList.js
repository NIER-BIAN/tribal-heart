import Event from './Event';

const EventList = ({ allEvents }) => {
    
    return (
	// loops over the list prop, in each iteration, render an <Event />
	// component which will internally render the <li></li> element):
	    <ul id="event-list">
	    {
		// .map() loop is only executed if eventList prop passed
		allEvents
		    ? allEvents.map(
			event => <Event event={event} key={event.id} /> )
		    : null
	    }
	</ul>
    );
}

export default EventList;

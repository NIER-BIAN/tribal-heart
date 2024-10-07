import { useState } from 'react';

const Event = ({ event }) => {

    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    
    return (
	    <li className="event">
		<h2 role="event-title">{event.summary}</h2>
		<p role="event-start-time">Start Time: {event.created}</p>
		<p role="event-location">Location: {event.location}</p>

		{showDetails && (
		    <div role="event-details">
			<h4>About event:</h4>
			<p>{event.description}</p>
			<a href="{event.htmlLink}" target="_blank">
			    See details on Google Calendar
		        </a>
		    </div>
		)}
		
	        <br/>
		<button className="details-btn" onClick={toggleDetails} role="button">
		    {showDetails ? 'Hide Details' : 'Show Details'}
		</button>
		
	    </li>
    );
}

export default Event;

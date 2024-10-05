//=============================================================================================
// IMPORTS

import { useEffect, useState } from 'react';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

import { getEvents } from './api';

import './App.css';

const App = () => {

    //========================================================================================
    // DATA MANAGEMENT (useState hooks)
    
    const [allEvents, setAllEvents] = useState([]);
    // in NumberOfEvents.js for now
    // const [numberPerPage, setNumberPerPage] = useState(10);

    const numberPerPage = 10;
    
    const fetchData = async () => {
	const eventsData = await getEvents();
	setAllEvents(eventsData.slice(0, numberPerPage));
    }

    //=========================================================================================
    // SIDE EFFECTS (useEffect hooks)
    
    useEffect(() => {
	fetchData();
    }, []);
    
    //=========================================================================================
    // UI RENDERING
    
    return (
	<div className="App">
	    <CitySearch/>
	    <NumberOfEvents/>
	    <EventList allEvents={allEvents} />
	</div>
    );
}

export default App;

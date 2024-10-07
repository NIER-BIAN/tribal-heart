//=============================================================================================
// IMPORTS

import { useEffect, useState } from 'react';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

import { getEvents, extractLocations } from './api';

import './App.css';

import { cardio } from 'ldrs'

cardio.register()

const App = () => {

    //========================================================================================
    // DATA MANAGEMENT (useState hooks)
    
    const [allEvents, setAllEvents] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [numberPerPage, setNumberPerPage] = useState(10);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchData = async () => {

	// start loader
	setIsLoading(true);
	
	const eventsData = await getEvents();
	setAllLocations(extractLocations(eventsData));
	
	// if currentCity === "See all cities", filteredEvents = allEvents, otherwise filter for city
	const filteredEvents = currentCity === "See all cities"
	      ? eventsData
	      : eventsData.filter(event => event.location === currentCity)

	// For now, replace eventsData with filteredEvents
	// setAllEvents(eventsData.slice(0, numberPerPage));
	setAllEvents(filteredEvents.slice(0, numberPerPage))

	// stop loader
	setIsLoading(false);
    }

    //=========================================================================================
    // SIDE EFFECTS (useEffect hooks)
    
    useEffect(

	// arg 1: code you want to run as a side effect
	() => {
	    fetchData();
	},
	
	// arg 2: array of dependencies
	[currentCity, numberPerPage]);
    
    //=========================================================================================
    // UI RENDERING
    
    return (
	    
	    <div className="App">

	      <CitySearch
	         allLocations={allLocations}
	         setCurrentCity={setCurrentCity}
	      />

	      <div className="pagination">
	        <p>Items per page:</p>
	        <NumberOfEvents
	          numberPerPage={numberPerPage}
	          onSelectionClick={(newNumberPerPage) => setNumberPerPage(newNumberPerPage)}
	      />
	      </div>

	      {isLoading && (
	        <div className="loading-message">
	          <h2>Loading...</h2>
	          <l-cardio
	            size="120"
	            stroke="4"
	            speed="0.9" 
	            color="white" 
	          ></l-cardio>
	        </div>
	      )}

	      {!isLoading && (
	        <EventList
	          allEvents={allEvents}
	        />
	      )}
	
	</div>
    );
}

export default App;

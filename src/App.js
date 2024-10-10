//=============================================================================================
// IMPORTS

import { useEffect, useState } from 'react';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import PageNav from './components/PageNav';

import { getEvents, extractLocations } from './api';

import './App.css';

const App = () => {

    //========================================================================================
    // DATA MANAGEMENT (useState hooks)
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [allEvents, setAllEvents] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    
    const [locationFilteredEvents, setLocationFilteredEvents] = useState([]);
    
    const [numberPerPage, setNumberPerPage] = useState(10);
    const [curPageNumber, setCurPageNumber] = useState(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    const [totalNumberOfEvents, setTotalNumberOfEvents] = useState(0);
    
    const fetchData = async () => {

	// start loader
	setIsLoading(true);

	setCurPageNumber(1);
	setTotalNumberOfEvents(1);
	
	const eventsData = await getEvents();
	setAllLocations(extractLocations(eventsData));
	
	// if currentCity === "See all cities", filteredEvents = allEvents, otherwise filter for city
	const locationFilteredEvents = currentCity === "See all cities"
	      ? eventsData
	      : eventsData.filter(event => event.location === currentCity)

	setTotalNumberOfPages(Math.ceil(locationFilteredEvents.length / numberPerPage));
	
	// locationFilteredEvents state for pagination side-effect (where slice array to pages takes place)
	setLocationFilteredEvents(locationFilteredEvents);
	// totalNumberOfEvents state for pagination display 
	setTotalNumberOfEvents(locationFilteredEvents.length);
	
	// stop loader
	setIsLoading(false);
    }
    
    const goToNextPage = () => {
        if (curPageNumber < totalNumberOfPages) {
            setCurPageNumber(curPageNumber + 1);
        }
    };

    const goToPrevPage = () => {
        if (curPageNumber > 1) {
            setCurPageNumber(curPageNumber - 1);
        }
    };
    
    //=========================================================================================
    // SIDE EFFECTS (useEffect hooks)
    
    useEffect(

	// arg 1: code you want to run as a side effect
	() => {
	    fetchData();
	},
	
	// arg 2: array of dependencies
	[currentCity, numberPerPage]
    );

    useEffect(
	
	// arg 1: code you want to run as a side effect
	() => {
	    const startIndex = (curPageNumber - 1) * numberPerPage;
            const endIndex = startIndex + numberPerPage;
            setAllEvents(locationFilteredEvents.slice(startIndex, endIndex));
	},
	
	// arg 2: array of dependencies
	[curPageNumber, locationFilteredEvents, numberPerPage]
    );
    
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
	        <PageNav
	          curPageNumber={curPageNumber}
	          totalNumberOfPages={totalNumberOfPages}
	          totalNumberOfEvents={totalNumberOfEvents}
	          numberPerPage={numberPerPage}
	          goToPrevPage={goToPrevPage}
	          goToNextPage={goToNextPage}
	        />
	      </div>

	      {isLoading && (
	        <div className="loading-message" role="loading-message">
	          <h2>Loading... Please wait!</h2>
		  <div class="lds-dual-ring"></div>
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

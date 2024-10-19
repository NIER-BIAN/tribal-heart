//=============================================================================================
// IMPORTS

import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlertText }) => {

    //========================================================================================
    // DATA MANAGEMENT (useState hooks)
    
    // local state that toggles suggestion list displayed (default hidden)
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestionsList, setSuggestionsList] = useState([]);
    
    //=========================================================================================
    // SIDE EFFECTS (useEffect hooks)

    // We need to do this w. a useEffect hook, as allLocations will be empty array until data fetched
    useEffect(
	
	// arg 1: code you want to run as a side effect
	() => {
	    setSuggestionsList(allLocations);
	},

	// arg 2: array of dependencies
	// note conversion to string to prevent unnecessary re-renders
	// as React's comparison mechanism for arrays/obj is reference comparison, not value comparison
	[`${allLocations}`]);

    // hide drop-down when the user clicks outside of the current component
    useEffect(
	
	// arg 1: code you want to run as a side effect
	() => {
            const clickOutsideHandler = (event) => {
		const noEventsDiv = document.getElementById('city-search');
		if (!noEventsDiv.contains(event.target)) {
		    // hide suggestions list after user clicks outside the city-search component
                    setShowSuggestions(false);
		}
            };
	    
            document.addEventListener('mousedown', clickOutsideHandler);

	    // cleanup function: removes event listener **when the component unmounts**
            return () => {
		document.removeEventListener('mousedown', clickOutsideHandler);
            };
	},
	
	// arg 2: array of dependencies
	[]
	
    );
    
    //=========================================================================================
    // EVENT HANDLING
    
    // NOTE: "event" here as in function is callback of onChange
    const queryUpdateHandler = (event) => {
	const curSearchTerm = event.target.value;
	const filteredLocations = allLocations
	      ? allLocations.filter((candidateLocation) => {
		  /* allLocations is filtered down to the suggestions array—the array
		     to only contain candidateLocation that contain curSearchTerm as a substring
		     if not found as a substring indexOf() will return -1 */
		  return candidateLocation.toUpperCase().indexOf(curSearchTerm.toUpperCase()) > -1;
	      })
	      : [];
	
	setQuery(curSearchTerm);
	setSuggestionsList(filteredLocations);

	let infoAlert;
	if (filteredLocations.length === 0) {
	    infoAlert = "We can't find the city you are looking for. Please try another city"
	} else {
	    infoAlert = ""
	}
	setInfoAlertText(infoAlert);
	
    };
    
    // NOTE: "event" here as in function is callback of onClick
    const suggestionListItemClickedHandler = (event) => {
	const chosenCity = event.target.textContent;
	setCurrentCity(chosenCity);
	setQuery(chosenCity);      // render chosen city in input box
	setShowSuggestions(false); // hide list after clicked
    };

    const seeAllCitiesClickedHandler = (event) => {
	setCurrentCity("See all cities");
	setQuery("");
	setShowSuggestions(false);
	setSuggestionsList(allLocations);
	setInfoAlertText("");
    };

    //=========================================================================================
    // UI RENDERING
    
    return (
	  <div id="city-search">
	    <input
	      id="city-search-input-box"
	      type="text"
	      placeholder="Search for a particular city"
              value={query}
	      // show <ul> element (suggestion list) when input field gains focus
	      onFocus={() => setShowSuggestions(true)}
	      onChange={queryUpdateHandler}
	    />
	    {showSuggestions
	     ? <ul className="suggestions">
	         {suggestionsList.map((suggestion) => {
		   return <li
		            onClick={suggestionListItemClickedHandler}
		            key={suggestion}
		          >{suggestion}
		          </li>
                 })}
                 <li onClick={seeAllCitiesClickedHandler} key='See all cities'>
                   <b>See all cities</b>
                 </li>
	       </ul>
	     : null}
	  </div>
    )
}

export default CitySearch;

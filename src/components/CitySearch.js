import { useState } from "react";

const CitySearch = ({ allLocations }) => {

    // local state that toggles suggestion list displayed (default hidden)
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestionsList, setSuggestionsList] = useState([]);
    
    // NOTE: "event" here as in function is callback of onChange
    const queryUpdateHandler = (event) => {
	const curSearchTerm = event.target.value;
	const filteredLocations = allLocations
	      ? allLocations.filter((candidateLocation) => {
		  // allLocations is filtered down to the suggestions array—the array
		  // to only contain candidateLocation that contain curSearchTerm as a substring
		  // if not found as a substring indexOf() will return -1
		  return candidateLocation.toUpperCase().indexOf(curSearchTerm.toUpperCase()) > -1;
	      })
	      : [];
	
	setQuery(curSearchTerm);
	setSuggestionsList(filteredLocations);
    };
    
    // NOTE: "event" here as in function is callback of onClick
    const suggestionListItemClickedHandler = (event) => {
	const chosenCity = event.target.textContent;
	setQuery(chosenCity);      // render chosen city in input box
	setShowSuggestions(false); // hide list after clicked
    };
    
    return (
	    <div id="city-search">
	    <input
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
	         // manually add item
                 <li onClick={suggestionListItemClickedHandler} key='See all cities'>
                   <b>See all cities</b>
                 </li>
	       </ul>
	     : null}
	    </div>
    )
}

export default CitySearch;

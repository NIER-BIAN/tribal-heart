import { useState, useEffect } from "react";

const NumberOfEvents = () => {

    // numberPerPage is default 10
    const [numberPerPage, setNumberPerPage] = useState(10);
    const [showDropdown, setShowDropdown] = useState(false);
    const options = [10, 15, 20, 25, 30];

    const numberPerPageChangeHandler = (e) => {
	setNumberPerPage(parseInt(e.target.value, 10)) // 10 here means str to be parsed as base-10 int
	setShowDropdown(!showDropdown); // stop rendering dropdown
    };

    // hide drop-down when the user clicks outside of the current componen
    useEffect(
	
	// arg 1: code you want to run as a side effect
	() => {
            const clickOutsideHandler = (event) => {
		const noEventsDiv = document.getElementById('no-of-events');
		if (!noEventsDiv.contains(event.target)) {
                    setShowDropdown(false);
		}
            };
	    
            document.addEventListener('mousedown', clickOutsideHandler);
            return () => {
		document.removeEventListener('mousedown', clickOutsideHandler);
            };
	},
	
	// arg 2: array of dependencies
	[]
	
    );
	
    return (
            <div id="no-of-events">
	      <input
                type="number"
                value={numberPerPage}
                onChange={numberPerPageChangeHandler}
                onClick={() => setShowDropdown(!showDropdown)}
                role="textbox"
	      />
	      {showDropdown
	       ? <select
	           onChange={(e) => numberPerPageChangeHandler(e)}>
		   {options.map((option) => (
			 <option key={option} value={option}>{option}</option>
		   ))}
	         </select>
	       : null
	      }
            </div>  
    )
}

export default NumberOfEvents;

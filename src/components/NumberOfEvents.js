//========================================================================================
// IMPORTS

import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const NumberOfEvents = ({ numberPerPage, onSelectionClick }) => {

    //========================================================================================
    // DATA MANAGEMENT (useState hooks)
    
    const [showDropdown, setShowDropdown] = useState(false);
    const options = [10, 15, 20, 25, 30];

    const numberPerPageChangeHandler = (e) => {
	onSelectionClick(parseInt(e.target.value, 10));
	// 10 here means str to be parsed as base-10 int
	setShowDropdown(!showDropdown); // stop rendering dropdown
    };
    
    //========================================================================================
    // SIDE EFFECTS (useEffect hooks)
    
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
    
    //=======================================================================================
    // UI RENDERING
    
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

NumberOfEvents.propTypes = {
    numberPerPage: PropTypes.number.isRequired,
    onSelectionClick: PropTypes.func.isRequired,
};

export default NumberOfEvents;

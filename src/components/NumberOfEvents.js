//========================================================================================
// IMPORTS

import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const NumberOfEvents = ({ numberPerPage, onSelectionClick }) => {

    //========================================================================================
    // DATA MANAGEMENT (useState hooks)
    
    // const [showDropdown, setShowDropdown] = useState(false);
    const options = [10, 15, 20, 25, 30];

    const numberPerPageChangeHandler = (e) => {
	onSelectionClick(parseInt(e.target.value, 10));
	// 10 here means str to be parsed as base-10 int
    };
    
    //=======================================================================================
    // UI RENDERING
    
    return (
            <div id="no-of-events">
	      <select
                 value={numberPerPage}
                 onChange={numberPerPageChangeHandler}
                 role="combobox"
              >
	        {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
	      </select>
	    </div>
    )
}

NumberOfEvents.propTypes = {
    numberPerPage: PropTypes.number,
    onSelectionClick: PropTypes.func,
};

export default NumberOfEvents;

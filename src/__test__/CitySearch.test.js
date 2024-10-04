import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CitySearch from '../components/CitySearch';
import { getEvents, extractLocations } from '../api';

describe('<CitySearch /> component', () => {

    let CitySearchComponent;
    beforeEach(() => {
	CitySearchComponent = render(<CitySearch />);
    });
    
    //-----------------------------------------------------------------------------------------------
    
    test('renders search input box', () => {
	// note the change in naming convention. cityTextBox is not a component but
	// a var that references an element's DOM node
	const citySearchInputBox = CitySearchComponent.queryByRole('textbox');
	expect(citySearchInputBox).toBeInTheDocument();
    });
    
    //-----------------------------------------------------------------------------------------------
    
    test('suggestions list is hidden by default', () => {
	const suggestionList = CitySearchComponent.queryByRole('list');
	expect(suggestionList).not.toBeInTheDocument();
    });

    //-----------------------------------------------------------------------------------------------
    
    //**NOTE**: TEST CALLBACK NOW ASYNCHRONOUS
    test('renders a list of suggestions when city textbox gains focus', async () => {
	// tests that involves user interactions should always have obj setup that represents user
	// user-event is RTL's companion lib for representing user interactions in tests
	// this should NOT be outside the test, such as in beforeEach or beforeAll

	// step 0 of 3: setup
	const user = userEvent.setup();
	const citySearchInputBox = CitySearchComponent.queryByRole('textbox');
	
	// step 1 of 3: interaction simulated --- user clicks input field and it "gains focus"
	await user.click(citySearchInputBox);

	// step 2 of 3: suggestionList is initialised after the click occurs
	// (as this is when the the list actually appears)
	const suggestionList = CitySearchComponent.queryByRole('list');
	
	// step 3 of 3: checks if list exists and has the suggestions class.
	expect(suggestionList).toBeInTheDocument();
	expect(suggestionList).toHaveClass('suggestions');
    });

    //-----------------------------------------------------------------------------------------------
    
    //**NOTE**: TEST CALLBACK NOW ASYNCHRONOUS
    test('list of suggestions when a city is searched for has right length & content', async () => {

	// tests that involves user interactions should always have obj setup that represents user
	// user-event is RTL's companion lib for representing user interactions in tests
	// this should NOT be outside the test, such as in beforeEach or beforeAll
	// step 0 of 3: setup
	const user = userEvent.setup();
	const allEvents = await getEvents();
	const allLocations = extractLocations(allEvents);
	// rerender / update <CitySearch> (it expects allLocations as props)
	CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

	// step 1 of 3: interaction simulated --- user types "Berlin" in city textbox
	const citySearchInputBox = CitySearchComponent.queryByRole('textbox');
	await user.type(citySearchInputBox, "Berlin");

	// step 2 of 3: suggestionListItems initialised after user typing simulated
	// (as this is when the the list actually appears)
	const searchTerm = citySearchInputBox.value;
	// filter allLocations to locations matching "Berlin"
	const suggestionsOughtToBeRendered = allLocations
	      ? allLocations.filter((candidateLocation) => {
		  // allLocations is filtered down to the suggestions array—the array
		  // to only contain candidateLocation that contain searchTerm as a substring
		  // if not found as a substring indexOf() will return -1
		  return candidateLocation.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1;
	      })
	      : [];
	
	// get all <li> elements iwthin CitySearchComponent for comparison
	const suggestionsActuallyRendered = CitySearchComponent.queryAllByRole('listitem');

	// step 3 of 3:
	// check if suggestionsActuallyRendered has right length (incl. "see all cities" suggestion)
	expect(suggestionsActuallyRendered).toHaveLength(suggestionsOughtToBeRendered.length + 1);
	// chech if suggestionsActuallyRendered matches suggestionsOughtToBeRendered
	for (let i = 0; i < suggestionsOughtToBeRendered.length; i += 1) {
	    expect(suggestionsActuallyRendered[i].textContent).toBe(suggestionsOughtToBeRendered[i]);
	}
    });

    //-----------------------------------------------------------------------------------------------
    
    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
	
	// step 0 of 3: setup
	const user = userEvent.setup();
	const allEvents = await getEvents(); 
	const allLocations = extractLocations(allEvents);
	// rerender / update <CitySearch> (it expects allLocations as props)
	CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
	const citySearchInputBox = CitySearchComponent.queryByRole('textbox');

	// step 1 of 3: interaction simulated --- user types "Berlin" in city textbox
	await user.type(citySearchInputBox, "Berlin");
	// ... and selects first list item rendered by suggestions list i.e. "Berlin, Germany"
	const firstMatchInSuggestionsList = CitySearchComponent.queryAllByRole('listitem')[0];
	await user.click(firstMatchInSuggestionsList);

	// step 2 of 3: nothing further to be initialised after user interaction simulated
	// (as nothing further appears after interaction)

	// step 3 of 3: check if firstMatchInSuggestionsList rendered in citySearchInputBox
	// i.e. it needs to change from  "Berlin" to  "Berlin, Germany"
	expect(citySearchInputBox).toHaveValue(firstMatchInSuggestionsList.textContent);
    });
});

/* note:
   1. @testing-library/react & @testing-library/jest-dom are default installed
   when usingCRA to create a project
   2. src/setupTests.js contains line 'import '@testing-library/jest-dom'
   and is run whenever tests are run
*/

import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {

    let AppDOM;
    beforeEach(() => {
	AppDOM = render(<App />).container.firstChild;
    })

    /* Note: beforeEach() is used instead of beforeAll() as React Testing Library
       automatically unmounts the mock component after each test
    */

    test('renders CitySearch', () => {
	expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    test('renders number of events', () => {
	expect(AppDOM.querySelector('#no-of-events')).toBeInTheDocument();
    });

    test('renders list of events', () => {
	// note that matcher functions are always chained to expect()
	expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });
});

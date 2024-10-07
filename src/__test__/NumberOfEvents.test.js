import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsComponent;
    beforeEach(() => {
	NumberOfEventsComponent = render(<NumberOfEvents
					   numberPerPage={10}
					   onSelectionClick={() => {}}
					 />);
    });

    test('renders no-of-events box', () => {
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('combobox');
        expect(numberOfEventsBox).toBeInTheDocument();
    });

    test('no-of-events box has default value of 10', () => {
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('combobox');
        expect(numberOfEventsBox).toHaveValue('10');
    });

    test('no-of-events drop down menu appears upon click w. options 10, 15, 20, 25 & 30', async() => {
	// step 0 of 3: setup
	const user = userEvent.setup();
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('combobox');
	// step 1 of 3: interaction simulated --- user clicks numberOfEventsBox
	await user.click(numberOfEventsBox);
	// step 2 of 3: dropdown initialised after user clicking simulated
	// (as this is when the the menu actually appears)
        const option10 = NumberOfEventsComponent.getByText('10');
        const option15 = NumberOfEventsComponent.getByText('15');
        const option20 = NumberOfEventsComponent.getByText('20');
        const option25 = NumberOfEventsComponent.getByText('25');
        const option30 = NumberOfEventsComponent.getByText('30');
	// step 3 of 3: tests
        expect(option10).toBeInTheDocument();
        expect(option15).toBeInTheDocument();
        expect(option20).toBeInTheDocument();
        expect(option25).toBeInTheDocument();
        expect(option30).toBeInTheDocument();
    });
    
});

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsComponent;
    beforeEach(() => {
	NumberOfEventsComponent = render(<NumberOfEvents
					 numberPerPage={10}
					 />);
    });

    test('renders no-of-events box', () => {
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberOfEventsBox).toBeInTheDocument();
    });

    test('no-of-events box has default value of 10', () => {
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberOfEventsBox).toHaveValue(10);
    });

    test('no-of-events drop down menu default hidden', () => {
	const dropdown = NumberOfEventsComponent.queryByRole('combobox');
	expect(dropdown).not.toBeInTheDocument();
    });

    test('no-of-events drop down menu appears upon click w. options 10, 15, 20, 25 & 30', async() => {
	// step 0 of 3: setup
	const user = userEvent.setup();
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('textbox');
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

    /* this is now an integration test
    test('value of the NumberOfEvents component’s box is value 20 when user clicks on 20 from  drop-down menu', async() => {
	
	// step 0 of 3: setup
	const user = userEvent.setup();
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('textbox');
	// step 1 of 3: interaction simulated --- user clicks numberOfEventsBox and chooses 20
	await user.click(numberOfEventsBox);
        const dropdown = NumberOfEventsComponent.queryByRole('combobox');
	await userEvent.selectOptions(dropdown, "20");
	// step 2 of 3: suggestionListItems initialised after user typing simulated
        expect(numberOfEventsBox).toHaveValue(20);
    });*/
    
    test('drop down not rendered when user clicks outside of drop down menu', async () => {
	
	// step 0 of 3: setup
	const user = userEvent.setup();
        const numberOfEventsBox = NumberOfEventsComponent.queryByRole('textbox');
	// step 1 of 3: interaction simulated --- user clicks numberOfEventsBox then clicks away
	await user.click(numberOfEventsBox);
        await userEvent.click(document.body); // Simulate a click outside the dropdown
	// step 2 of 3: suggestionListItems initialised after user typing simulated
        const dropdown = NumberOfEventsComponent.queryByRole('combobox');
        expect(dropdown).not.toBeInTheDocument();
    });
});

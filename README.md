# Tribal Heart

Tribal Heart is serverless, meet-up-like PWA written with React. The application makes contact with the Google Calendar API to fetch upcoming events.

Its features as as follows.

## Feature 1 of 6: Filter Events by City

> As a user, I want to filter events by city, so that I can see the list of events that take place in that city.

Scenario: Filter events by selected city

- Given I am on the events page;
- When I select a city from the filter options;
- Then I should see a list of events for the selected city.

Scenario: List suggestions when a city is being searched for

- Given the main page is open;
- When user starts typing into the city textbox;
- Then a list of cities (suggestions) that match what they’ve already typed should be displayed.

Scenario: Select a city from the suggested list.

- Given user was typing "Ber" in the city textbox AND the list of suggested cities is showing;
- When the user selects a city (eg. "Berlin, Germany") from the list;
- Then the user should receive a list of upcoming events in that city.

Scenario: City with no events

- Given I am on the events page and some cities have zero events but are somehow listed;
- When I select that city that has zero events;
- Then I should get some sort of feedback that the city filter has been applied but there are no events in that city.

## Feature 2 of 6: Show/Hide Event Details

> As a user, I want to show/hide event details, so that I can see more/less information about an event

Scenario: Toggle event details

- Given I am viewing the list of events
- When I click on an event to view details where details are not shown
- Then I should see the event details displayed
- When I click on an event where details are being shown
- Then the event details should be hidden

Scenario: API failure

- Given I am viewing the list of events AND there is an error in the backend.
- When I click on an event to view details
- Then I should see an appropriate error message.

## Feature 3 of 6: Specify Number of Events

> As a user, I want to specify the number of events I want to view, so that I can see more or fewer events in the list at once

Scenario: Change the number of events displayed

- Given I am on the events page
- When I set the number of events to display to a specified number
- Then I should see exactly that number of events listed

Scenario: 0  number of events displayed

- Given I am on the events page and for some reason what 0 events displayed
- When I set the number of events to 0
- Then I should see an appropriate message "There's nothing here!"

## Feature 4 of 6: Use the App When Offline

> As a user, I want to use the app when offline, so that I can see the events I viewed the last time I was online

Scenario: View previously viewed events offline

- Given I have previously viewed events while online and I am now offline
- When I open the app
- Then I should see the list of previously viewed events

## Feature 5 of 6: Add an App Shortcut to the Home Screen

> As a user, I want to add the app shortcut to my home screen, so that I can open the app faster

Scenario: Add app shortcut to home screen

- Given I am on the app page
- When I select the option to add a shortcut to my home screen
- Then the app shortcut should be added to my home screen

## Feature 6 of 6: Display Charts Visualising Event Details

> As a user, I want to see a chart showing the upcoming events in each city, so that I know what events are organized in which city

Scenario: View event details in a chart format

- Given I am on the events page
- When I select the option to view events in chart format
- Then I should see a chart showing the upcoming events in each city
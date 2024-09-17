# Tribal Heart

Tribal Heart is serverless, meet-up-like PWA written with React. The application makes contact with the Google Calendar API to fetch upcoming events.

Its features as as follows.

## Feature 1 of 6: Filter Events by City

> As a user, I want to filter events by city, so that I can see the list of events that take place in that city.

Scenario: Filter events by selected city

- Given I am on the events page
- When I select a city from the filter options
- Then I should see a list of events for the selected city

## Feature 2 of 6: Show/Hide Event Details

> As a user, I want to show/hide event details, so that I can see more/less information about an event

Scenario: Toggle event details

- Given I am viewing the list of events
- When I click on an event to view details where details are not shown
- Then I should see the event details displayed
- When I click on an event where details are being shown
- Then the event details should be hidden

## Feature 3 of 6: Specify Number of Events

> As a user, I want to specify the number of events I want to view, so that I can see more or fewer events in the list at once

Scenario: Change the number of events displayed

- Given I am on the events page
- When I set the number of events to display to a specified number
- Then I should see exactly that number of events listed

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
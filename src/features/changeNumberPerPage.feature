Feature: Specify Number of Events

  Scenario: Change the number of events displayed
    Given the user is on the events page
    When the user sets the number of events to display to a specified number
    Then exactly that number of events is displayed.
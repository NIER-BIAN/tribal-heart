Feature: Show/Hide Event Details

  Scenario: Show event details
    Given the user is viewing the list of events
    When the user clicks on an event to view details where details are not shown
    Then the event's details are displayed.
    
  Scenario: Hide event details
    Given the user is viewing the list of events
    When the user clicks on an event where details are already shown
    Then the event's details are hidden.
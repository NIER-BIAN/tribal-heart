// This file defines the functions getEvents and extractLocations functions
// that is required by CitySearch.test.js

import mockData from './mock-data';

// fetch list of all events
const getEvents = async () => {
    return mockData;
};

// extract unique locations from an array of events
const extractLocations = (events) => {
    // use map to create a new array with only locations.
    const extractedLocations = events.map((event) => event.location);
    // remove duplicates using a Set and converts back to array with a spread operator
    // ps: without '...' it creates an array with the Set object as its single element
    const uniqueLocations = [...new Set(extractedLocations)];
    return uniqueLocations;
};

export { getEvents, extractLocations };

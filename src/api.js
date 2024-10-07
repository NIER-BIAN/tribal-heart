//============================================================================================
// Imports:

import mockData from './mock-data';

//============================================================================================
// API integration related:

/*

  checkTokenPresence
        |
        |
	V
    token found?     --- Yes --->  tokenValidityResult?  --- Yes ---> return access token
        |                                  |
        No                                 No
        |                                  |
        V                                  V
  Is authCode in URL? --- Yes --->   renewToken
        |                          from Lambda funcs
        No
        |
        V
  redirect to get the code
	
*/

// called by checkTokenPresence
const checkTokenValidity = async (accessToken) => {

    // use Google's tokeninfo endpoint to verify validity of a given Google OAuth 2.0 token
    const response = await fetch(
	`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

// called by checkTokenPresence
const renewToken = async (code) => {
    
    const encodedAuthCode = encodeURIComponent(code);

    /*
    **NOTE**: 2nd of 3 serverless function called
    that is, getAccessToken set up in auth-server/handler.js
    getAccessTokenPartialURL identical to getAccessTokenPartialURL
    in static-site-test/test-auth-server.html
    */
    const getAccessTokenPartialURL = 'https://tg3pna3a02.execute-api.eu-central-1.amazonaws.com/dev/api/token';
    const response = await fetch(getAccessTokenPartialURL + '/' + encodedAuthCode);
    // *NOTE this HAS to be called access_token*
    const { access_token } = await response.json();

    // recall: && is useful for making sure that a certain condition has been satisfied
    // i.e. access_token truthy prior to saving to localStorage
    access_token && localStorage.setItem("access_token", access_token);
    
    return access_token;
};

// called by getEvents when not using localhost i.e. using the real API
const checkTokenPresence = async () => {
    
    const accessToken = localStorage.getItem('access_token');
    
    const tokenValidityResult = accessToken && (await checkTokenValidity(accessToken));

    // if no token found OR accessToken found but checkTokenValidity(accessToken) return error
    if (!accessToken || tokenValidityResult.error) {
	
	await localStorage.removeItem('access_token');
	
	/* check for auth code in URL
	   create new URLSearchParams object called curSearchParams from the query str of current URL
	   the window.location.search property gets the part of the URL that follows '?'
	   e.g. https://example.com/callback?code=abcdef&state=xyz, window.location.search would be:
	   ?code=abcdef&state=xyz
	   the URLSearchParams obj ***then parses this str into key-value pair collection***
	   making it easy to access individual parameters.
	*/
	const curSearchParams = new URLSearchParams(window.location.search);
	const authCode = await curSearchParams.get('code');

	// authCode not found, redirect to Google Auth screen
	if (!authCode) {

	    /*
	    **NOTE**: 1st of 3 serverless function called
	    that is, getAuthURL set up in auth-server/handler.js
	    getAuthURL identical to getAuthURL in static-site-test/test-auth-server.html
	    */
	    const getAuthURL='https://tg3pna3a02.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url';
	    const response = await fetch(getAuthURL);
	    
	    const result = await response.json();
	    const { authUrl } = result;
	    return (window.location.href = authUrl);
	}

	// use authCode (pre-existing OR newly fetched) to renewToken
	// recall: && returns the first falsy value or the last truthy one.
	// useful for making sure that a certain condition has been satisfied
	// i.e. authCode truthy prior to renewToken(authCode) running
	return authCode && renewToken(authCode);
    }
    
    return accessToken;
};


// remove unnecessary query params from URL once we’re done with it w.o. reloading the page
// by manually setting the browser's URL to 'https://nier-bian.github.io/tribal-heart'
const removeQueryParamsFromUrl = () => {

    const simplifiedUrl =
	  // https://
	  window.location.protocol + "//" +
          // nier-bian.github.io
	  window.location.host +
	  // /tribal-heart
	  window.location.pathname;

    /*
      use pushState method of the window.history obj to update browser's history
      pushState is a crucial part of manipulating browser's history w.o. a full reload
      
      the arguments :
      "": An empty str representing the state obj. When the user navigates through
          the browser's history using the back/forward buttons, the browser restores
          this state object which allows us to associate data with specific points
          in the browser's history... but it's not used here)
      "": An empty string representing the title of the history entry (also not used)
      newurl: The newly constructed URL without the query string.
      
    */
    window.history.pushState("", "", simplifiedUrl);
    
};

//============================================================================================
// Unit tests / integration tests related:

// fetch list of all events
const getEvents = async () => {

    // if using localhost, return mock data; otherwise, use the real API. 
    if (window.location.href.startsWith("http://localhost")) {
	return mockData;
    }

    const token = await checkTokenPresence();
    
    if (token) {
	
	removeQueryParamsFromUrl();

	/*
	**NOTE**: 3rd of 3 serverless function called
	that is, getCalendarEve ts set up in auth-server/handler.js
	first part of getCalendarEventsURL identical to getCalendarEventsPartialURL
	in static-site-test/test-auth-server.html
	*/
	const getCalendarEventsURL = 'https://tg3pna3a02.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
	const response = await fetch(getCalendarEventsURL);
	const result = await response.json();
	if (result) {
	    return result.events;
	} else return null; 
    }
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

//============================================================================================
// Exports

export { getEvents, extractLocations };

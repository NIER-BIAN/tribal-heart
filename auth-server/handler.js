// This document contains code for the 3 serverless functions
// getAuthURL, getAccessToken, and getCalendarEvents

//====================================================================================
// Pre-amble

'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');

// process.env = values are in config.json file (best practice to hide API secrets) 
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

// should exactly match REDIRECT_URI that was registered with Google beforehand
const redirect_uris = ['https://nier-bian.github.io/tribal-heart/'];

// new instance of the google.auth.OAuth2 method
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

// note that any scopes passed here must be enabled beforehand
// via the  "OAuth consent screen" settings in project registered with Google Console. 
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];

//====================================================================================
// Serverless functions

module.exports.getAuthURL = async () => {

    // Recall: oAuth2Client is a new instance of the google.auth.OAuth2 method
    // that took CLIENT_ID, CLIENT_SECRET, and REDIRECT_URI[0] as args
    const authUrl = oAuth2Client.generateAuthUrl(
	{
	    access_type: 'offline',
	    // specify whether app needs to access user's data when the user is not present.
	    // 'offline'=app requires offline access to user's data
	    // i.e.  it can make requests to Google APIs on behalf of the user
	    // w.o. requiring the user to be actively logged in.
	    // enables app to obtain refresh token alongside access token
	    // can be used to obtain new access tokens w.o. asking user to re-authenticate
	    
	    scope: SCOPES, // SCOPES array passed to scope option
	}
    );

    return {
	statusCode: 200,
	// CORS headers allowing requests from any origin
	headers: {
	    'Access-Control-Allow-Origin': '*',
	    'Access-Control-Allow-Credentials': true,
	},
	// JSON response containing the authUrl
	body: JSON.stringify({
	    authUrl,
	}),
    };
};

// note that once this function is deployed it --- in essence --- behaves like an API endpoint
// i.e. handles HTTP reqs and provides structured responses when accessed over the internet
module.exports.getAccessToken = async (event) => {
    
    // auth code expected as URI parameter and extracted from the url query
    // decodeURIComponent is a built in js function that decodes special characters in URLs
    // e.g. %20 decoded to spaces
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
	
	// Recall: oAuth2Client is a new instance of the google.auth.OAuth2 method
	// that took CLIENT_ID, CLIENT_SECRET, and REDIRECT_URI[0] as args
	oAuth2Client.getToken(code, (error, response) => {
	    
	    if (error) {
		return reject(error);
	    }
	    return resolve(response);
	});
    }).then(

	// constructs res obj with CORS headers and a JSON body
	// containing the access token or err message based on outcome of the  process

	// callback after the exchange: arrow function with "results" as arg
	(results) => {
	    return {
		statusCode: 200,
		headers: {
		    // CORS headers allowing requests from any origin
		    'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Credentials': true,
		},
		// JSON response containing the access token
		body: JSON.stringify(results),
	    };
	})
    
	.catch((error) => {
	    return {
		statusCode: 500,
		body: JSON.stringify(error),
	    };
	});
};

module.exports.getCalendarEvents = async (event) => {
    
    // access token expected as URI parameter and extracted from the url query
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

    // Recall: oAuth2Client is a new instance of the google.auth.OAuth2 method
    // that took CLIENT_ID, CLIENT_SECRET, and REDIRECT_URI[0] as args
    oAuth2Client.setCredentials({ access_token });
    
    return new Promise((resolve, reject) => {

	// previously: const calendar = google.calendar('v3');
	calendar.events.list(
	    {
		calendarId: CALENDAR_ID,
		auth: oAuth2Client,
		timeMin: new Date().toISOString(),
		singleEvents: true,
		orderBy: "startTime",
	    },
	    
	    (error, response) => {
		if (error) {
		    reject(error);
		} else {
		    resolve(response);
		}
	    }  
	);
	
    }).then(

	// constructs res obj with CORS headers and a JSON body
	// containing the access token or err message based on outcome of the  process

	//callback after the exchange: arrow function with "results" as arg
	(results) => {
	    return {
		statusCode: 200,
		headers: {
		    // CORS headers allowing requests from any origin
		    'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Credentials': true,
		},
		// JSON response containing the access token
		body: JSON.stringify({ events: results.data.items }),
	    };
	})
    
	.catch((error) => {
	    return {
		statusCode: 500,
		body: JSON.stringify(error),
	    };
	});
};

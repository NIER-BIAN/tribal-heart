// comment this entire file out and add it to gitignore
// ditto: EventGenresChart.js

// npm uninstall recharts
// import and render lines in app.js
// ResizeObserver in setupTests.js
// EventGenresChart.js
// display in src/App.css

import { useState, useEffect } from 'react';

import { ScatterChart,
	 Scatter,
	 XAxis,
	 YAxis,
	 CartesianGrid,
	 Tooltip,
	 ResponsiveContainer
       } from 'recharts';

//===================================================================================

const CityEventsChart = ({ allLocations, graphedEvents }) => {
    
    const [data, setData] = useState([]);

    useEffect(

	// arg 1: function to run
	() => {
	    setData(getData());
	},

	// arg 2: dep. array
	[`${graphedEvents}`]

    );
    
    const getData = () => {
	const data = allLocations.map((location) => {
	    // for every location, extract the cicty e.g. 'Berlin'
	    const city = location.split((/, | - /))[0] // split by ", " or " - "
	    // count events in that city
	    const count = graphedEvents.filter(
		(event) => event.location === location
	    ).length
	    // note shorthand for {city: city, count: count})
	    return { city, count };
	});
	return data;
    };
    
    //===============================================================================

    return (
	    <ResponsiveContainer width="99%" height={400}>

	      <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: -30,
                }}
	      >
	    
                <CartesianGrid />
                <XAxis
	          type="category" dataKey="city" name="City"
                  angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
	        />
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={data} fill="white" />
	    
	      </ScatterChart>
	    
	    </ResponsiveContainer>
    );
}

export default CityEventsChart

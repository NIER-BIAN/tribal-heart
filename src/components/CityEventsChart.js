// remember to npm uninstall recharts
// comment this entire file out and add it to gitignore

// to delete:
// import and render lines in app.js
// ResizeObserver in setupTests.js

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

const CityEventsChart = ({ allLocations, allEvents}) => {
    
    const [data, setData] = useState([]);

    useEffect(

	// arg 1: function to run
	() => {
	    setData(getData());
	},

	// arg 2: dep. array
	[`${allEvents}`]

    );
    
    const getData = () => {
	const data = allLocations.map((location) => {
	    // for every location, extract the cicty e.g. 'Berlin'
	    const city = location.split((/, | - /))[0] // split by ", " or " - "
	    // count events in that city
	    const count = allEvents.filter((event) => event.location === location).length
	    // note shorthand for {city: city, count: count})
	    return { city, count };
	})
	return data;
    };
    
    //===================================================================================

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
                <YAxis type="number" dataKey="count" name="Number of events" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A school" data={data} fill="#8884d8" />
	    
	      </ScatterChart>
	    
	    </ResponsiveContainer>
    );
}

export default CityEventsChart

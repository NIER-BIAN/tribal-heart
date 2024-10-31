import { useState, useEffect } from 'react';

import { PieChart,
	 Pie,
	 Sector,
	 Cell,
	 Legend,
	 ResponsiveContainer
       } from 'recharts';

//===================================================================================

const EventGenresChart = ({ graphedEvents }) => {

    //===============================================================================
    // State management
    
    const [data, setData] = useState([]);

    // getData called by first useEffect hook
    const allGenres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const getData = () => {
	const data = allGenres.map((genre) => {
	    // for every genre, count events in that genre
	    const count = graphedEvents.filter(
		(event) => event.summary.includes(genre)
	    ).length
	    // note shorthand for {genre: genre, count: count})
	    return { genre, count };
	});
	return data;
    };
    
    useEffect(
	// arg 1: function to run
	() => {
	    setData(getData());
	},
	// arg 2: dep. array
	[`${graphedEvents}`]
    );

    //===================================================================================
    // UI rendering

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
	const RADIAN = Math.PI / 180;
	const radius = outerRadius;
	const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
	const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
	return percent ? (
	    <text
		x={x}
		y={y}
		fill="#8884d8"
		textAnchor={x > cx ? 'start' : 'end'}
		dominantBaseline="central"
	    >
		{`${allGenres[index]} ${(percent * 100).toFixed(0)}%`}
	    </text>
	) : null;
    };

    const colors = ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD'];

    return (
	<ResponsiveContainer width="99%" height={400}>
	    <PieChart>
		<Pie
		    data={data}
		    dataKey="count"
		    fill="#8884d8"
		    labelLine={false}
		    label={renderCustomizedLabel}
		    outerRadius={150}           
		>
		  {
	            data.map((entry, index) => (
		      <Cell key={`cell-${index}`} fill={colors[index]}/>
			))
		  }
		</Pie>
	    </PieChart>
	</ResponsiveContainer>
    );
}

export default EventGenresChart

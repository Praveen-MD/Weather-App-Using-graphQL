import React, { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "./Queries";
import useCurrentLocation from "./useCurrentLocation";
function Home() {
	var icon = "";
	const userLocation = useCurrentLocation();
	//console.log(userLocation);
	useEffect(() => {
		const intervalId = setInterval(() => {
			getWeather();
		}, 10000);
		return () => clearInterval(intervalId);
	}, [userLocation]);

	const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
		variables: { name: userLocation },
	});
	if (data) {
		//console.log(data);
		icon = ` http://openweathermap.org/img/wn/${data.getCityByName.weather.summary.icon}@2x.png`;
	} else
		return (
			<div className="container">
				<h1>WEATHR REPORT</h1>
				<div className="weather">
					<h2>Loading Results...</h2>
				</div>
			</div>
		);
	const tempInDegree = (
		data.getCityByName.weather.temperature.actual - 273
	).toFixed(2);
	const cTime = new Date().toLocaleTimeString(); // 11:18:48 AM
	return (
		<div className="container">
			<h1>
				<u>WEATHR REPORT</u>
			</h1>
			<div className="weather">
				{data && (
					<>
						<img src={icon} />
						<div className="items">
							<h2> Town: {data.getCityByName.name} </h2>
							<div></div>
							<h2> Temp: {tempInDegree}&deg;C</h2>
							<div></div>
							<h2>Details: {data.getCityByName.weather.summary.description}</h2>
						</div>
						<br />
						<h2>Time :{cTime}</h2>
					</>
				)}
			</div>
		</div>
	);
}

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
const useCurrentLocation = () => {
	const [userLocation, setUserLocation] = useState("kochi");
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(success, error);
		async function success(position) {
			//console.log(position.coords.latitude);
			//console.log(position.coords.longitude);
			var apikey = "136328eb44f7480faf19302ab3a6f3f8";
			var api_url = "https://api.opencagedata.com/geocode/v1/json";
			var request_url =
				api_url +
				"?" +
				"key=" +
				apikey +
				"&q=" +
				encodeURIComponent(
					position.coords.latitude + "," + position.coords.longitude
				) +
				//encodeURIComponent("11.1397" + "," + "75.9508") +
				"&pretty=1" +
				"&no_annotations=1";
			const res = await axios.get(request_url);
			console.log(res.data.results[0].formatted);
			setUserLocation(res.data.results[0].components.county);
		}
		function error(err) {
			console.log(err);
		}
	}, []);

	return userLocation;
};

export default useCurrentLocation;

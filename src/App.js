import "./App.css";
import axios from "axios";
import Home from "./Components/Home";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import useCurrentLocation from "./Components/useCurrentLocation";
function App() {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: "https://graphql-weather-api.herokuapp.com/",
	});

	return (
		<ApolloProvider client={client}>
			<Home />
		</ApolloProvider>
	);
}

export default App;

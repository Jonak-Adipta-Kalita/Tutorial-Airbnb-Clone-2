import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { LocationMarkerIcon } from "@heroicons/react/solid"

export default function Map({ searchResults }) {
	const [selectedLocation, setSelectedLocation] = useState({});
	const coordinates = searchResults.map((result) => ({
		longitude: result.long,
		latitude: result.lat,
	}))
	const center = getCenter(coordinates);
	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		longitude: center.longitude,
		latitude: center.latitude,
		zoom: 11,
	});
	return (
		<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/xxjonakadiptaxx/cks18vf5w6qrr18nxzyt6q0af"
			mapboxApiAccessToken={process.env.mapbox_key}
			onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
		>
			{searchResults.map((result) => (
				<div key={result.long} className="">
					<Marker
						longitude={result.long}
						latitude={result.lat}
						offsetLeft={-20}
						offsetTop={-10}
					>
						 <p
							role="img"
							className="cursor-pointer text-2xl"
							onClick={() => setSelectedLocation(result)}
							area-label="push-pin"
						>
							<LocationMarkerIcon className="h-7 text-red-400" />
						</p>
					</Marker>
					{selectedLocation.long === result.long ? (
						<Popup
							closeOnClick={true}
							closeButton={false}
							onClose={() => setSelectedLocation({})}
							latitude={selectedLocation.lat}
							longitude={selectedLocation.long}
						>
							<div className="p-2">
								{result.title}
							</div>
						</Popup>
					) : false}
				</div>
			))}
		</ReactMapGL>
	);
}
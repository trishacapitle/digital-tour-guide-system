import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EcoMarker, TourMarker } from "../assets/IconsIndex";

const Map = ({ lat, lng, mode }) => {
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null);
	const markerRef = useRef(null);

	useEffect(() => {
		if (!mapRef.current) {
			mapRef.current = new maplibregl.Map({
				container: mapContainerRef.current,
				style: `https://api.maptiler.com/maps/basic-v2-dark/style.json?key=FQtuRzG8X2q0OuDBNZuw`,
				center: [lng, lat],
				zoom: 16, 
			});

			const markerUrl = mode === "eco" ? EcoMarker : TourMarker;
			const markerEl = document.createElement("img");
			markerEl.src = markerUrl;
			markerEl.style.width = "20px";
			markerEl.style.height = "20px";
			markerEl.style.objectFit = "contain";

			markerRef.current = new maplibregl.Marker({
				element: markerEl,
				anchor: "center",
			})
				.setLngLat([lng, lat])
				.addTo(mapRef.current);
		}
	}, [lat, lng, mode]);

	useEffect(() => {
		if (mapRef.current && markerRef.current) {
			mapRef.current.setCenter([lng, lat]);
			markerRef.current.setLngLat([lng, lat]);
		}
	}, [lat, lng]);

	return (
		<div
			ref={mapContainerRef}
			style={{
				width: "100%",
				height: "100%",
				borderRadius: "8px",
				zIndex: 0,
			}}
		/>
	);
};

export default Map;

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EcoMarker, TourMarker } from "../assets/IconsIndex";

const MAPTILER_KEY = "FQtuRzG8X2q0OuDBNZuw";

const MapTilt = ({ lat, lng, mode }) => {
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null);
	const markerRef = useRef(null);

	useEffect(() => {
		if (mapRef.current) return; 

		const map = new maplibregl.Map({
			container: mapContainerRef.current,
			style: `https://api.maptiler.com/maps/5d99264f-d581-4d0d-b2df-f906183fd59c/style.json?key=${MAPTILER_KEY}`,
			center: [lng, lat],
			zoom: 18,
			pitch: 60,
			maxZoom: 20,
			minZoom: 17,
		});
		mapRef.current = map;

		const markerEl = document.createElement("img");
		markerEl.style.width = "40px";
		markerEl.style.height = "40px";
		markerEl.src = mode === "eco" ? EcoMarker : TourMarker;

		const marker = new maplibregl.Marker({
			element: markerEl,
			anchor: "center",
			pitchAlignment: "map",
			rotationAlignment: "map",
		})
			.setLngLat([lng, lat])
			.addTo(map);
		markerRef.current = marker;

		map.on("load", () => {
			const layers = map.getStyle().layers;
			const labelLayer = layers.find(
				(layer) => layer.type === "symbol" && layer.layout?.["text-field"]
			);
			const labelLayerId = labelLayer ? labelLayer.id : undefined;

			map.addSource("openmaptiles", {
				url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_KEY}`,
				type: "vector",
			});

			map.addLayer(
				{
					id: "3d-buildings",
					source: "openmaptiles",
					"source-layer": "building",
					type: "fill-extrusion",
					minzoom: 18,
					filter: ["!=", ["get", "hide_3d"], true],
					paint: {
						"fill-extrusion-color": "#2B2B2B",
						"fill-extrusion-height": [
							"interpolate",
							["linear"],
							["zoom"],
							15,
							10,
							18,
							["get", "render_height"],
						],
						"fill-extrusion-base": [
							"case",
							[">=", ["get", "zoom"], 16],
							["get", "render_min_height"],
							0,
						],
						"fill-extrusion-opacity": 0.9,
					},
					layout: {
						visibility: "visible",
					},
				},
				labelLayerId
			);
		});

		map.on("zoom", () => {
			if (!markerRef.current) return;
			const zoom = map.getZoom();
			const size = zoom > 18 ? 20 + zoom * 0.8 : 40;
			const el = markerRef.current.getElement();
			el.style.width = `${size}px`;
			el.style.height = `${size}px`;
		});
	}, []);

	useEffect(() => {
		if (!mapRef.current || !markerRef.current) return;

		const el = markerRef.current.getElement();
		el.src = mode === "eco" ? EcoMarker : TourMarker;

		markerRef.current.setLngLat([lng, lat]);

		mapRef.current.setCenter([lng, lat]);
	}, [lat, lng, mode]);

	return (
		<div
			ref={mapContainerRef}
			style={{ width: "100%", height: "100%", borderRadius: "8px" }}
		/>
	);
};

export default MapTilt;

import { useState, useEffect } from "react";
import useMode from "../hooks/useMode";
import { useGPSLocation } from "../hooks/useGPSLocation";
import { useGeofence } from "../hooks/useGeofence";
import Topbar from "../components/Topbar";
import MapTilt from "../components/MapTilt";
import { Glow } from "../assets/IconsIndex";

const SecondWindow = () => {
	const { lat, lng } = useGPSLocation();
	const { mode } = useMode();
	const currentGeofence = useGeofence();

	// Slideshow state
	const [highlightIndex, setHighlightIndex] = useState(0);
	const [imageIndex, setImageIndex] = useState(0);

	// Pull highlight groups for the current geofence
	const highlightGroups = currentGeofence?.properties?.highlightGroups ?? [];

	// Pick the current highlight group
	const currentHighlight = highlightGroups[highlightIndex] ?? null;
	const currentImages = currentHighlight?.images ?? [];

	// Reset slideshow when geofence changes
	useEffect(() => {
		setHighlightIndex(0);
		setImageIndex(0);
	}, [currentGeofence]);

	// Handle image slideshow inside a highlight
	useEffect(() => {
		if (mode === "tour" && currentImages.length > 1) {
			const interval = setInterval(() => {
				setImageIndex((prev) => {
					if (prev + 1 < currentImages.length) {
						return prev + 1;
					} else {
						// If finished images, move to next highlight (if any)
						if (highlightGroups.length > 1) {
							setHighlightIndex((h) => (h + 1) % highlightGroups.length);
						}
						return 0; // Reset image index
					}
				});
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [mode, currentImages.length, highlightGroups.length]);

	return (
		<div className="pass-content-tour w-full h-full bg-gradient-to-tr from-[#13141B] to-[#22252E]">
			{/* Background Glow */}
			<div className="glow-effect w-[600px] blur-lg bottom-[10rem] right-[6rem] z-0 absolute">
				<img src={Glow} alt="green glow effect" />
			</div>

			{/* Topbar */}
			<Topbar size="large" />

			<div className="nav-content flex gap-6 justify-center z-20 ml-4">
				{/* Map */}
				<div className="navigation-assist bg-[#272933] bg-opacity-70 rounded-lg w-[1264px] h-[968px] mt-4">
					<MapTilt lat={lat} lng={lng} mode={mode} />
				</div>

				{/* Info & Slideshow */}
				<div className="info-assist">
					{/* Image Carousel */}
					<div className="minimap w-[560px] h-[560px] mt-4 bg-[#272933] bg-opacity-70 rounded-lg backdrop-blur-xl flex items-center justify-center">
						{currentHighlight && currentImages.length > 0 ? (
							<img
								className="object-contain w-full h-full rounded-lg"
								src={
									new URL(
										`../assets/areas/${currentImages[imageIndex]}`,
										import.meta.url
									).href
								}
								alt={currentHighlight.name}
							/>
						) : (
							<p className="text-white text-center px-2">
								{currentGeofence
									? "No highlight groups available."
									: "Awaiting destination..."}
							</p>
						)}
					</div>

					{/* Text Details */}
					<div className="info-text w-[560px] h-fit mt-6 bg-[#272933] bg-opacity-70 rounded-lg backdrop-blur-xl p-6">
						{currentHighlight ? (
							<>
								<p className="font-semibold italic text-xl text-white">
									{currentHighlight.name}
								</p>
								<p className="font-semibold text-lg text-white mt-2">
									{currentHighlight.highlight}
								</p>
								<p className="font-semibold text-lg text-white mt-2">
									Features:
								</p>
								<ul className="font-semibold text-base list-disc list-inside text-[#0C8CE9]">
									{currentImages.map((img, idx) => (
										<li key={idx}>
											Slide {idx + 1} of {currentImages.length}
										</li>
									))}
								</ul>
							</>
						) : (
							<p className="text-white text-center text-lg">
								{currentGeofence
									? "Active destination, but no highlights."
									: "No destination active."}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecondWindow;

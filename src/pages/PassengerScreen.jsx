import { useState, useEffect } from "react";
import useMode from "../hooks/useMode";
import Topbar from "../components/Topbar";
import { Glow } from "../assets/IconsIndex";
import MapTilt from "../components/MapTilt";
import { useGPSLocation } from "../hooks/useGPSLocation";
import { useGeofence } from "../hooks/useGeofence";
import Loader from "../components/Loader";

const PassengerScreen = () => {
	const { mode, setMode, loading, setLoading } = useMode();
	const { lat, lng } = useGPSLocation();
	const currentGeofence = useGeofence();

	// Slideshow state
	const [currentIndex, setCurrentIndex] = useState(0);

	// Pull out highlightGroups for this geofence (or empty array)
	const highlightGroups = currentGeofence?.properties?.highlightGroups ?? [];

	// Whenever we enter a new geofence or switch to Tour mode, reset & start cycling
	useEffect(() => {
		setCurrentIndex(0);

		if (mode === "tour" && highlightGroups.length > 1) {
			const interval = setInterval(() => {
				setCurrentIndex((i) => (i + 1) % highlightGroups.length);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [currentGeofence, mode, highlightGroups.length]);

	// Pick the current highlight (or null)
	const currentHighlight = highlightGroups[currentIndex] ?? null;

	const handleSwitchToTour = () => {
		setLoading(true);
		setTimeout(() => {
			setMode("tour");
			setLoading(false);
		}, 3000);
	};

	return (
		<div className="w-full h-full bg-gradient-to-tr from-[#13141B] to-[#22252E] relative">
			<Topbar />

			{loading && <Loader message="Switching to TOUR mode..." />}

			{mode === "eco" && (
				<div className="pass-content-eco w-[392px] h-[500px] text-center flex flex-col justify-center items-center gap-4 m-auto">
					<h1 className="font-bold italic text-2xl text-white">
						Vehicle in <span className="text-[#63FE67]">ECO</span> mode.
					</h1>
					<h1 className="font-bold italic text-2xl text-white">
						Passenger Display is currently unavailable.
					</h1>
					<h1 className="font-bold italic text-2xl text-white">
						Switch to TOUR mode if you wish to activate this feature.
					</h1>
					<div
						className="bg-[#0C8CE9] w-[300px] h-11 text-center py-1 font-extrabold italic text-3xl text-white rounded-tl-3xl rounded-br-3xl cursor-pointer"
						onClick={handleSwitchToTour}
					>
						Switch to TOUR
					</div>
				</div>
			)}

			{mode === "tour" && (
				<div className="pass-content-tour">
					<div className="glow-effect w-[120px] blur-lg bottom-[10rem] right-[6rem] z-0 absolute">
						<img src={Glow} alt="green glow effect" />
					</div>
					<div className="nav-content flex gap-5 justify-center z-20 mt-1">
						<div className="navigation-assist bg-[#272933] bg-opacity-70 rounded-lg w-[577px] h-[524px] mt-[10px]">
							<MapTilt lat={lat} lng={lng} mode={mode} />
						</div>
						<div className="info-assist">
							{/* Slideshow container */}
							<div className="minimap w-[293px] h-[240px] mt-[10px] bg-[#272933] bg-opacity-70 rounded-lg backdrop-blur-xl flex items-center justify-center">
								{currentHighlight ? (
									<img
										className="object-contain w-full h-full rounded-lg"
										src={
											new URL(
												`../assets/areas/${currentHighlight.images[0]}`,
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

							{/* Textual info */}
							<div className="info-text w-[293px] h-fit mt-[10px] bg-[#272933] bg-opacity-70 rounded-lg backdrop-blur-xl p-4">
								{currentHighlight ? (
									<>
										<p className="font-semibold italic text-base text-white">
											{currentHighlight.name}
										</p>
										<p className="font-semibold text-xs text-white mt-2">
											{currentHighlight.highlight}
										</p>
									</>
								) : (
									<p className="text-white text-center text-xs">
										{currentGeofence
											? "Active destination, but no highlights."
											: "No destination active."}
									</p>
								)}
								<p className="font-semibold text-xs text-white mt-2">
									Features:
								</p>
								<ul className="font-semibold text-xs list-disc list-inside text-[#0C8CE9]">
									{currentHighlight
										? currentHighlight.images.map((_, idx) => (
												<li key={idx}>
													Slide {idx + 1} of {highlightGroups.length}
												</li>
										  ))
										: ["No features to show."].map((f, i) => (
												<li key={i}>{f}</li>
										  ))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PassengerScreen;

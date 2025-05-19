import { useState, useEffect } from "react";
import useMode from "../hooks/useMode";
import { useGPSLocation } from "../hooks/useGPSLocation";
import { useGeofence } from "../hooks/useGeofence";
import Topbar from "../components/Topbar";
import MapTilt from "../components/MapTilt";
import Map from "../components/Map";
import { Glow } from "../assets/IconsIndex";

const Nav = () => {
	const { mode } = useMode();
	const { lat, lng } = useGPSLocation();
	const currentGeofence = useGeofence();

	// Slideshow index & groups
	const [index, setIndex] = useState(0);
	const groups = currentGeofence?.properties?.highlightGroups || [];

	// Whenever we get a new geofence or switch into TOUR, reset & start cycling
	useEffect(() => {
		setIndex(0);

		if (mode === "tour" && groups.length > 1) {
			const iv = setInterval(() => {
				setIndex((i) => (i + 1) % groups.length);
			}, 5000);
			return () => clearInterval(iv);
		}
	}, [currentGeofence, mode, groups.length]);

	const highlight = groups[index] || null;

	return (
		<div className="w-full h-full relative bg-gradient-to-tr from-[#13141B] to-[#22252E]">
			<Topbar />
			<div className="glow-effect w-[120px] blur-lg bottom-[10rem] right-[6rem] z-0 absolute">
				<img src={Glow} alt="green glow effect" />
			</div>

			<div className="nav-content flex gap-5 justify-center z-20">
				{/* Left: Big map */}
				<div className="navigation-assist bg-[#272933] bg-opacity-70 rounded-lg w-[577px] h-[524px] mt-[10px]">
					<MapTilt lat={lat} lng={lng} mode={mode} />
				</div>

				{/* Right: Info panel */}
				<div className="info-assist">
					{/* Mini-map or image slideshow */}
					<div className="minimap w-[293px] h-[240px] mt-[10px] bg-[#272933] bg-opacity-70 rounded-lg backdrop-blur-xl flex items-center justify-center overflow-hidden">
						{highlight ? (
							<img
								className="object-cover w-full h-full"
								src={
									new URL(
										`../assets/areas/${highlight.images[0]}`,
										import.meta.url
									).href
								}
								alt={highlight.name}
							/>
						) : (
							<Map lat={lat} lng={lng} mode={mode} />
						)}
					</div>

					{/* Textual information */}
					<div className="info-text w-[293px] h-auto mt-[10px] bg-[#272933] bg-opacity-70 rounded-lg backdrop-blur-xl p-4">
						<p className="font-semibold text-xs text-white">
							Current Coordinates:
						</p>
						<p className="font-semibold text-xs text-[#63FE67]">
							{lat.toFixed(6)}, {lng.toFixed(6)}
						</p>

						{highlight ? (
							<>
								<p className="font-semibold italic text-base text-white mt-4">
									{highlight.name}
								</p>
								<p className="font-semibold text-xs text-white mt-2">
									{highlight.highlight}
								</p>
								<p className="font-semibold text-xs text-white mt-2">
									Slide {index + 1} of {groups.length}
								</p>
							</>
						) : currentGeofence ? (
							<p className="font-semibold italic text-xs text-white mt-4">
								No highlights in this area.
							</p>
						) : (
							<p className="font-semibold italic text-xs text-white mt-4">
								Awaiting geofence data...
							</p>
						)}

						<hr className="my-3 border-gray-600" />

						<p className="font-semibold text-xs text-white">
							Passenger Screen:
						</p>
						<p
							className={`font-semibold italic text-xs ${
								mode === "eco" ? "text-[#63FE67]" : "text-[#0C8CE9]"
							}`}
						>
							{mode === "eco" ? "Unavailable" : "Showing Tour"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav;

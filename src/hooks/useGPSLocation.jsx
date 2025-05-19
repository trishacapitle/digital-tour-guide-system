import { useState, useEffect } from "react";

export const useGPSLocation = () => {
	const [location, setLocation] = useState({
		lat: 16.05355806222454,
		lng: 120.58401835090501,
	});

	useEffect(() => {
		const ipc = window.electron;
		if (!ipc?.onGPSUpdate || !ipc?.send) {
			console.warn("IPC bridge not ready");
			return;
		}

		// // 1) Send the default coords right away so main process can run geofence
		// ipc.send("gps-update", location);

		// 2) Subscribe to live GPS updates
		const cleanup = ipc.onGPSUpdate((data) => {
			console.log("GPS Update Received:", data);
			setLocation(data);

			// Re-send every time coords change
			ipc.send("gps-update", data);
		});

		return () => {
			if (typeof cleanup === "function") cleanup();
		};
	}, []); // run only once on mount

	return location;
};

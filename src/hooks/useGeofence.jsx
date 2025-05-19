import { useState, useEffect } from "react";

export const useGeofence = () => {
	const [currentGeofence, setCurrentGeofence] = useState(null);

	useEffect(() => {
		if (window.electron && window.electron.onGeofenceUpdate) {
			const cleanup = window.electron.onGeofenceUpdate((data) => {
				setCurrentGeofence(data);
			});
			return () => {
				if (cleanup && typeof cleanup === "function") {
					cleanup();
				}
			};
		}
	}, []);

	return currentGeofence;
};

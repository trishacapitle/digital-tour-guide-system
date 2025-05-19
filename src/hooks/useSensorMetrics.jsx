import { useState, useEffect } from "react";

export const useSensorMetrics = () => {
	const [metrics, setMetrics] = useState({
		batteryStatus: "Unknown",
		batteryTemp: 0,
		socPercent: 0,
		remainingWh: 0,
		solarPower: 0,
		solarEfficiency: 0,
		isSolarCharging: false,
	});

	useEffect(() => {
		const receive = window.electron?.receive;
		if (typeof receive !== "function") return;

		const cleanup = receive("sensor-update", (data) => {
			setMetrics(data);
		});

		return () => {
			if (typeof cleanup === "function") {
				cleanup();
			}
		};
	}, []);

	return metrics;
};

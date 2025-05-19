const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	send: (channel, data) => ipcRenderer.send(channel, data),

	receive: (channel, callback) => {
		const subscription = (event, ...args) => callback(...args);
		ipcRenderer.on(channel, subscription);
		return () => ipcRenderer.removeListener(channel, subscription);
	},

	onGPSUpdate: (callback) => {
		const subscription = (event, data) => {
			console.log("Preload received GPS update:", data);
			callback(data);
		};
		ipcRenderer.on("gps-update", subscription);
		return () => ipcRenderer.removeListener("gps-update", subscription);
	},

	onGeofenceUpdate: (callback) => {
		const subscription = (event, data) => {
			callback(data);
		};
		ipcRenderer.on("geofence-update", subscription);
		return () => ipcRenderer.removeListener("geofence-update", subscription);
	},

	onPlayNarration: (callback) => {
		const sub = (_event, files) => callback(files);
		ipcRenderer.on("play-narration", sub);
		return () => ipcRenderer.removeListener("play-narration", sub);
	},

	// onSensorUpdate: (callback) => {
	// 	ipcRenderer.on("sensor-update", (_e, data) => callback(data));
	// 	return () => ipcRenderer.removeAllListeners("sensor-update");
	// },
});

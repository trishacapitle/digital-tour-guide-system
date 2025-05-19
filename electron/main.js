import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "path";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { initializeGeofenceManager } from "./geofenceManager.js";

let mainWindow = null;
let secondWindow = null;

// 1) single shared driverMode
let driverMode = "eco";

// 2) one mode-update handler
ipcMain.on("mode-update", (_evt, newMode) => {
  console.log("[main] mode-update →", newMode);
  driverMode = newMode;
  // broadcast to every window
  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send("mode-update", newMode);
  }
});

app.on("ready", () => {
  // ─── MAIN WINDOW ────────────────────────────────────────────
  mainWindow = new BrowserWindow({
		width: 1024,
		height: 600,
		kiosk: true,
		frame: false,
		fullscreen: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(app.getAppPath(), "electron", "preload.cjs"),
		},
	});
  mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"));

  // play a startup chime in the main window
  mainWindow.webContents.once("did-finish-load", () => {
    console.log("[main] mainWindow ready → startup.mp3");
    setTimeout(() => {
      mainWindow.webContents.send("play-narration", ["startup.mp3"]);
    }, 100);
  });

  // initialize geofence (it will now see driverMode via IPC updates)
  initializeGeofenceManager();

  // ─── GPS PORT ───────────────────────────────────────────────
  const gpsPort = new SerialPort({ path: "COM3", baudRate: 9600 });
  const gpsParser = gpsPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  gpsParser.on("data", (line) => {
    const loc = parseNMEA(line);
    if (loc) {
      console.log("[main] GPS →", loc);
      mainWindow.webContents.send("gps-update", loc);
      secondWindow?.webContents.send("gps-update", loc);
    }
  });
  gpsPort.on("error", (err) => console.error("[main] GPS error:", err));

  // ─── SECOND WINDOW OPEN/CLOSE ──────────────────────────────
  ipcMain.on("open-second-window", () => {
    console.log("[main] open-second-window");
    if (secondWindow) return; // already open

    // find external display
    const displays = screen.getAllDisplays();
    const primary = screen.getPrimaryDisplay();
    const external = displays.find((d) => d.id !== primary.id) || primary;
    const { x, y } = external.bounds;

    secondWindow = new BrowserWindow({
      x, y,
      width: 1920,
      height: 1080,
      fullscreen: true,
      frame: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(app.getAppPath(), "electron", "preload.cjs"),
      },
    });
    secondWindow.loadFile(
      path.join(app.getAppPath(), "dist-react", "secondWindow.html")
    );

    secondWindow.webContents.once("did-finish-load", () => {
      // send initial mode
      secondWindow.webContents.send("mode-update", driverMode);
      // optional startup chime
      setTimeout(() => {
        secondWindow.webContents.send("play-narration", ["startup.mp3"]);
      }, 100);
    });

    console.log(`[main] secondWindow at ${x},${y} (1920×1080)`);
  });

  ipcMain.on("close-second-window", () => {
    console.log("[main] close-second-window");
    if (secondWindow) {
      secondWindow.close();
      secondWindow = null;
    }
  });
});



/**
 * Parse NMEA sentences to extract location data.
 *
 * For $GPRMC sentences:
 *  - Expected format:
 *    $GPRMC,<time>,<status>,<lat>,<N/S>,<lon>,<E/W>,<speed>,<course>,<date>,...
 *    * Only if status is 'A' (data valid)
 *    * Returns { lat, lng, bearing }
 *
 * For $GPGGA sentences:
 *  - Expected format:
 *    $GPGGA,<time>,<lat>,<N/S>,<lon>,<E/W>,<fix>,...
 *    * Returns { lat, lng }
 */
function parseNMEA(sentence) {
	const parts = sentence.split(",");

	// Fallback to parsing GPGGA sentences if GPRMC is not available
	if (parts[0] === "$GPGGA" && parts.length > 5) {
		const latRaw = parts[2];
		const latHem = parts[3];
		const lonRaw = parts[4];
		const lonHem = parts[5];
		if (latRaw && lonRaw && latHem && lonHem) {
			const latDegrees = parseFloat(latRaw.slice(0, 2));
			const latMinutes = parseFloat(latRaw.slice(2));
			let latitude = latDegrees + latMinutes / 60;
			if (latHem === "S") latitude = -latitude;

			const lonDegrees = parseFloat(lonRaw.slice(0, 3));
			const lonMinutes = parseFloat(lonRaw.slice(3));
			let longitude = lonDegrees + lonMinutes / 60;
			if (lonHem === "W") longitude = -longitude;

			return { lat: latitude, lng: longitude };
		}
	}
	return null;
}

// geofenceManager.js (Electron main)
import { ipcMain, BrowserWindow } from "electron";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Track current driver mode in this module
let driverMode = "eco";
ipcMain.on("mode-update", (_evt, newMode) => {
  console.log("[geofenceManager] mode-update:", newMode);
  driverMode = newMode;
});

// 2) Track current geofence so we only broadcast on changes
let currentGeofenceId = null;

// Load your geojson
const geojsonPath = path.join(__dirname, "../src/assets/geofences.json");
const geofences = JSON.parse(fs.readFileSync(geojsonPath, "utf-8"));

export function initializeGeofenceManager() {
  ipcMain.on("gps-update", (_evt, location) => {
    if (!location?.lat || !location?.lng) return;

    // a) Calculate which geofence we’re in (if any)
    const pt = point([location.lng, location.lat]);
    const found =
      geofences.features.find((f) =>
        booleanPointInPolygon(pt, f)
      ) || null;

    // b) Only broadcast if the geofence actually changed
    const newGeofenceId = found?.id ?? null;
    if (newGeofenceId === currentGeofenceId) return;
    currentGeofenceId = newGeofenceId;

    // c) Broadcast the new geofence to every window
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send("geofence-update", found);
    });

    // d) Gather any narration files
    const narrations = found
      ? found.properties.highlightGroups.flatMap((g) => g.narration || [])
      : [];

    // e) Only trigger narration if we are in TOUR mode
    BrowserWindow.getAllWindows().forEach((win) => {
      if (driverMode === "tour" && narrations.length > 0) {
        win.webContents.send("play-narration", narrations);
      } else {
        win.webContents.send("stop-narration");
      }
    });
  });
}

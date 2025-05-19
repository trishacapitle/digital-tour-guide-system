// Metrics computation constants
const BATTERY_CAPACITY_WH = 2100;      // 60V * 35Ah
const PANEL_RATED_POWER_W = 500;        // 500W solar panel
const MIN_BATTERY_VOLTAGE = 50.0;       // 5×12V lead acid pack minimum
const MAX_BATTERY_VOLTAGE = 65.4;       // 5×12V pack maximum

/**
 * Compute derived metrics from raw sensor data.
 * @param {{ batteryVoltage: number, batteryCurrent: number, solarVoltage: number, solarCurrent: number, batteryTemperatures: number[] }} raw
 */
function computeMetrics(raw) {
  // Battery status
  const isCharging = raw.batteryCurrent > 0;
  const batteryStatus = isCharging ? "Charging..." : "Discharging";

  // Battery temperature (average of three sensors)
  const batteryTemp = raw.batteryTemperatures.reduce((sum, temp) => sum + temp, 0) / raw.batteryTemperatures.length;

  // State of Charge (SOC) estimate
  let socPercent = ((raw.batteryVoltage - MIN_BATTERY_VOLTAGE) / (MAX_BATTERY_VOLTAGE - MIN_BATTERY_VOLTAGE)) * 100;
  socPercent = Math.min(100, Math.max(0, socPercent));

  // Remaining energy (Wh)
  const remainingWh = (socPercent / 100) * BATTERY_CAPACITY_WH;

  // Solar power (W)
  const solarPower = raw.solarVoltage * raw.solarCurrent;

  // Solar efficiency (%)
  let solarEfficiency = 0;
  if (PANEL_RATED_POWER_W > 0) {
    solarEfficiency = Math.round((solarPower / PANEL_RATED_POWER_W) * 100);
    solarEfficiency = Math.min(100, Math.max(0, solarEfficiency));
  }

  // Is solar actively charging?
  const isSolarCharging = raw.solarCurrent > 0.1;

  return {
    batteryStatus,
    batteryTemp,
    socPercent,
    remainingWh,
    batteryCapacityWh: BATTERY_CAPACITY_WH,
    solarPower,
    solarEfficiency,
    isSolarCharging,
  };
}

module.exports = { computeMetrics };
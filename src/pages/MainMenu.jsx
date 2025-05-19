import Topbar from "../components/Topbar"
import ControlSwitch from "../components/ControlSwitch"
import Map from "../components/Map"
import { EcoIcon, TourIcon, LEDIconOff, LEDIconOn, BeaconIconOff, BeaconIconOn, SolarMeter, VehicleImg, BatteryGraphic, Glow } from "../assets/IconsIndex"
import { useState } from "react"
import useMode from "../hooks/useMode";
import { useGPSLocation } from "../hooks/useGPSLocation"
import { useGeofence } from "../hooks/useGeofence"


const MainMenu = () => {
  const [beaconOn, setBeaconOn] = useState(false);
  const [ledOn, setLedOn] = useState(false);
  const { mode } = useMode();

  const { lat, lng } = useGPSLocation();
	console.log("MainMenu GPS location:", { lat, lng });
	
	const currentGeofence = useGeofence();
	const landmarks = currentGeofence?.properties?.coverage || [];

  return (
		<div className="w-full h-full relative bg-gradient-to-tr from-[#13141B] to-[#22252E]">
			<Topbar />
			<div className="glow-effect mt-20 ml-20 z-0 absolute">
				<img src={Glow} alt="green glow effect" />
			</div>
			<div className="menu-content flex gap-5 justify-center">
				<div className="vehicle-card bg-[#272933] bg-opacity-70 w-[320px] h-[524px] mt-[10px] rounded-lg relative pt-[200px] z-10 backdrop-blur-xl">
					<div className="vehicle-img-container absolute w-[500px] top-[-70px] left-[-55px] z-50">
						<img src={VehicleImg} alt="vehicle 3d render" />
					</div>
					<div className="vehicle-status-container flex justify-center gap-2 items-center">
						<div className="pie w-36">
							{/* Back-End: Replace with functional solar output visualization */}
							<img
								src={SolarMeter}
								alt="solar meter placeholder"
								className="w-full"
							/>
						</div>
						<div className="info mt-4">
							<p className="font-semibold text-base/4 text-white ">
								Solar Output:{" "}
							</p>
							<p className="font-semibold text-[#63FE67]">465 W</p>
							<div className="indicators flex gap-3">
								<img
									src={mode === "eco" ? EcoIcon : TourIcon}
									alt="mode indicator"
								/>
								<img
									src={ledOn ? LEDIconOn : LEDIconOff}
									alt="led status indicator"
								/>
								<img
									src={beaconOn ? BeaconIconOn : BeaconIconOff}
									alt="beacon status indicator"
								/>
							</div>
						</div>
					</div>
					<div className="controls-container flex justify-center gap-2 drop-shadow-lg mt-3">
						<div className="toggle-controls w-[86px] h-[147px] bg-[#323541] rounded-lg flex flex-col items-center text-center">
							<p className="font-extrabold text-sm text-white mt-3">Controls</p>
							<div className="beacon-toggle">
								<p className="font-bold text-[10px] leading-6 text-white mt-3">
									Beacon Light
								</p>
								<ControlSwitch
									isOn={beaconOn}
									onToggle={() => setBeaconOn((prev) => !prev)}
								/>
							</div>
							<div className="led-toggle">
								<p className="font-bold text-[10px] text-white mt-3">
									LED Matrix
								</p>
								<ControlSwitch
									isOn={ledOn}
									onToggle={() => setLedOn((prev) => !prev)}
								/>
							</div>
						</div>
						<div className="battery-card w-[180px] h-[147px] bg-[#323541] rounded-lg flex items-center gap-2">
							<div className="battery-graphic ml-[10px]">
								<img src={BatteryGraphic} alt="battery status placeholder" />
							</div>
							<div className="battery-info">
								<p className="font-extrabold text-sm text-white mb-2">
									Battery
								</p>
								<p className="font-semibold text-xs text-white">
									Remaining Battery
								</p>
								{/* Fetch actual data */}
								<p className="font-semibold text-xs text-[#63FE67]">120 kWh</p>
								<p className="font-semibold text-xs text-white">
									Battery Capacity
								</p>
								<p className="font-semibold text-xs text-[#63FE67]">150 kWh</p>
								<p className="font-semibold text-xs text-white"> Status:</p>
								<p className="font-semibold text-xs text-[#63FE67]">
									Charging...
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="map-card bg-[#272933] bg-opacity-70 rounded-lg w-[554px] h-[524px] mt-[10px] relative">
					<Map lat={lat} lng={lng} mode={mode} />
					<div className="destination-tag w-44 h-20 flex items-center bg-[#00FF2A] bg-opacity-25 rounded-lg backdrop-blur p-4 absolute right-4 top-4">
						<p className="font-semibold text-xs text-white">
							Nearby Landmarks: {landmarks}
						</p>
					</div>
				</div>
			</div>
		</div>
	);   
};

export default MainMenu;

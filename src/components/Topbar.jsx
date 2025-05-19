import { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import BatteryFull from "../assets/batt-full.svg";

const Topbar = ({ size = "small" }) => {
	const [currentTime, setCurrentTime] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const formattedTime = now.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
			setCurrentTime(formattedTime);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const logoClasses = size === "large" ? "w-[150px] ml-6 mt-2" : "ml-[26px] mt-2";
	const battTimeClasses =
		size === "large"
			? "flex gap-3 items-center mr-8 mt-2"
			: "flex gap-3 items-center mr-6 mt-2";
	const battImgClasses = size === "large" ? "w-[30px]" : "w-6";
	const timeTextClasses =
		size === "large"
			? "text-white text-lg font-bold"
			: "text-white text-sm font-bold";

	return (
		<div className="topbar w-full flex justify-between items-center">
			<img className={logoClasses} src={Logo} alt="ecozar logo" />
			<div className={battTimeClasses}>
				<img
					className={battImgClasses}
					src={BatteryFull}
					alt="battery status"
				/>
				<div className={timeTextClasses}>{currentTime}</div>
			</div>
		</div>
	);
};

export default Topbar;

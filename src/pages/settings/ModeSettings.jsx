import ModeToggle from "../../components/ModeToggle";
import Loader from "../../components/Loader";
import useMode from "../../hooks/useMode";

const ModeSettings = () => {
	const { loading } = useMode();

	return (
		<div className="text-white relative">
			{/* Loader Overlay */}
			{loading && <Loader message="Switching modes..." />}

			<h2 className="text-green-400 font-bold text-xl">ECO Mode</h2>
			<p>
				In ECO Mode, the passenger screen is off to save battery, voice
				narration is disabled, and LED control is automatically off.
			</p>
			<h2 className="text-blue-400 font-bold text-xl mt-4">Tour Mode</h2>
			<p>
				In TOUR Mode, the passenger screen is on, tour guides and destination
				info are activated, voice narration is enabled, and LED control is
				switched on, consuming more power.
			</p>
			<div className="mt-4 flex items-center gap-4">
				<ModeToggle />
			</div>
		</div>
	);
};

export default ModeSettings;

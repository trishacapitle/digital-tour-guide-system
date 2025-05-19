import EcoOn from "../assets/ECOon-toggle.svg";
import TourOn from "../assets/TOURon-toggle.svg";
import useMode from "../hooks/useMode";

const ModeToggle = () => {
	const { mode, setMode, setLoading } = useMode();

	const handleToggle = async () => {
		console.log("ModeToggle clicked");
		const newMode = mode === "eco" ? "tour" : "eco";
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 3000));
		setMode(newMode);
		setLoading(false);
	};

	return (
		<div className="cursor-pointer" onClick={handleToggle}>
			<img src={mode === "eco" ? EcoOn : TourOn} alt={`Mode toggle: ${mode}`} />
		</div>
	);
};

export default ModeToggle;

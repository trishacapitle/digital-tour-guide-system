import { useEffect } from "react";
import useMode from "./hooks/useMode";

const SecondWindowModeHandler = () => {
	const { setMode } = useMode();

	useEffect(() => {
		const cleanup = window.electron.receive("mode-update", (newMode) => {
			console.log("Second window received mode update:", newMode);
			setMode(newMode);
		});
		return () => {
			if (cleanup && typeof cleanup === "function") {
				cleanup();
			}
		};
	}, [setMode]);

	return null;
};

export default SecondWindowModeHandler;

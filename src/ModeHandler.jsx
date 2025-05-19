import { useEffect } from "react";
import useMode from "./hooks/useMode";

const ModeHandler = () => {
	const { mode } = useMode();

	useEffect(() => {
		if (window.electron && window.electron.send) {
			window.electron.send("mode-update", mode);
			if (mode === "tour") {
				window.electron.send("open-second-window");
			} else {
				window.electron.send("close-second-window");
			}
		}
	}, [mode]);

	return null;
};

export default ModeHandler;

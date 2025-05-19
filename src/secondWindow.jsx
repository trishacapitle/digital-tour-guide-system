import React from "react";
import ReactDOM from "react-dom";
import SecondWindow from "./pages/SecondWindow";
import { ModeProvider } from "./ModeContext";
import SecondWindowModeHandler from "./SecondWindowModeHandler";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ModeProvider>
			<SecondWindowModeHandler />
			<div className="flex overflow-hidden w-[1920px] h-[1080px] box-border">
				<SecondWindow />
			</div>
		</ModeProvider>
	</React.StrictMode>
);

import { createContext, useState} from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
	const [mode, setMode] = useState("eco");
	const [loading, setLoading] = useState(false);

	return (
		<ModeContext.Provider value={{ mode, setMode, loading, setLoading }}>
			{children}
		</ModeContext.Provider>
	);
};

export default ModeContext;


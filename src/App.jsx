import MainLayout from "./MainLayout"
import LandingPage from "./pages/LandingPage"
import { HashRouter, Routes, Route } from "react-router-dom"
import { ModeProvider } from "./ModeContext"
import MainMenu from "./pages/MainMenu"
import Nav from "./pages/Nav"
import PassengerScreen from "./pages/PassengerScreen"
import LEDControl from "./pages/LEDControl"
import Settings from "./pages/Settings"
import ModeHandler from "./ModeHandler"
import { useNarration } from "./hooks/useNarration"

const App = () => {
useNarration();

  return (
		<ModeProvider>
			<ModeHandler />
				<HashRouter>
					<div className="flex overflow-hidden w-[1024px] h-[600px] box-border">
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/mainlayout/*" element={<MainLayout />}>
								<Route index element={<MainMenu />} />
								<Route path="navigation" element={<Nav />} />
								<Route path="passenger" element={<PassengerScreen />} />
								<Route path="ledcontrol" element={<LEDControl />} />
								<Route path="settings" element={<Settings />} />
							</Route>
						</Routes>
					</div>
				</HashRouter>
		</ModeProvider>
	);
}

export default App;


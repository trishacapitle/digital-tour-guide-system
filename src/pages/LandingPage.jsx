import { Logo } from "../assets/IconsIndex";
import EcoButton from "../components/EcoButton";
import TourButton from "../components/TourButton";

const LandingPage = () => {

	return (
		<div className="w-full bg-gradient-to-tr from-[#13141B] to-[#22252E] flex flex-col items-center">
			<div className="container w-[524px] m-auto">
				<div className="welcome-message relative">
					<h1 className="text-white font-medium text-3xl absolute top-6 left-4">
						Welcome aboard
					</h1>
					<img src={Logo} alt="logo" />
				</div>
				<div className="mode-buttons mt-4 flex justify-center gap-[100px]">
					<EcoButton />
					<TourButton />
				</div>
				<div className="note">
					<p
						className="text-white text-xl font-medium text-center mt-4"
						style={{ animation: "blinkText 1.5s infinite ease-in-out" }}
					>
						Choose mode to begin
					</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;

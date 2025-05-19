import { useState } from "react";
import Topbar from "../components/Topbar";
import { 
  ModeSettings, 
  DisplaySettings, 
  AudioSettings, 
  TroubleshootingSettings 
} from "./settings/SettingsIndex";

const settingsOptions = [
  { id: "mode", label: "Mode", component: <ModeSettings /> },
  { id: "display", label: "Display", component: <DisplaySettings /> },
  { id: "audio", label: "Audio", component: <AudioSettings /> },
  { id: "troubleshooting", label: "Troubleshooting", component: <TroubleshootingSettings /> },
];

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("mode");

  return (
    <div className="w-full h-full bg-gradient-to-tr from-[#13141B] to-[#22252E]">
      <Topbar />
      <div className="settings-content flex gap-4 ml-[26px]">
 
        <ul className="settings-options text-white flex flex-col gap-4 my-4">
          {settingsOptions.map((option) => (
            <li
              key={option.id}
              className={`p-4 rounded-lg w-80 font-semibold text-xl cursor-pointer
              ${
                selectedOption === option.id
                  ? "bg-[#3A3D49] border border-[#63FE67] text-[#63FE67]"
                  : "bg-[#272933]"
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.label}
            </li>
          ))}
        </ul>

        <div className="option-content w-[560px] p-6 bg-[#272933] my-4 rounded-lg">
          {settingsOptions.find((opt) => opt.id === selectedOption)?.component}
        </div>
      </div>
    </div>
  );
};

export default Settings;

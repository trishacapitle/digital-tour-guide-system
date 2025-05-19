import { ToggleOn, ToggleOff } from "../assets/IconsIndex";

const ControlSwitch = ({ isOn, onToggle }) => {
  return (
    <div className="cursor-pointer relative" onClick={onToggle}>
      <img
        src={ToggleOn}
        alt="toggle on"
        className={`transition-opacity duration-200 ease-in-out ${isOn ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={ToggleOff}
        alt="toggle off"
        className={`transition-opacity duration-200 ease-in-out absolute top-0 left-0 ${isOn ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
};

export default ControlSwitch;

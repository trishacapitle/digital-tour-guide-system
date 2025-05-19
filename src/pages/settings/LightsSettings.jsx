import ControlSwitch from "../../components/ControlSwitch";
import { useState } from "react";

const LightsSettings = () => {
const [isOn, setisOn] = useState(false);
    return (
      <div className="flex gap-2 items-center">
        <p className="text-white font-bold text-xl">Beacon Light</p>
        <ControlSwitch isOn={isOn} onToggle={() => setisOn((prev) => !prev)} />
      </div>
    );
  };
  
  export default LightsSettings;
  
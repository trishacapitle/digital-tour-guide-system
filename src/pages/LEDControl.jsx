import { useState } from "react";
import Topbar from "../components/Topbar";
import Upload from "../assets/Upload.svg";
import Keyboard from "../components/Keyboard";

const LEDControl = () => {
  const [inputText, setInputText] = useState("");
  const [ledText, setLedText] = useState("This is where your input will be displayed");

  const handleKeyPress = (key) => {
    if (key === "Backspace") {
      setInputText((prev) => prev.slice(0, -1));
    } else if (key === "Space") {
      setInputText((prev) => prev + " ");
    } else if (key === "Enter") {
      setInputText((prev) => prev + "\n");
    } else {
      setInputText((prev) => prev + key);
    }
  };

  const handleUpload = () => {
    setLedText(inputText);
    setInputText("");
  };

  return (
    <div className="w-full h-full bg-gradient-to-tr from-[#13141B] to-[#22252E] flex flex-col items-center">
      <Topbar />
      <div className="led-content p-4 mt-[14px] w-[895px] h-[182px] border border-[#63FE67] rounded-lg bg-[#272933]">
        <p id="text-output" className="text-white font-bold text-4xl whitespace-pre-wrap">
          {ledText}
        </p>
      </div>

      <div className="input-field flex items-center justify-center m-3 gap-2 w-[895px]">
        <input
          type="text"
          placeholder="Input text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full px-4 py-2 bg-[#272933] text-white rounded-lg font-semibold text-2xl "
        />
        <button
          onClick={handleUpload}
          className="p-2 bg-[#272933] rounded-lg transition-colors"
        >
          <img src={Upload} alt="upload button" className="w-full" />
        </button>
      </div>

      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default LEDControl;
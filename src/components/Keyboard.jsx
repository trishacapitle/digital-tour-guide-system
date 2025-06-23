import { useState } from "react";

const Keyboard = ({ onKeyPress }) => {
  const [isShift, setIsShift] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);

  const firstRow = isSymbols ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="] : ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];
  const secondRow = isShift ? ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"] : ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"];
  const thirdRow = isShift ? ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"'] : ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
  const fourthRow = isShift ? ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"] : ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

  const handleKeyPress = (key) => {
    if (key === "Shift") {
      setIsShift(!isShift);
    } else if (key === "123") {
      setIsSymbols(!isSymbols);
    } else {
      onKeyPress(key);
      if (isShift) setIsShift(false); 
    }
  };

  return (
    <div className="onscreen-keyboard bg-[#121212] p-1 rounded-md">
      <div className="w-[895px] space-y-1">
        {/* First Row */}
        <div className="flex gap-1">
          {firstRow.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="flex-1 py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Second Row */}
        <div className="flex gap-1">
          {secondRow.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="flex-1 py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Third Row */}
        <div className="flex gap-1">
          {thirdRow.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="flex-1 py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Fourth Row */}
        <div className="flex gap-1">
          <button
            onClick={() => handleKeyPress("Shift")}
            className={`flex-1 py-3 rounded ${isShift ? "bg-blue-600" : "bg-[#302F36]"} text-white hover:bg-gray-700 active:bg-gray-600`}
          >
            ⇧ Shift
          </button>
          {fourthRow.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="flex-1 py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
            >
              {key}
            </button>
          ))}
          <button
            onClick={() => handleKeyPress("Backspace")}
            className="flex-1 py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
          >
            ⌫
          </button>
        </div>

        {/* Control Row */}
        <div className="flex gap-1">
          <button
            onClick={() => handleKeyPress("123")}
            className="flex-1 py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
          >
            {isSymbols ? "ABC" : "123"}
          </button>
          <button
            onClick={() => handleKeyPress("Space")}
            className="flex-[5] py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
          >
            Space
          </button>
          <button
            onClick={() => handleKeyPress("Enter")}
            className="flex-1 py-3 bg-[#302F36] text-white rounded hover:bg-gray-700 active:bg-gray-600"
          >
            ⏎
          </button>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
import { useState } from "react";

const AudioSettings = () => {
  const [volume, setVolume] = useState(60);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const playTestSound = () => {
    const audio = new Audio("/src/assets/Point2.mp3");
    audio.volume = volume / 100;
    audio.play();
  };

  return (
    <div>
      <label className="text-white text-xl font-semibold">Speakers:</label>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-white text-2xl">🔊</span>
        <div className="w-full bg-gray-700 rounded-lg h-[30px] relative overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const newVolume = ((e.clientX - rect.left) / rect.width) * 100;
            setVolume(Math.min(100, Math.max(0, newVolume)));
          }}>
          <div
            className="bg-[#63FE67] h-full transition-all"
            style={{ width: `${volume}%` }}
          ></div>
        </div>
      </div>
      
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="w-full mt-2 opacity-0 cursor-pointer"
        aria-label="Volume Control"
      />

      <div className="mt-2">
        <label className="text-white font-semibold">Test audio output:</label>
        <button onClick={playTestSound} className="bg-[#63FE67] text-white px-4 py-1 rounded-lg ml-2">
          ▶ Play
        </button>
      </div>
    </div>
  );
};

export default AudioSettings;

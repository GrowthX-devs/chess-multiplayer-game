import React, { useState, useEffect } from "react";

type TimeDisplayProps = {
  totalSeconds: number;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ totalSeconds }) => {
  const [time, setTime] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Format as hh:mm:ss if hours >= 1, otherwise mm:ss
    return hours >= 1
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(secs).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="rounded bg-green-600 h-10 w-28 flex justify-center items-center absolute left-10 bottom-10">
      <h1 className="text-white">Time: {formatTime(time)}</h1>
    </div>
  );
};

export default TimeDisplay;

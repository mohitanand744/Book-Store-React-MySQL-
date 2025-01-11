import React from "react";
import { Statistic } from "antd";

const { Countdown } = Statistic;

const CountdownTimer = () => {
  const deadline = Date.now() + 8 * 60 * 60 * 1000; // 8 hours

  return (
    <div className="flex items-center justify-center gap-3">
      <p className="text-lg font-semibold text-orange-600">Time Remaining:</p>
      <Countdown
        title=""
        value={deadline}
        onFinish={() => console.log("Time's up!")}
        format="HH:mm:ss"
        className=""
      />
    </div>
  );
};

export default CountdownTimer;

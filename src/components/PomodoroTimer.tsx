import React, { useState, useEffect } from 'react';

interface PomodoroTimerProps {
  initialMinutes: number;
  size?: 'sm' | 'md';
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ initialMinutes, size = 'md' }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startStop = () => {
    setIsActive(!isActive);
    if (!isStarted) setIsStarted(true);
  };

  const reset = () => {
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsActive(false);
    setIsStarted(false);
  };

  const sizeClass = size === 'sm' ? 'text-xs px-3 py-1' : 'text-sm px-4 py-2';
  const primaryButtonStyle = `bg-[#aeea00] text-[#106861] font-semibold rounded-lg ${sizeClass} hover:bg-[#c0f000] transition-all duration-300`;
  const secondaryButtonStyle = `bg-[#106861] text-white font-semibold rounded-lg ${sizeClass} hover:bg-[#035d61] transition-all duration-300`;

  return (
    <div className="flex items-center gap-4">
      {!isStarted ? (
        <button onClick={startStop} className={primaryButtonStyle}>
          Start Pomodoro
        </button>
      ) : (
        <>
          <div className="text-white font-mono text-sm">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex gap-2">
            <button onClick={startStop} className={primaryButtonStyle}>
              {isActive ? 'Pause' : 'Resume'}
            </button>
            <button onClick={reset} className={secondaryButtonStyle}>
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;

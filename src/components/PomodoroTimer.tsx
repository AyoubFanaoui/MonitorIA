import React, { useState, useEffect } from 'react';

const PomodoroTimer = ({ initialMinutes, size = 'md' }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // To track if the timer has started

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startStop = () => {
    setIsActive(!isActive);
    if (!isStarted) setIsStarted(true); // Mark as started after first click
  };

  const reset = () => {
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsActive(false);
    setIsStarted(false); // Reset start state
  };

  // Compact button style
  const sizeClass = size === 'sm' ? 'text-xs p-2' : 'text-sm p-3';
  const startButtonStyle = `bg-green-500 text-white rounded-full ${sizeClass} hover:bg-green-600`;
  const resetButtonStyle = `bg-red-500 text-white rounded-full text-xs p-2 hover:bg-red-600`;

  return (
    <div className="flex items-center gap-4">
      {!isStarted ? (
        <button onClick={startStop} className={startButtonStyle}>
          Start Pomodoro
        </button>
      ) : (
        <>
          <div className="text-white text-xs">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex gap-2">
            <button onClick={startStop} className={startButtonStyle}>
              {isActive ? 'Pause' : 'Resume'}
            </button>
            <button onClick={reset} className={resetButtonStyle}>
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;

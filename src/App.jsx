import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
export default function App() {
  // const ref = useRef(localStorage.getItem("seconds"));

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  function startTimer() {
    setIsRunning((value) => true);
    setIsEditing((value) => false);
    // setInter
  }
  function pauseTimer() {
    setIsRunning((value) => false);
    setIsEditing((value) => true);
  }
  function resetTimer() {
    setSeconds((seconds) => seconds - seconds);
    setIsRunning((value) => false);
    setIsEditing((value) => true);
    // clearInterval
  }
  useEffect(
    function () {
      let runner;
      if (isRunning) {
        runner = setInterval(function () {
          setSeconds((seconds) => seconds + 1);
          console.log("running");
        }, 1000);
      }
      return () => {
        // console.log("here");
        if (runner == undefined) {
          return;
        }
        clearInterval(runner);
      };
    },
    [isRunning]
  );
  function Display({ seconds }) {
    // console.log(seconds);
    return (
      <>
        {/* {Math.floor(seconds / 3600) ? Math.floor(seconds / 3600) : seconds} :{" "} */}
        <div>
          <input
            type="text"
            defaultValue={
              Math.floor(seconds / 3600) ? Math.floor(seconds / 3600) : "00"
            }
            className="input"
            size={"2"}
            disabled={isEditing ? "" : "disabled"}
          />
          {/* {Math.floor(seconds / 60) ? Math.floor(seconds / 60) : seconds} :{" "} */}
          <input
            type="text"
            defaultValue={
              Math.floor(seconds / 60) ? Math.floor(seconds / 60) : "00"
            }
            className="input"
            size={"2"}
            disabled={isEditing ? "" : "disabled"}
          />
          {/* {seconds ? seconds % 60 : seconds} */}
          <input
            type="text"
            defaultValue={seconds % 60 ? Math.floor(seconds % 60) : "00"}
            className="input"
            size={"2"}
            disabled={isEditing ? "" : "disabled"}
          />
        </div>
      </>
    );
  }
  function Timer() {
    return (
      <div className="timer">
        <Display seconds={seconds} />
        <div className="buttons">
          <button
            className={isRunning ? "pause" : "start"}
            onClick={isRunning ? pauseTimer : startTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button className="reset" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="final">
      <header className="header">Stopwatch</header>
      <div className="app-container">
        <Timer />
      </div>
    </div>
  );
}

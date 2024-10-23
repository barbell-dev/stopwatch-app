import { useState, useEffect } from "react";
import useSound from "use-sound";
import "./App.css";
import "./index.css";
import sound from "./assets/jump.mp3";
import timeup from "./assets/error.wav";
export default function App() {
  // const ref = useRef(localStorage.getItem("seconds"));

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [play] = useSound(sound);
  const [timeUp] = useSound(timeup);
  function startTimer() {
    let hrs = parseInt(document.body.querySelectorAll(".input")[0].value);
    let min = parseInt(document.body.querySelectorAll(".input")[1].value);
    // console.log(document.body.querySelectorAll(".input")[2].value);
    let sec = parseInt(document.body.querySelectorAll(".input")[2].value);
    let newSeconds = hrs * 3600 + min * 60 + sec;
    if (newSeconds == 0) {
      play();
      alert("Set the timer first .");

      return;
    }
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
  // useEffect(
  //   function () {
  //     //multiply hours*3600 ,  minutes*60 and add em to seconds inorder to find latest value of seconds after editing.
  //     if (isEditing) {
  //       let hrs = document.querySelectorAll("input")[0].value;
  //       let min = document.querySelectorAll("input")[1].value;

  //       let sec = document.querySelectorAll("input")[2].value;
  //       let newSeconds = hrs * 3600 + min * 60 + sec;
  //       setSeconds(newSeconds);
  //       console.log(hrs + min + sec);
  //     } else {
  //       return;
  //     }
  //     return;
  //   },
  //   [isEditing]
  // );
  function handleChange() {
    let hrs = parseInt(document.body.querySelectorAll(".input")[0].value);
    let min = parseInt(document.body.querySelectorAll(".input")[1].value);
    // console.log(document.body.querySelectorAll(".input")[2].value);
    let sec = parseInt(document.body.querySelectorAll(".input")[2].value);
    let newSeconds = hrs * 3600 + min * 60 + sec;
    setSeconds((seconds) => newSeconds);
    console.log(newSeconds);
  }
  useEffect(
    function () {
      let runner;
      if (isRunning) {
        // setSeconds(newSeconds);
        runner = setInterval(function () {
          let hrs = parseInt(document.body.querySelectorAll(".input")[0].value);
          let min = parseInt(document.body.querySelectorAll(".input")[1].value);
          // console.log(document.body.querySelectorAll(".input")[2].value);
          let sec = parseInt(document.body.querySelectorAll(".input")[2].value);
          let newSeconds = hrs * 3600 + min * 60 + sec;
          if (newSeconds > 0) {
            setSeconds((seconds) => newSeconds - 1);
            console.log("running");
          } else {
            setIsRunning((value) => false);
            // clearInterval(runner)

            setIsEditing((value) => true);
            timeUp();
            alert("Time up !!");
            return;
          }
        }, 1000);
      } else {
        return;
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
            type="number"
            size={"2"}
            min={0}
            defaultValue={
              Math.floor(seconds / 3600) ? Math.floor(seconds / 3600) : 0
            }
            onChange={handleChange}
            className="input"
            // size={"2"}
            disabled={isEditing ? "" : "disabled"}
          />
          {/* {Math.floor(seconds / 60) ? Math.floor(seconds / 60) : seconds} :{" "} */}
          <input
            type="number"
            size={"2"}
            min={0}
            defaultValue={
              // 0
              Math.floor(seconds / 60) ? Math.floor((seconds % 3600) / 60) : 0
            }
            className="input"
            onChange={handleChange}
            // size={"2"}
            disabled={isEditing ? "" : "disabled"}
          />
          {/* {seconds ? seconds % 60 : seconds} */}
          <input
            type="number"
            size={"2"}
            min={0}
            defaultValue={
              seconds % 60 ? Math.floor(seconds % 60) : 0
              // 0
            }
            className="input"
            onChange={handleChange}
            // size={"2"}
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

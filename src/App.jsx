import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import "./App.css";
import "./index.css";
import sound from "./assets/jump.mp3";
import timeup from "./assets/error.wav";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
export default function App() {
  // const ref = useRef(localStorage.getItem("seconds"));
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [startingSeconds, setStartingSeconds] = useState(0);
  const [play] = useSound(sound);
  const [timeUp] = useSound(timeup);
  function startTimer() {
    let hrs = parseInt(hoursRef.current.value);
    // console.log(hrs);

    let min = parseInt(minutesRef.current.value);
    // // console.log(document.body.querySelectorAll(".input")[2].value);
    let sec = parseInt(secondsRef.current.value);
    let newSeconds = hrs * 3600 + min * 60 + sec;
    setSeconds((s) => newSeconds);
    console.log(newSeconds);
    // hoursRef.current.value = Math.floor(newSeconds / 3600);
    // minutesRef.current.value = Math.floor((newSeconds % 3600) / 60);
    // secondsRef.current.value = Math.floor(newSeconds % 60);
    // console.log(
    //   hoursRef.current.value,
    //   minutesRef.current.value,
    //   secondsRef.current.value
    // );
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
    setStartingSeconds((value) => 0);
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
  // function handleChange(event) {
  //   // console.log("handleChange");
  //   // let hrs = parseInt(hoursRef.current.value);
  //   // let min = parseInt(minutesRef.current.value);
  //   // let sec = parseInt(secondsRef.current.value);
  //   // // console.log(document.body.querySelectorAll(".input")[2].value);
  //   // // console.log(
  //   // //   secondsRef.currentocument.body.querySelectorAll(".input")[2].value
  //   // // );
  //   // let newSeconds = hrs * 3600 + min * 60 + sec;
  //   // // setSeconds((seconds) => newSeconds);
  //   // // // ?console.log(newSeconds);
  //   // // setStartingSeconds((sec) => newSeconds);
  //   // console.log(event.target.tagName.toLowerCase());
  // }
  // console.log("here");
  // let runner;
  // useEffect(() => {
  //   if (seconds <= 0) {
  //     clearInterval(runner);
  //     console.log("new")
  //   }
  //   return () => {};
  // }, [seconds]);
  useEffect(
    function () {
      // console.log(isRunning);
      // if (seconds > 0) {
      //   clearInterval(runner);
      // }
      let runner;
      if (isRunning) {
        // setSeconds(newSeconds);
        console.log("in isRunning ");
        // console.log(hoursRef.current.value);
        // let hrs = Math.floor(seconds / 3600);
        // let min = Math.floor((seconds % 3600) / 60);
        // let sec = seconds % 60;
        // // // console.log(document.body.querySelectorAll(".input")[2].value);
        // // let sec = parseInt(secondsRef.current.value)
        // console.log(hrs, min, sec);
        // let newSeconds = hrs * 3600 + min * 60 + sec;
        runner = setInterval(function () {
          // console.log(hoursRef.current);
          /*can also use
runner= setInterval(function(){
          setSeconds((s)=>{if(s>0){return s-1}else{clearInterval(runner);timeUp();alert("Time up");return 0;}})
 },1000)*/
          let hrs = parseInt(hoursRef.current.value);
          let min = parseInt(minutesRef.current.value);
          let sec = parseInt(secondsRef.current.value);
          // // // console.log(document.body.querySelectorAll(".input")[2].value);
          // // let sec = parseInt(secondsRef.current.value)
          // console.log(hrs, min, sec);
          let newSeconds = hrs * 3600 + min * 60 + sec;
          // console.log(newSeconds);

          // console.log(seconds + "lerer");
          if (newSeconds > 0) {
            setSeconds((seconds) => newSeconds - 1);
            console.log("running");
            // console.log(seconds);
            return;
          } else {
            setIsRunning((value) => false);
            // clearInterval(runner)
            console.log("lol");
            setIsEditing((value) => true);
            setStartingSeconds((value) => 0);
            timeUp();
            alert("Time up !!");
            return;
          }
        }, 1000);
      } else {
        // return;
      }
      return () => {
        console.log("hereee e");
        clearInterval(runner);
      };
    },
    [isRunning]
  );
  function handleFocus(event, nextRef) {
    // event.preventDefault();
    // console.log(typeof event.target.value);
    if (nextRef == null) {
    } else if (event.target.value.length == 2 && nextRef.current) {
      console.log(nextRef.current);
      nextRef.current.focus();
      // let id = parseInt(event.target.id);
      // let nextInputElementToFocus = document.getElementById(id + 1);
      // console.log(nextInputElementToFocus);
      // // console.log(nextInputElementToFocus);
      // // console.log(event.target.value);
      // // if (nextInputElementToFocus != undefined) {
      // //   // nextInputElementToFocus.focus();
      // //   // nextInputElementToFocus.select();
      // //   nextInputElementToFocus.focus();
      // // }
      // // console.log(nextInputElementToFocus.f;
      // nextInputElementToFocus.focus();
    } else {
      console.log("here");
      // return;
    }
  }
  function Display({ seconds }) {
    // console.log(seconds);
    return (
      <>
        {/* {Math.floor(seconds / 3600) ? Math.floor(seconds / 3600) : seconds} :{" "} */}
        <div>
          <input
            type="text"
            size={2}
            ref={hoursRef}
            max={99}
            min={0}
            maxLength={2}
            defaultValue={
              Math.floor(seconds / 3600) < 10
                ? "0" + Math.floor(seconds / 3600)
                : Math.floor(seconds / 3600)
            }
            // oncl
            onChange={(event) => {
              handleFocus(event, minutesRef);
            }}
            id="1"
            // onBlurCapture={handleChange}
            // onInput={handleChange}
            // onCompositionUpdate={handleChange}
            // onAbort={handleChange}
            // onBeforeInput={handleChange}
            // onEnded={handleChange}
            // onFocus={handleChange}
            // onInput={handleChange}
            // onProgress={handleChange}
            // onBlur={handleChange}
            className="input"
            // size={"2"}
            disabled={isEditing ? "" : "disabled"}
          />
          {/* {Math.floor(seconds / 60) ? Math.floor(seconds / 60) : seconds} :{" "} */}
          <input
            type="text"
            size={"2"}
            min={0}
            maxLength={2}
            defaultValue={
              // 0
              Math.floor((seconds % 3600) / 60) < 10
                ? "0" + Math.floor((seconds % 3600) / 60)
                : Math.floor((seconds % 3600) / 60)
            }
            id="2"
            className="input"
            // onBlur={handleChange}
            // size={"2"}
            onChange={(e) => handleFocus(e, secondsRef)}
            ref={minutesRef}
            disabled={isEditing ? "" : "disabled"}
          />
          {/* {seconds ? seconds % 60 : seconds} */}
          <input
            type="text"
            size={"2"}
            min={0}
            maxLength={2}
            defaultValue={
              seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60
              // 0
            }
            ref={secondsRef}
            id="3"
            className="input"
            // onBlur={handleChange}
            // size={"2"}
            onChange={(e) => handleFocus(e, null)}
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
      <div style={{ width: 250, height: 250 }}>
        <CircularProgressbarWithChildren
          value={
            startingSeconds
              ? ((startingSeconds - seconds) / startingSeconds) * 100
              : 0
          }
          counterClockwise={true}
          strokeWidth={4}
          styles={buildStyles({
            pathColor: "gray",
            trailColor: "blue",
            pathTransitionDuration: 0.15,
            // rotation: 1,
          })}
        >
          {/* <div className="app-container"> */}
          <Timer />
          {/* </div> */}
        </CircularProgressbarWithChildren>
      </div>
      {/* </Circle> */}
    </div>
  );
}

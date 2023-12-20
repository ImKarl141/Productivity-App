import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { PlayPauseIcon, ResetTimer, StopIcon } from "../../icons"
import { useTimer } from "./useTimer"

const TimerClock = () => {

  //Default values to load then timer is reset
  const [defaultValues, setDefaultValues] = useState({
    hours: '00',
    minutes: 25,
    seconds: 0,
    isPlaying: false,
  });

  //Values for timer clock
  const [timer, setTimer] = useState({
    hours: '00',
    minutes: 25,
    seconds: 0,
    isPlaying: false,
  });

  const { hours, minutes, seconds, isPlaying } = timer;
  const [isFinish, setIsFinish] = useState(false)

  //Update the value every second when timer state change, when finished
  // useEffect(() => {
  //   const myInterval = setInterval(() => {
  //     updateTime();
  //   }, 1000);
  //   return () => clearInterval(myInterval);
  //   console.log("Timer finished");
  //   setIsFinish(true);
  // }, [timer])

  // useEffect(() => {
  //   const myTime = setTimeout(() => {
  //     updateTime();
  //   }, 1000);
  //   return () => clearInterval(myTime);
  // }, [timer])

  useTimer(() => {
    updateTime()
  },
    isPlaying ? 1000 : null
  )

  const updateTime = () => {
    if (isPlaying) {
      if (minutes >= 1) {
        // console.log("More than one minute");
        if (seconds >= 1) { //Decrease only seconds
          // const newValue = { ...timer, seconds: timer.seconds - 1 };
          setTimer({ ...timer, seconds: timer.seconds - 1 });
        } else { //Decrease minutes and set Seconds to 59
          // const newValue = { ...timer, minutes: timer.minutes - 1, seconds: 59 };
          setTimer({ ...timer, minutes: timer.minutes - 1, seconds: 59 });
        }
      } else { //No minutes
        if (seconds >= 1) { //Decrease only seconds
          // const newValue = { ...timer, seconds: timer.seconds - 1 };
          setTimer({ ...timer, seconds: timer.seconds - 1 });
        } else {
          // const newValue = { ...timer, isPlaying: !isPlaying }
          setTimer({ ...timer, isPlaying: !isPlaying })
          setIsFinish(true)
          //Activate Notification when timer is finished 
          myAlert();
        }
      }
    } else {
      return;
    }
  }



  const myAlert = () => {
    console.log("Timer finished");
    // alert("Finished")
    // resetTimer();
  }

  //Clock's buttons 
  //Start and pause timer
  const playTimer = () => {
    const newValue = { ...timer, isPlaying: !isPlaying }
    setTimer(newValue)
  }

  //Set all the values to 0
  const stopTimer = () => {
    const newValue = { ...timer, minutes: 0, seconds: 0, isPlaying: false }
    setTimer(newValue)
    setIsFinish(true)
    console.log("Timer was stopped");
    alert("Timer was stopped")
  }

  //Reset the timer to the default values (those are set in the user settings)
  const resetTimer = () => {
    // const newValue = { ...timer, seconds: 0, isPlaying: false }
    setTimer(defaultValues)
    setIsFinish(false)
    console.log("Timer was reset");

  }

  return (
    <div className="pomodoro-timer">
      <div className="timer-clock-full">
        {/*If the values are 0, display it as 00*/}
        {
          minutes <= 9 ? <span className="timer-text-full">{`0${minutes}:`}</span> :
            <span className="timer-text-full">{`${minutes}:`}</span>
        }
        {
          seconds <= 9 ? <span className="timer-text-full">{`0${seconds}`}</span> : <span className="timer-text-full">{`${seconds}`}</span>
        }
        <div className="tick-main">
          <span className="tick-vertical-main"></span>
          <div className="tick-container">
            <span className="tick-horizontal-main"></span>
            <span className="tick-horizontal-main"></span>
          </div>
          <span className="tick-vertical-main"></span>
        </div>
        <div className="tick">
          <span className="tick-vertical"></span>
          <div className="tick-container">
            <span className="tick-horizontal"></span>
            <span className="tick-horizontal"></span>
          </div>
          <span className="tick-vertical"></span>
        </div>
        <div className="timer-btn-full">
          {
            isFinish && (
              <button className="play-buttons-full" title="Reset" onClick={() => resetTimer()}>
                <ResetTimer />
              </button>
            )
          }
          {
            !isFinish && (
              <button className='play-buttons-full' title="Play/Pause" onClick={() => playTimer()}>
                <PlayPauseIcon />
              </button>
            )
          }
          <button className='play-buttons-full' title="Stop" onClick={() => stopTimer()}>
            <StopIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
export default TimerClock
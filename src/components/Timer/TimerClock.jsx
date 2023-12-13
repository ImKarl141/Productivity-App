import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { PlayPauseIcon, ResetTimer, StopIcon } from "../../icons"

const TimerClock = () => {

  //Default values to load then timer is reset
  const [defaultValues, setDefaultValues] = useState({
    hours: '00',
    minutes: 25,
    seconds: 59,
    isPlaying: false,
  });

  //Values for timer clock
  const [timer, setTimer] = useState({
    hours: '00',
    minutes: 10,
    seconds: 5,
    isPlaying: false,
  });

  const { hours, minutes, seconds, isPlaying } = timer;

  //Activate Notification when timer is finished 
  const [isFinish, setIsFinish] = useState(false)

  //Update the value every second when timer state change, when finished
  useEffect(() => {
    //If minute and seconds are set to 0 then stop the updating 
    if (seconds >= 1) {
      const myInterval = setInterval(() => {
        updateTime();
      }, 1000);
      return () => clearInterval(myInterval);
    }
    // console.log(timer);
    console.log("Timer finished");
    //Activate notification
    setIsFinish(true);
  }, [timer])

  //Logic for updating the timer value
  //Start with the minutes state. Remove a number every time seconds reaches 0. If minutes are < 1 then set it to 0. If minutes are 0 and timer is 0 then stop the timer automatically  

  const mySeconds = () => {
    if (minutes > 1) { //Decrease minutes by 1 and when seconds reaches 0 reset to 59
      if (seconds >= 1) {
        const newSecond = { ...timer, seconds: timer.seconds - 1 }
        setTimer(newSecond)
      } else {
        const newMinute = { ...timer, minutes: timer.minutes - 1 }
        setTimer(newMinute)
        const newSecond = { ...timer, seconds: timer.seconds = 59 }
        setTimer(newSecond)
      }
    } else { //Set minutes to 0 and decrease seconds, when reaches 0 the exit 
      const newMinute = { ...timer, minutes: timer.minutes = 0 }
      setTimer(newMinute)
      if (seconds >= 1) {
        const newSecond = { ...timer, seconds: timer.seconds - 1 }
        setTimer(newSecond)
      } else {
        const newSecond = { ...timer, seconds: timer.seconds = 0 }
        setTimer(newSecond)
        return;
      }
    }
  }


  const updateTime = () => {
    //Logic for decreasing seconds
    //Verify if minutes is 1: Hide minutes and only show seconds
    //Verify if seconds is 0 and minutes is greater or equal than 1 : decrease minute state by 1

    if (isPlaying) {
      const newValue = { ...timer, seconds: timer.seconds - 1 }
      setTimer(newValue)
      console.log(timer);
    } else {
      return;
    }
  }

  const playTimer = () => {
    const newValue = { ...timer, isPlaying: !isPlaying }
    setTimer(newValue)
  }

  //Set all the values to 0
  const stopTimer = () => {
    const newValue = { ...timer, seconds: 0, isPlaying: false }
    setTimer(newValue)
    console.log("Timer was stopped");
  }

  //Reset the timer to the default values (those are set in the user settings)
  const resetTimer = () => {
    // const newValue = { ...timer, seconds: 0, isPlaying: false }
    setTimer(defaultValues)
    setIsFinish(false)
    console.log("Timer was reset");
  }

  const minutesSeconds = () => {
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
      </div>
      <div className="timer-btn-full">
        <button className='play-buttons-full' title="Play/Pause" onClick={() => playTimer()}>
          <PlayPauseIcon />
        </button>
        <button className='play-buttons-full' title="Stop" onClick={() => stopTimer()}>
          <StopIcon />
        </button>
        <button className="play-buttons-full" title="Reset" onClick={() => resetTimer()}>
          <ResetTimer />
        </button>
      </div>
    </div>
  )
}
export default TimerClock
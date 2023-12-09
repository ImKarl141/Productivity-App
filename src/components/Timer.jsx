import { useEffect, useState } from "react"
import { PlayPauseIcon, StopIcon, ResetTimer, CoffeeIcon, AddTaskTimerIcon, TaskDetailsIcon } from "../icons"
import timerMini from '../images/timer-stage2-icon.svg'
import details from '../images/kebab.svg'
import ListTimerTask from "./Timer/ListTimerTask"


const Timer = () => {
  const [defaultValues, setDefaultValues] = useState({
    hours: '00',
    minutes: '00',
    seconds: 10,
    isPlaying: false,
  });

  const [timer, setTimer] = useState({
    hours: '00',
    minutes: '00',
    seconds: 10,
    isPlaying: false,
  });

  const { hours, minutes, seconds, isPlaying } = timer;
  const [isFinish, setIsFinish] = useState(false)

  useEffect(() => {
    if (seconds >= 1) {
      const myInterval = setInterval(() => {
        updateTime();
      }, 1000);
      return () => clearInterval(myInterval);
    }
    console.log("Timer finished");
    console.log(timer);
    setIsFinish(true);
  }, [timer])

  const updateTime = () => {
    if (isPlaying) {
      const newValue = { ...timer, seconds: timer.seconds - 1 }
      setTimer(newValue)
      console.log(timer);
    } else {
      return;
    }
  }

  //Play & Stop functions
  const playTimer = () => {
    const newValue = { ...timer, isPlaying: !isPlaying }
    setTimer(newValue)
  }

  const stopTimer = () => {
    const newValue = { ...timer, seconds: 0, isPlaying: false }
    setTimer(newValue)
    console.log("Timer was stopped");
  }

  const resetTimer = () => {
    // const newValue = { ...timer, seconds: 0, isPlaying: false }
    setTimer(defaultValues)
    setIsFinish(false)
    console.log("Timer was reset");
  }

  //Finish Pomodoro Component
  const FinishTimer = () => {
    return (
      <div>
        <span>Timer finished</span>
        <button onClick={() => resetTimer()}>Close</button>
      </div>
    )
  }

  return (
    <div className="pomodoro-fullbar-container">
      <div className="pomodoro-timer">
        <div className="timer-clock-full">
          {
            9 >= seconds > 1 ? <span className="timer-text">{`0${seconds}`}</span> :
              <span className="timer-text-full">{`${seconds}`}</span>
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
      <div className="pomodoro-task">
        <ListTimerTask />
        {/* <div className="listTask-timer">
          <div className="listTask-title">
            <input className="default-checkboxList" type="checkbox" />
            <span className="checkmarkList"></span>
            <div className="text-container">
              <span className="list-text">Title of task pretty long asadasdadadasdaasdsadasdada asadasdadadasdaasdsadasdada asadasdadadasdaasdsadasdada asadasdadadasdaasdsadasdada</span>
            </div>
          </div>
          <div className="listTask-details">
            <span>0/?</span>
            <button className="details-task-btn" >
              <img className="details-task-img" src={details} alt="" />
            </button>
          </div>
        </div> */}
        <div className="add-task-timer">
          <span className="add-timerText">Add Task</span>
        </div>
      </div>
    </div>
  )
}
export default Timer
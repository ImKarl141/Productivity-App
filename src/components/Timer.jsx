import { useEffect, useState } from "react"
import { PlayPauseIcon, StopIcon, ResetTimer, CoffeeIcon, AddTaskTimerIcon, TaskDetailsIcon, PomodoroIcon } from "../icons"
import timerMini from '../images/timer-stage2-icon.svg'
import details from '../images/kebab.svg'
import ListTimerTask from "./Timer/ListTimerTask"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { SetTaskList } from "../features/taskSlice"
import ListTimerAdd from "./Timer/ListTimerAdd"
import ListTimerEdit from "./Timer/ListTimerEdit"
import TimerClock from "./Timer/TimerClock"



const Timer = () => {
  const { dbTasks } = useSelector((store) => store.task);
  const { isTimerTaskEdit } = useSelector((store) => store.timer);
  const dispatch = useDispatch();

  // console.log(amountHours);

  // let Hours = 0;

  // const amount = dbTasks.reduce((total, obj) => total + obj.focus_amount, -1)
  // let amountHours = 0

  //Display the amount of pomodoros in the current list of items
  const amountHours = dbTasks.reduce((acc, currentObj) => acc + currentObj.focus_amount, 0)

  const now = new Date();
  const hour = 12;
  const minute = 10;
  const amPm = "am"
  // console.log(hour);
  // console.log(amountHour);

  // for (const task of dbTasks) {
  //   amountHours += task.focus_amount;
  //   console.log(task);
  // }


  // useEffect(() => {
  //   const focusAmount = async () => {
  //     try {
  //       await axios.get("http://")
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   focusAmount();
  // }, [])


  const [defaultValues, setDefaultValues] = useState({
    hours: '00',
    minutes: '00',
    seconds: 300,
    isPlaying: false,
  });

  const [timer, setTimer] = useState({
    hours: '00',
    minutes: '00',
    seconds: 300,
    isPlaying: false,
  });

  const [pomodoro, setPomodoro] = useState({
    current: 0,
    finished: 3,
  })
  // const amountHours = pomodoro.finished * 2


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

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const resp = await axios.get("http://localhost:8800/TaskCurrent")
        // setDbTasks(resp.data)
        dispatch(SetTaskList(resp.data))
      } catch (err) {
        console.log(err);
      }
    }
    fetchTaskList();
  }, [])

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
      <div className="timer-container">
        <TimerClock />
        {/* <div className="pomodoro-timer">
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
        </div> */}
        <div className="current-focus-task">
          {/*Show the title only when an task is selected in the list*/}
          <div className="current-focus-title">
            <span>Current task: </span>
            <span className="focus-title">Title of the task</span>
          </div>
          <span className="pomo-container"><PomodoroIcon /> #1</span>
        </div>
        <div className="pomodoro-task">
          {
            isTimerTaskEdit && (
              <ListTimerEdit />
            )
          }
          <ListTimerTask />
          <ListTimerAdd />
        </div>
      </div>
      {/* <div className="pomodoro-timer">
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
        <ListTimerEdit />
      </div> */}
      <div className="pomodoro-stats">
        <span>Total Pomos: 0/{amountHours}</span>
        <span>|</span>
        <span>Finishing at: {hour}:{minute}{amPm} {amountHours * 0.5} hours</span>
      </div>
    </div>
  )
}
export default Timer
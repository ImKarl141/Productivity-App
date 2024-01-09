import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TimerSettings, ResetTimer, SkipFullIcon } from "../../icons"
import { useTimer } from "./useTimer"
import { ShowTimerSettings } from "../../features/timerSlice"
import TimerClockSettings from "./TimerClockSettings"
import PlaySound from '../../assets/play_Button.wav'
import StopSound from '../../assets/stop_Button.wav'
import FinishTimer from '../../assets/clockDigital_Alarm.mp3'
import axios from "axios"
import { SetTaskList } from "../../features/taskSlice"
import CountdownTimer from "./CountdownTimer"


const TimerClock = () => {
  const { isTimerSettings, isEnglish, soundVolume, dbTimer, currentTimerTask } = useSelector((store) => store.timer)
  const { dbTasks } = useSelector((store) => store.task)
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;
  const dispatch = useDispatch()

  const playSound = new Audio(PlaySound);
  const stopSound = new Audio(StopSound);
  const finishTimer = new Audio(FinishTimer);


  const [defaultValues, setDefaultValues] = useState({
    minutes: 25,
    seconds: 0,
    short: 5,
    long: 15,
    amount: 0,
    setLong: 4,
    isPlaying: false,
    isShortRest: true,
    isLongRest: false,
    current_task: '',
    task_id: undefined
  });

  const [shortRest, setShortRest] = useState(false)
  const [longRest, setLongRest] = useState(false)

  const [timer, setTimer] = useState({
    minutes: 28,
    seconds: 0,
    short: 5,
    long: 15,
    amount: 0,
    setLong: 4,
    isPlaying: false,
    isShortRest: true,
    isLongRest: false,
    current_task: '',
    task_id: undefined
  });


  useEffect(() => {
    const fetchTimerSettings = async () => {
      try {
        const respTimer = await axios.get("https://todo-api-teal.vercel.app/UserSettings")
        const newSetting = respTimer.data.find(setting => setting.id === 1)
        setTimer({
          ...timer,
          minutes: newSetting.focus,
          short: newSetting.short,
          long: newSetting.long,
          amount: newSetting.amount,
          setLong: newSetting.setLong,
          current_task: newSetting.current_task,
          task_id: newSetting.task_id
        })
        setDefaultValues({
          ...defaultValues,
          minutes: newSetting.focus,
          short: newSetting.short,
          long: newSetting.long,
          amount: newSetting.amount,
          setLong: newSetting.setLong,
          current_task: newSetting.current_task,
          task_id: newSetting.task_id
        })
      } catch (err) {
        console.log(err);
      }
    }
    fetchTimerSettings();
  }, [dbTimer])

  const { minutes, seconds, short, long, isPlaying, isShortRest, isLongRest, amount, current_task, task_id } = timer;
  const [isFinish, setIsFinish] = useState(false)

  useTimer(() => {
    updateTime()
  },
    isPlaying ? 1000 : null
  )

  const updateTime = () => {
    if (isPlaying) {
      if (minutes >= 1) {
        if (seconds >= 1) {
          setTimer({ ...timer, seconds: timer.seconds - 1 });
        } else {
          setTimer({ ...timer, minutes: timer.minutes - 1, seconds: 59 });
        }
      } else {
        if (seconds >= 1) {
          setTimer({ ...timer, seconds: timer.seconds - 1 });
        } else {
          setTimer({ ...timer, isPlaying: !isPlaying, minutes: short, isShortRest: false })
          shortRest || longRest ? () => { setShortRest(false); setLongRest(false) } : restTimer();
          finishTimer.play();
          myAlert();
        }
      }
    } else {
      return;
    }
  }



  const myAlert = () => {
    alert("Finished")
  }


  const handleTaskPomo = async () => {
    if (dbTasks.length >= 1) {
      const focus_finished = dbTasks.find(task => task.id === task_id).focus_finished
      try {
        await axios.patch("https://todo-api-teal.vercel.app/TaskCurrent/AddPomo/" + task_id, { focus_finished: focus_finished + 1 })
        const newTask = dbTasks.map((task) => {
          if (task.id === task_id) {
            return { ...task, focus_finished: focus_finished + 1 }
          }
          return { ...task }
        })
        dispatch(SetTaskList(newTask))
      } catch (err) {
        console.log(err);
      }
    }
  }

  //Clock's buttons 
  //Start and pause timer
  const playTimer = () => {
    if (!isPlaying) {
      playSound.play();
      playSound.volume = 0.8;
    }
    const newValue = { ...timer, isPlaying: !isPlaying }
    setTimer(newValue)
  }

  //Skip to next restTimer
  const restTimer = () => {
    handleTaskPomo();
    if (amount < 4) {
      const newValue = { ...timer, minutes: short, seconds: 0, isPlaying: false, isShortRest: false, amount: amount + 1 }
      setShortRest(true)
      setTimer(newValue)
    } else {
      const newValue = { ...timer, minutes: long, seconds: 0, isPlaying: false, isShortRest: false, amount: 0 }
      setTimer(newValue)
    }
  }

  const stopTimer = () => {
    stopSound.play();
    stopSound.volume = 0.8;
    setShortRest(false)
    setLongRest(false)
    const newValue = { ...timer, minutes: 0, seconds: 0, isPlaying: false }
    setTimer(newValue)
    setIsFinish(true)
    console.log("Timer was stopped");
    alert("Timer was stopped")
  }

  const resetTimer = () => {
    setTimer({ ...defaultValues, short: short, long: long, amount: amount, current_task: current_task, task_id: task_id })

    setShortRest(false)
    setLongRest(false)

    setIsFinish(false)
    console.log(timer);
    console.log("Timer was reset");
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + (minutes * 60));


  return (
    <>
      <div className={(Task || Notes) ? "pomodoro-timerMini" : "pomodoro-timer"}>
        {
          isTimerSettings && <TimerClockSettings />
        }
        {
          !isPlaying && (
            <button className={(Notes || Task) ? "hide-element" : "timerSettings-btn"} onClick={() => dispatch(ShowTimerSettings())}>
              <TimerSettings />
            </button>
          )
        }
        <div className={(Task || Notes) ? "timer-clock-mini" : "timer-clock-full"} style={{ backgroundColor: shortRest ? "var(--restColor)" : "var(--white)" }}>
          <span className="clock-effect-1">
            <span className="clock-effect-line"></span>
          </span>
          <span className="clock-effect-2">
            <span className="clock-effect-line"></span>
          </span>
          <span className="clock-effect-3">
            <span className="clock-effect-line"></span>
          </span>
          <span className="clock-effect-4">
            <span className="clock-effect-line"></span>
          </span>
          {
            !isPlaying && (
              (Task || Notes) ?
                <>
                  {
                    minutes <= 9 ? <span className="timer-text-mini">{`0${minutes}`}</span> :
                      <span className="timer-text-mini">{`${minutes}`}</span>
                  }
                </>
                :
                <>
                  {
                    minutes <= 9 ? <span className="timer-text-full">{`0${minutes}:`}</span> :
                      <span className="timer-text-full">{`${minutes}:`}</span>
                  }
                  {
                    seconds <= 9 ? <span className="timer-text-full">{`0${seconds}`}</span> : <span className="timer-text-full">{`${seconds}`}</span>
                  }
                </>
            )
          }
          {
            isPlaying && <CountdownTimer expiryTimestamp={time} />
          }
          {
            (Task || Notes) ?
              <>
                <div className="tick-main">
                  <span className="tick-verticalMini-main"></span>
                  <div className="tick-container">
                    <span className="tick-horizontalMini-main"></span>
                    <span className="tick-horizontalMini-main"></span>
                  </div>
                  <span className="tick-verticalMini-main"></span>
                </div>
                <div className="tick">
                  <span className="tick-verticalMini"></span>
                  <div className="tick-container">
                    <span className="tick-horizontalMini"></span>
                    <span className="tick-horizontalMini"></span>
                  </div>
                  <span className="tick-verticalMini"></span>
                </div>
              </>
              :
              <>
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
              </>
          }
          <div className={(Task || Notes) ? "timer-btn-mini" : "timer-btn-full"}>
            {
              isFinish && (
                <>
                  <button className={(Task || Notes) ? "start-button-mini " : "hide-element"} title="Start timer mini" onClick={() => resetTimer()}>
                    Reset
                  </button>
                  <button className={(!Task && !Notes) ? "play-buttons-full" : "hide-element"} title="Reset" onClick={() => resetTimer()}>
                    <ResetTimer />
                  </button>
                </>
              )
            }
            {
              !isPlaying &&
              <>
                {
                  !isFinish && (
                    <>
                      <button className={(!Task && !Notes) ? "start-buttons-full" : "hide-element"} title="Start timer" onClick={() => playTimer()}>
                        START
                      </button>
                      <button className={(Task || Notes) ? "start-button-mini " : "hide-element"} title="Start timer mini" onClick={() => playTimer()}>
                        START
                      </button>
                    </>
                  )
                }
              </>
            }
            {
              isShortRest
                ?
                <>
                  <button className={(!Task && !Notes) ? "play-buttons-full" : "hide-element"} title="Short rest" onClick={() => restTimer()}>
                    <SkipFullIcon />
                  </button>

                </>
                : <button className={(!Task && !Notes) ? "play-buttons-full" : "hide-element"} title="Stop timer" onClick={() => stopTimer()}>
                  <SkipFullIcon />
                </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default TimerClock
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TimerSettings, PlayPauseFullIcon, PlayPauseMiniIcon, ResetTimer, SkipFullIcon, SkipMiniIcon, NumberDownIcon, NumberUpIcon } from "../../icons"
import { useTimer } from "./useTimer"
import { ShowTimerSettings, ToggleLanguage, SetTimerSettings } from "../../features/timerSlice"
import TimerClockSettings from "./TimerClockSettings"
import PlaySound from '../../assets/play_Button.wav'
import StopSound from '../../assets/stop_Button.wav'
import FinishTimer from '../../assets/clockDigital_Alarm.mp3'
import axios from "axios"



const TimerClock = () => {
  const { isTimerSettings, isEnglish, soundVolume, dbTimer } = useSelector((store) => store.timer)
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;
  // console.log(isEnglish);
  const dispatch = useDispatch()

  const playSound = new Audio(PlaySound);
  const stopSound = new Audio(StopSound);
  const finishTimer = new Audio(FinishTimer);


  //Default values to load then timer is reset
  const [defaultValues, setDefaultValues] = useState({
    minutes: 15,
    seconds: 0,
    isPlaying: false,
  });


  //Values for timer clock
  // const [timer, setTimer] = useState({
  //   minutes: 25,
  //   seconds: 0,
  //   isPlaying: false,
  // });
  const [timer, setTimer] = useState({
    minutes: 25,
    seconds: 0,
    isPlaying: false,
  });


  useEffect(() => {
    const fetchTimerSettings = async () => {
      try {
        const respTimer = await axios.get("http://localhost:8800/UserSettings")
        const newSetting = respTimer.data.find(setting => setting.id === 1)
        setTimer({ ...timer, minutes: newSetting.focus })
        setDefaultValues({ ...defaultValues, minutes: short })
        //Timer
      } catch (err) {
        console.log(err);
      }
    }
    fetchTimerSettings();
  }, [dbTimer])

  const [timerInput, setTimerInput] = useState({
    focus: 2,
    short: 5,
    long: 15,
  })

  const { focus, short, long } = timerInput

  const { minutes, seconds, isPlaying } = timer;
  const [isFinish, setIsFinish] = useState(false)

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
          setIsFinish(true);
          finishTimer.play();
          //Activate Notification when timer is finished 
          myAlert();
        }
      }
    } else {
      return;
    }
  }
  // const soundVolume = useRef(1)

  // const handleVolume = (e) => {
  //   soundVolume.current = e.target.value / 100
  //   console.log(soundVolume.current);
  // }

  const myAlert = () => {
    // console.log("Timer finished");
    alert("Finished")
    // resetTimer();
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

  //Set all the values to 0
  const stopTimer = () => {
    stopSound.play();
    stopSound.volume = 0.8;
    // if (isPlaying) {
    // }
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
    <div>
      {
        (Task || Calendar || Notes) ?
          <div className="pomodoro-timerMini">
            <div className="timer-clock-mini">
              {
                minutes <= 9 ? <span className="timer-text-mini">{`0${minutes}`}</span> :
                  <span className="timer-text-mini">{`${minutes}`}</span>
              }
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
            </div>
            <div className="timer-btn-mini">
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
                    <PlayPauseFullIcon />
                  </button>
                )
              }
              <button className='play-buttons-full' title="Stop" onClick={() => stopTimer()}>
                <SkipFullIcon />
              </button>
            </div>
          </div>
          :
          <div className="pomodoro-timer">
            {/* <input className="volume-timer" type="range" onChange={handleVolume} /> */}
            {
              isTimerSettings && <TimerClockSettings />
            }
            <button className="timerSettings-btn" onClick={() => dispatch(ShowTimerSettings())}>
              <TimerSettings />
            </button>
            <div className="timer-clock-full">
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
                      <PlayPauseFullIcon />
                    </button>
                  )
                }
                <button className='play-buttons-full' title="Stop" onClick={() => stopTimer()}>
                  <SkipFullIcon />
                </button>
              </div>
            </div>
          </div>
      }
    </div>

  )
}
export default TimerClock
import { useDispatch, useSelector } from "react-redux"
import { NumberDownIcon, NumberUpIcon, CloseTimerSettings } from "../../icons"
import { useState } from "react"
import { ShowTimerSettings, SetSoundVolume, SetTimerSettings, SetIsSettingsChange } from "../../features/timerSlice"
import GuitarSound from '../../assets/guitar_Notification.mp3'
import TimerSound from '../../assets/timer_Notification.ogg'
import EraseSound from '../../assets/erase_Notification.wav'
import axios from "axios"

const TimerClockSettings = () => {
  const { isTimerSettings, isEnglish, soundVolume, dbTimer } = useSelector((store) => store.timer);
  const dispatch = useDispatch();

  const [timerInput, setTimerInput] = useState({
    focus: dbTimer.focus,
    short: dbTimer.short,
    long: dbTimer.long,
  })

  const [myVolume, setSoundVolume] = useState(soundVolume)

  const { focus, short, long } = timerInput

  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleSettingsSubmit = async () => {
    const id = 1;
    showMessage("settings")
    try {
      await axios.patch("https://todo-api-teal.vercel.app/UserSettings/" + id, timerInput)
      dispatch(SetTimerSettings({ ...dbTimer, focus: focus, short: short, long: long }))
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeNumber = (e) => {
    if (e.target.value) {
      setTimerInput((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    } else {
      setTimerInput((prev) => ({ ...prev, [e.target.name]: 1 }))
    }
  }

  const increaseNumber = (name) => {
    if (name === "focus") {
      setTimerInput({ ...timerInput, focus: focus + 1 })
    } else if (name === "short") {
      setTimerInput({ ...timerInput, short: short + 1 })
    } else if (name === "long") {
      setTimerInput({ ...timerInput, long: long + 1 })
    }
  }

  const decreaseNumber = (name) => {
    if (name === "focus" && focus > 1) {
      setTimerInput({ ...timerInput, focus: focus - 1 })
    } else if (name === "short" && short > 1) {
      setTimerInput({ ...timerInput, short: short - 1 })
    } else if (name === "long" && long > 1) {
      setTimerInput({ ...timerInput, long: long - 1 })
    }
  }

  const handleSound = (e) => {
    if (e.target.value === "EraseSound") {
      const sound = new Audio(EraseSound);
      sound.play()
      sound.volume = myVolume
    } else if (e.target.value === "TimerSound") {
      const sound = new Audio(TimerSound);
      sound.play()
      sound.volume = myVolume
    } else if (e.target.value === "GuitarSound") {
      const sound = new Audio(GuitarSound);
      sound.play()
      sound.volume = myVolume
    }
  }

  const handleSoundVolume = (e) => {
    setSoundVolume(e.target.value / 100)
  }



  return (
    <div className="timerAmount-container" onClick={() => dispatch(ShowTimerSettings())}>
      <div className="timerSettings" onClick={(e) => e.stopPropagation()}>
        <span onClick={() => {
          dispatch(ShowTimerSettings())
          dispatch(SetSoundVolume(myVolume))
          handleSettingsSubmit();
          dispatch(SetIsSettingsChange())
        }}>
          <CloseTimerSettings />
        </span>
        <div className="timerAmount">
          {isEnglish ? <span className="timerAmount-title">Time (Minutes)</span> : <span className="timerAmount-title">Tiempo (Minutos)</span>}
          <div className="timerLabel-container">
            <label className="timer-label">
              {isEnglish ? <span className="timerAmount-text">Focus</span> : <span className="timerAmount-text">Enfoque</span>}
              <div className="details-number">
                <input
                  name="focus"
                  className="taskTimer-number"
                  type="number"
                  min={0}
                  step={1}
                  value={focus}
                  onChange={handleChangeNumber}
                />
                <div className="details-numberUpDown">
                  <button
                    type="button"
                    onClick={() => increaseNumber("focus")}>
                    <NumberUpIcon />
                  </button>
                  <button
                    type="button"
                    name="focus"
                    onClick={() => decreaseNumber("focus")}
                  >
                    <NumberDownIcon />
                  </button>
                </div>
              </div>
            </label>
            <label className="timer-label">
              <span className="timerAmount-text">Short Break</span>
              <div className="details-number">
                <input
                  name="short"
                  className="taskTimer-number"
                  type="number"
                  min={0}
                  step={1}
                  value={short}
                  onChange={handleChangeNumber}
                />
                <div className="details-numberUpDown">
                  <button
                    type="button"
                    onClick={() => increaseNumber("short")}>
                    <NumberUpIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => decreaseNumber("short")}
                  >
                    <NumberDownIcon />
                  </button>
                </div>
              </div>
            </label>
            <label className="timer-label">
              <span className="timerAmount-text">Long Break</span>
              <div className="details-number">
                <input
                  name="long"
                  className="taskTimer-number"
                  type="number"
                  min={0}
                  step={1}
                  value={long}
                  onChange={handleChangeNumber}
                />
                <div className="details-numberUpDown">
                  <button
                    type="button"
                    onClick={() => increaseNumber("long")}>
                    <NumberUpIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => decreaseNumber("long")}
                  >
                    <NumberDownIcon />
                  </button>
                </div>
              </div>
            </label>

          </div>
        </div>
        <div className="timerSound">
          <span className="timerAmount-title">Sound</span>
          <div className="alarm-sound">
            <span className="timerAmount-text">Alarm Sound</span>
            <select
              className="sound-select"
              onChange={handleSound}
              defaultValue={''}
            >
              <option value="EraseSound">Erase</option>
              <option value="TimerSound">Timer</option>
              <option value="GuitarSound">Guitar</option>
            </select>
            <input
              className="volume-slide"
              type="range"
              defaultValue={myVolume * 100}
              onChange={handleSoundVolume}
            />
            <span>{Math.round(myVolume * 100)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TimerClockSettings
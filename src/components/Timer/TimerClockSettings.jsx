import { useDispatch, useSelector } from "react-redux"
import { TimerSettings, PlayPauseIcon, ResetTimer, StopIcon, NumberDownIcon, NumberUpIcon, CloseTimerSettings } from "../../icons"
import { useState } from "react"
import { ShowTimerSettings } from "../../features/timerSlice"


const TimerClockSettings = () => {
  const { isTimerSettings, isEnglish } = useSelector((store) => store.timer);
  const dispatch = useDispatch();


  const [timerInput, setTimerInput] = useState({
    focus: 25,
    short: 5,
    long: 15,
  })

  const { focus, short, long } = timerInput

  const handleChangeNumber = (e) => {
    if (e.target.value) {
      setTimerInput((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    } else {
      setTimerInput((prev) => ({ ...prev, [e.target.name]: 1 }))
    }
  }

  const increaseNumber = (name) => {
    // const amount = focus_amount;
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


  return (
    <div className="timerAmount-container">
      <div className="timerSettings">
        <span onClick={() => dispatch(ShowTimerSettings())}>
          <CloseTimerSettings />
        </span>
        <div className="timerAmount">
          {isEnglish ? <span>Time (Minutes)</span> : <span>Tiempo (Minutos)</span>}
          <div className="timerLabel-container">
            <label className="timer-label">
              {isEnglish ? <span>Focus</span> : <span>Enfoque</span>}
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
                    // name="focus"
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
              Short Break
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
              Long Break
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
          <span>Sound</span>
          <div className="alarm-sound">
            <span>Alarm Sound</span>
            <select name="" id="">
              <option value="">Clock</option>
              <option value="">Bell</option>
              <option value="">Chicken</option>
            </select>
          </div>
        </div>
        {/* <button onClick={() => dispatch(ToggleLanguage())}>Change language</button> */}
      </div>
    </div>
  )
}
export default TimerClockSettings
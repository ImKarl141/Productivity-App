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
import { SetCurrentTimerTask } from "../features/timerSlice"

const Timer = () => {
  const { dbTasks } = useSelector((store) => store.task);
  const { isTimerTaskEdit, currentTimerTask } = useSelector((store) => store.timer);
  const dispatch = useDispatch();
  const temporalText = "Task title"

  //Get the focus_amount of every task
  const amountHours = dbTasks.reduce((acc, currentObj) => acc + currentObj.focus_amount, 0)

  const now = new Date();
  const hour = 12;
  const minute = 10;
  const amPm = "am"

  //Task fetching
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

  return (
    <div className="pomodoro-fullbar-container">
      <div className="timer-container">
        <TimerClock />
        <div className="current-focus-task">
          <span className="pomo-container"><PomodoroIcon /> #1</span>
          {/*Show the title only when an task is selected in the list*/}
          <div className="current-focus-title">
            {currentTimerTask && <span>Current task: {currentTimerTask}</span>}
            {/* <span className="focus-title">Title of the task</span> */}
            <img className="details-timer-img" src={details} alt="" />
          </div>
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
      <div className="pomodoro-stats">
        <span>Total Pomos: 0/{amountHours}</span>
        <span>|</span>
        <span>Finishing at: {hour}:{minute}{amPm} {amountHours * 0.5} hours</span>
      </div>
    </div>
  )
}
export default Timer
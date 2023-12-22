import { useEffect, useState } from "react"
import { PlayPauseIcon, StopIcon, ResetTimer, CoffeeIcon, AddTaskTimerIcon, TaskDetailsIcon, PomodoroIcon, ClearAllTasksIcon, ClearFinishedTasksIcon } from "../icons"
import timerMini from '../images/timer-stage2-icon.svg'
import details from '../images/kebab.svg'
import ListTimerTask from "./Timer/ListTimerTask"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { SetTaskList, ClearAllTasks, ClearFinishedTasks } from "../features/taskSlice"
import ListTimerAdd from "./Timer/ListTimerAdd"
import ListTimerEdit from "./Timer/ListTimerEdit"
import TimerClock from "./Timer/TimerClock"
import { SetCurrentTimerTask, SetTimerTaskSettings } from "../features/timerSlice"
import MiniBarTimer from "./MiniBarTimer"

const Timer = () => {
  const { dbTasks } = useSelector((store) => store.task);
  const { isTimerTaskEdit, currentTimerTask, isTimerTaskSettings } = useSelector((store) => store.timer);
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;
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


  const clearFinished = () => {
    const finishedTaskId = dbTasks.filter(task => task.is_checked == true)
    finishedTaskId.map((task) => {
      handleClearFinished(task.id);
    })
    const newTask = dbTasks.filter((task) => {
      if (!task.is_checked) {
        return { ...task }
      } else {
        return
      }
    })
    dispatch(SetTaskList(newTask))
  }
  const handleClearFinished = async (id) => {
    try {
      await axios.delete("http://localhost:8800/TaskCurrent/" + id)
    } catch (err) {
      console.log();
    }
  }


  const handleClearAll = async () => {
    // console.log("All tasks deleted");
    try {
      await axios.post("http://localhost:8800/TaskCurrent/ClearAll")
      dispatch(SetTaskList([]))
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div>
      {
        (Task || Calendar || Notes) ?
          // <MiniBarTimer />
          <div className="pomodoro-fullbarMini-container">
            <div className="timerMini-container">
              <TimerClock />
              <div className="current-focus-task">
                <span className="pomo-container"><PomodoroIcon /> #1</span>
                {/*Show the title only when an task is selected in the list*/}
                <div className="current-focus-title">
                  {currentTimerTask && <span className="currentTask">Current task: {currentTimerTask}</span>}
                </div>
              </div>
            </div>
          </div>
          :
          <div className="pomodoro-fullbar-container">
            <div className="timer-container">
              <TimerClock />
              <div className="current-focus-task">
                <span className="pomo-container"><PomodoroIcon /> #1</span>
                {/*Show the title only when an task is selected in the list*/}
                <div className="current-focus-title">
                  {currentTimerTask && <span className="currentTask">Current task: {currentTimerTask}</span>}
                  {/* <span className="focus-title">Title of the task</span> */}
                  <img className="details-timer-img" src={details} alt="" onClick={() => dispatch(SetTimerTaskSettings())} />
                  {
                    isTimerTaskSettings && (
                      <div className="timerTaskSettings-container">
                        {/* <div className="timerTaskSettingsTitle">
                          <span>Clear</span>
                        </div> */}
                        <div className="timerTaskSettings" onClick={() => clearFinished()}>
                          <ClearFinishedTasksIcon />
                          <span>Clear Finished Tasks</span>
                        </div>
                        <div className="timerTaskSettings" onClick={() => handleClearAll()}>
                          <ClearAllTasksIcon />
                          <span>Clear All tasks</span>
                        </div>
                      </div>
                    )
                  }
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
      }
    </div>
  )
}
export default Timer
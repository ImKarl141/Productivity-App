import { useEffect, useRef, useState } from "react"
import { PomodoroIcon, ClearAllTasksIcon, ClearFinishedTasksIcon } from "../icons"
import timerMini from '../images/timer-stage2-icon.svg'
import details from '../images/kebab.svg'
import ListTimerTask from "./Timer/ListTimerTask"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { SetTaskList, ClearAllTasks, ClearFinishedTasks } from "../features/taskSlice"
import ListTimerAdd from "./Timer/ListTimerAdd"
import ListTimerEdit from "./Timer/ListTimerEdit"
import TimerClock from "./Timer/TimerClock"
import { SetCurrentTimerTask, SetTimerTaskSettings, SetTimerSettings } from "../features/timerSlice"
import MiniBarTimer from "./MiniBarTimer"

const Timer = () => {
  const { dbTasks } = useSelector((store) => store.task);
  const { isTimerTaskEdit, currentTimerTask, isTimerTaskSettings, dbTimer } = useSelector((store) => store.timer);
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;
  const dispatch = useDispatch();
  const temporalText = "Task title"

  const current_task = dbTimer.current_task


  // $(`.listTask-timer:contains()`)



  // useEffect(() => {
  //   if (currentProjectView || currentTagView) {
  //     $(`.task-item-overall-container`).show()
  //     $(`.task-item-overall-container:not(:contains(${currentProjectView}))`).hide()
  //     $(`.task-item-overall-container:not(:contains(${currentTagView}))`).hide()

  //   } else (
  //     $(`.task-item-overall-container`).show()
  //   )
  // }, [currentProjectView, currentView, currentTagView])

  // console.log(dbTimer);

  // const { focus } = dbTimer;

  //Get the focus_amount of every task
  const amountHours = dbTasks.reduce((acc, currentObj) => acc + currentObj.focus_amount, 0)

  // const hour = 12;
  // const minute = 10;
  // const amPm = "am"
  const now = new Date();

  const [currentTime, setCurrentTime] = useState({
    hours: now.getHours(),
    minutes: now.getHours(),
    ampm: 'am'
  })

  const { hours, minutes, ampm } = currentTime

  //Task fetching
  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        //Timer
        const respTimer = await axios.get("http://localhost:8800/UserSettings")
        const newSetting = respTimer.data.find(setting => setting.id === 1)
        dispatch(SetTimerSettings(newSetting))

        //Task
        const resp = await axios.get("http://localhost:8800/TaskCurrent")
        dispatch(SetTaskList(resp.data))

      } catch (err) {
        console.log(err);
      }
    }
    fetchTaskList();
  }, [])



  //Task fetching
  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const resp = await axios.get("http://localhost:8800/UserSettings")
  //       const newSetting = resp.data.find(setting => setting.id === 1)
  //       dispatch(SetTimerSettings(newSetting))
  //       // console.log(newSetting);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchSettings();
  // }, [])


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
                  {current_task && <span className="currentTask">Current task: {current_task}</span>}
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
                  {current_task && <span className="currentTask">Current task: {current_task}</span>}
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
              <span>Total Pomodoros: 0/{amountHours}</span>
              <span>|</span>
              {/* <span>Finishing in: {hours}:{minutes <= 9 ? `0${minutes}` : minutes}{ampm} {amountHours * 0.5} hours</span> */}
              <span>Finishing in: {amountHours * 0.5} hours</span>
            </div>
          </div>
      }
    </div>
  )
}
export default Timer
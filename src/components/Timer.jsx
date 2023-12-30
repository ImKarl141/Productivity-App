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
import { SetCurrentTimerTask, SetTimerTaskSettings, SetTimerSettings, SetLastTaskId } from "../features/timerSlice"
import MiniBarTimer from "./MiniBarTimer"

const Timer = () => {
  const { dbTasks } = useSelector((store) => store.task);
  const { isTimerTaskEdit, currentTimerTask, isTimerTaskSettings, dbTimer } = useSelector((store) => store.timer);
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;
  const dispatch = useDispatch();
  const temporalText = "Task title"

  // const current_task = dbTimer.current_task

  const { current_task, PomoCount } = dbTimer

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
    const settingsId = 1;
    const myId = 0;
    const lastId = dbTasks.length > 0 ? dbTasks[dbTasks.length - 1].id : 0;
    dispatch(SetLastTaskId(lastId))
    try {
      await axios.delete("http://localhost:8800/TaskCurrent/" + id)
      await axios.patch("http://localhost:8800/UserSettings/ClearCurrentTask/" + settingsId, { current_task: null, task_id: myId })
      dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: myId }))
      // const nextId = dbTasks.length > 0 ? dbTasks[dbTasks.length - 1].id : dbTimer.task_id;
      // dispatch(AddNewTask({ ...timerInput, id: nextId + 1 }))
    } catch (err) {
      console.log();
    }
  }

  const handleClearAll = async () => {
    const settingsId = 1;
    const id = 0;
    try {
      await axios.post("http://localhost:8800/TaskCurrent/ClearAll")
      await axios.patch("http://localhost:8800/UserSettings/ClearCurrentTask/" + settingsId, { current_task: null, task_id: id })
      dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: id }))
      dispatch(SetTaskList([]))
      dispatch(SetLastTaskId(undefined))
    } catch (err) {
      console.log(err);
    }
  }

  // const handleClearAll = async () => {
  //   const id = 0;
  //   const settingsId = 1
  //   // console.log("All tasks deleted");
  //   try {
  //     await axios.post("http://localhost:8800/TaskCurrent/ClearAll")
  //     await axios.patch("http://localhost:8800/UserSettings/ClearCurrentTask/" + settingsId, { current_task: null, task_id: id })
  //     //Update UserSettings
  //     dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: id }))
  //     dispatch(SetTaskList([]))
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleTimerTaskSettings = (e) => {
    dispatch(SetTimerTaskSettings())
    if (isTimerTaskSettings) {
      addEventListener('click', console.log(e.target.className))
    }
  }


  return (
    <div className={(Task || Notes) ? "pomodoro-fullbarMini-container" : "pomodoro-fullbar-container"}>
      {(!Task && !Notes) ?
        <>
          <div className="timer-container">
            <TimerClock />
            <div className="current-focus-task">
              <span className="pomo-container"><PomodoroIcon />#{PomoCount}</span>
              {/*Show the title only when an task is selected in the list*/}
              <div className="current-focus-title">
                {current_task && <span className="currentTask">Current task: {current_task}</span>}
                {/* <span className="focus-title">Title of the task</span> */}
                <img className="details-timer-img" src={details} alt="" onClick={handleTimerTaskSettings} />
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
            <span>Finishing in: {amountHours * 0.5} hours</span>
          </div>
        </>
        :
        <div className="timerMini-container">
          <TimerClock />
          {current_task &&
            <div className="currentTask-mini">
              <span>Current task:</span>
              <span className="currentTask-title">{current_task}</span>
            </div>
          }
          <div className="left-clock-container">
            <div className="pomodoro-amount-container">
              <PomodoroIcon />
              <span className="pomo-container">
                #{1}
              </span>
            </div>
            <div className="task-amount-container">
              <span className="task-amount-text">0</span>
              <span>/</span>
              <span className="task-amount-text">1</span>
            </div>
          </div>
        </div>
      }
    </div>
    // <div>
    //   <div className={(Task || Calendar || Notes) ? "pomodoro-fullbar-container" : "pomodoro-fullbarMini-container"}>
    //     <div className="timer-container">
    //       <TimerClock />
    //       <div className="current-focus-task">
    //         <span className="pomo-container"><PomodoroIcon /> #1</span>
    //         {/*Show the title only when an task is selected in the list*/}
    //         <div className="current-focus-title">
    //           {current_task && <span className="currentTask">Current task: {current_task}</span>}
    //           {/* <span className="focus-title">Title of the task</span> */}
    //           <img className="details-timer-img" src={details} alt="" onClick={handleTimerTaskSettings} />
    //           {
    //             isTimerTaskSettings && (
    //               <div className="timerTaskSettings-container">
    //                 {/* <div className="timerTaskSettingsTitle">
    //                       <span>Clear</span>
    //                     </div> */}
    //                 <div className="timerTaskSettings" onClick={() => clearFinished()}>
    //                   <ClearFinishedTasksIcon />
    //                   <span>Clear Finished Tasks</span>
    //                 </div>
    //                 <div className="timerTaskSettings" onClick={() => handleClearAll()}>
    //                   <ClearAllTasksIcon />
    //                   <span>Clear All tasks</span>
    //                 </div>
    //               </div>
    //             )
    //           }
    //         </div>
    //       </div>
    //       <div className="pomodoro-task">
    //         {
    //           isTimerTaskEdit && (
    //             <ListTimerEdit />
    //           )
    //         }
    //         <ListTimerTask />
    //         <ListTimerAdd />
    //       </div>
    //     </div>
    //     <div className="pomodoro-stats">
    //       <span>Total Pomodoros: 0/{amountHours}</span>
    //       <span>|</span>
    //       {/* <span>Finishing in: {hours}:{minutes <= 9 ? `0${minutes}` : minutes}{ampm} {amountHours * 0.5} hours</span> */}
    //       <span>Finishing in: {amountHours * 0.5} hours</span>
    //     </div>
    //   </div>

    //   {/* {
    //     (Task || Calendar || Notes) ?
    //       <div className="pomodoro-fullbarMini-container">
    //         <div className="timerMini-container">
    //           <TimerClock />
    //           <div className="current-focus-task">
    //             <span className="pomo-container"><PomodoroIcon /> #1</span>
    //             <div className="current-focus-title">
    //               {current_task && <span className="currentTask">Current task: {current_task}</span>}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //   } */}
    // </div>
  )
}
export default Timer